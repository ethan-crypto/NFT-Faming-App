// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

// This is a normal ERC1155 contract generated using the contract wizard from openzeppelin

contract Frame is ERC1155, Ownable, ERC1155Supply {
    using Strings for uint256;
    string private baseURI;
    uint8 private immutable frameCount;

    constructor(string memory _baseURI, uint8 _frameCount) ERC1155(_baseURI) {
        frameCount = _frameCount;
        //"ipfs://Qmd2g8bcYcAR1ezrTJ1s97isFr7Je6a4suT2FehqwbYEF1/"
        baseURI = _baseURI;
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mint(uint256 id)
        public
    {
        _mint(msg.sender, id, 1, "");
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        override(ERC1155, ERC1155Supply)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    function uri(uint256 tokenId)
        public
        view                
        override
        returns (string memory)
    {
        require(
            tokenId < frameCount, //TODO: change from hardcoded to dynamic. Based on the number of frames on IPFS.
            "URI requested for invalid tokenId"
        );
        return
            bytes(baseURI).length > 0
                ? string(abi.encodePacked(baseURI, tokenId.toString()))
                : baseURI;
    }
}