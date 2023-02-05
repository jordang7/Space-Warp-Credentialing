// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SPCredentials is ERC721, ERC721URIStorage, Pausable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    struct credentialERC721NFT {
        address owner;
        string tokenURI;
        uint256 tokenId;
        string minerId;
    }

    struct registeredMiner {
        string minerId;
        address owner;
    }

    credentialERC721NFT[] public nftCollection;

    registeredMiner[] public registeredMinersCollection;

    constructor() ERC721("SPCredentials", "SPC") {}

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function safeMint(address to, string memory  _minerId, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();

        credentialERC721NFT memory newNFT = credentialERC721NFT({
            owner: msg.sender,
            tokenURI: uri,
            tokenId: tokenId,
            minerId:_minerId
        });

        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

        nftCollection.push(newNFT);
        registerMinerWithPublickKey(_minerId, to);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override whenNotPaused {
        require(from == address(0), "Err: token is SOUL BOUND");
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function changeTokenURI(uint256 tokenId, string memory _tokenURI) public onlyOwner {
        super._setTokenURI(tokenId, _tokenURI);
    }

    function getNFTCollection() public view returns (credentialERC721NFT[] memory) {
        return nftCollection;
    }

    function registerMinerWithPublickKey(string memory _minerId, address _owner) public onlyOwner {
        registeredMiner memory newMiner = registeredMiner({minerId: _minerId, owner: _owner});
        registeredMinersCollection.push(newMiner);
    }

    function getRegisteredMiners() public view returns (registeredMiner[] memory) {
        return registeredMinersCollection;
    }
}