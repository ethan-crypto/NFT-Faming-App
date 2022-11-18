// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";
import "@chainlink/contracts/src/v0.8/VRFV2WrapperConsumerBase.sol";

// Normal ERC721 contract
// But here we can actually make a an nft by passing in the photo as a link.
// In our usecase, we first merge two images together, upload it to ipfs and then pass that link to the safeMint() function which converts our image into an NFT.
// Also here approve needs to be called before

contract Framable is ERC721, ERC721URIStorage, VRFV2WrapperConsumerBase, ConfirmedOwner {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    // TODO: Possibly change the fee and threshold. 1000 people need to frame for a prize
    uint256 public fee = 0.001 ether;
    uint256 public threshold = 1 ether;

    uint256 public alreadyRaffledTokenIds;

    struct RequestStatus {
        uint256 paid; // amount paid in link
        bool fulfilled; // whether the request has been successfully fulfilled
        uint256[] randomWords;
    }
    mapping(uint256 => RequestStatus) public s_requests;
     // past requests Id.
    uint256[] public requestIds;
    uint256 public lastRequestId;
    uint32 callbackGasLimit = 100000;
    uint16 requestConfirmations = 3;
    uint32 numWords = 1;
    address linkAddress = 0x326C977E6efc84E512bB9C30f76E30c160eD06FB;
    address wrapperAddress = 0x99aFAf084eBA697E584501b8Ed2c0B37Dd136693;

    struct NFT{
        address contractAddress;
        uint256 tokenId;
        address owner;
        bool isFramed;
    }
    // A mapping from newly minted token to the structure.
    // this will help use identify which token to unmerge
    mapping(uint256 => NFT) public myNft;

    constructor() ERC721("MergedNFT", "MNFT") ConfirmedOwner(msg.sender) VRFV2WrapperConsumerBase(linkAddress, wrapperAddress)  {}

    function merge(string memory uri, address _contractAddress, uint256 _originalTokenId) public payable {
        require(msg.value >= fee, "Not enough ether sent");
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

    // TODO: Please call the requestRandomWords() before calling this function
    // Also, set the gasLimit for requestRandomWords() as 400,000 on metamask before calling it
    function selectWinner() public onlyOwner returns(address){
        require(address(this).balance >= threshold, "Threshold not reached");
        uint256 id = VRF_V2_WRAPPER.lastRequestId();
        uint256 noOfTokenIds = _tokenIdCounter.current();
        (, , uint256[] memory randomWords) = getRequestStatus(id);
        uint256 selected = (randomWords[0] % (noOfTokenIds - alreadyRaffledTokenIds));
        address winner = myNft[alreadyRaffledTokenIds + selected].owner;
        alreadyRaffledTokenIds = noOfTokenIds;
        (bool sent, ) = payable(winner).call{value: threshold}("");
        require(sent, "Failed to send Ether");
        return winner;
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

    receive() external payable{}

    // Chainlink VRF
    // set GasLimit as 400,000 before calling this function
    function requestRandomWords()
        public
        onlyOwner
        returns (uint256 requestId)
    {
        requestId = requestRandomness(
            callbackGasLimit,
            requestConfirmations,
            numWords
        );
        s_requests[requestId] = RequestStatus({
            paid: VRF_V2_WRAPPER.calculateRequestPrice(callbackGasLimit),
            randomWords: new uint256[](0),
            fulfilled: false
        });
        requestIds.push(requestId);
        lastRequestId = requestId;
        // emit RequestSent(requestId, numWords);
        return requestId;
    }

    function fulfillRandomWords(
        uint256 _requestId,
        uint256[] memory _randomWords
    ) internal override {
        require(s_requests[_requestId].paid > 0, "request not found");
        s_requests[_requestId].fulfilled = true;
        s_requests[_requestId].randomWords = _randomWords;
        // emit RequestFulfilled(
        //     _requestId,
        //     _randomWords,
        //     s_requests[_requestId].paid
        // );
    }

    function getRequestStatus(
        uint256 _requestId
    )
        private
        view
        returns (uint256 paid, bool fulfilled, uint256[] memory randomWords)
    {
        require(s_requests[_requestId].paid > 0, "request not found");
        RequestStatus memory request = s_requests[_requestId];
        return (request.paid, request.fulfilled, request.randomWords);
    }

    function withdrawLink() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(linkAddress);
        require(
            link.transfer(msg.sender, link.balanceOf(address(this))),
            "Unable to transfer"
        );
    }
}
