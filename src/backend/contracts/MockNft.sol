// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MockNFT is ERC721URIStorage {
    uint256 public tokenCount;
    uint256 public postCount;


    constructor() ERC721("MockNFT", "NFT") {}

    function mint() external returns (uint256) {
        tokenCount++;
        _safeMint(msg.sender, tokenCount);
        return (tokenCount);
    }

}