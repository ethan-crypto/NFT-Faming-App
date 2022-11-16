// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// Normal ERC721 contract
// But here we can actually make a an nft by passing in the photo as a link.
// In our usecase, we first merge two images together, upload it to ipfs and then pass that link to the safeMint() function which converts our image into an NFT.
// Also here approve needs to be called before

contract Framable is ERC721, ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    struct NFT{
        address contractAddress;
        uint256 tokenId;
        address owner;
        bool isFramed;
    }
    // A mapping from newly minted token to the structure.
    // this will help use identify which token to unmerge
    mapping(uint256 => NFT) public myNft;

    constructor() ERC721("MergedNFT", "MNFT") {}

    function merge(string memory uri, address _contractAddress, uint256 _originalTokenId) public {
        require(_contractAddress != address(0) && _contractAddress != address(this), "Invalid contract address");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        NFT memory nftStruct = NFT(
            _contractAddress,
            _originalTokenId,
            msg.sender,
            true
        );
        myNft[tokenId] = nftStruct;
        IERC721 nft = IERC721(_contractAddress);
        nft.transferFrom(msg.sender, address(this), _originalTokenId);
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // Unmerging will first burn the framed nft
    // then sends the original nft back to the owner
    function unmerge(uint256 _tokenId) public{
        _burn(_tokenId);
        NFT memory nftStruct = myNft[_tokenId];
        nftStruct.isFramed = false;
        IERC721 nft = IERC721(nftStruct.contractAddress);
        myNft[_tokenId] = nftStruct;
        nft.transferFrom(address(this), nftStruct.owner, nftStruct.tokenId);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
