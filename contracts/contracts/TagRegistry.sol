// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract TagRegistry {
    struct Tag {
        bytes32 txHash;
        uint256 chainId;
        string category;
        string note;
        uint256 timestamp;
        bool exists;
    }
    
    mapping(address => mapping(bytes32 => Tag)) public tags;
    mapping(address => bytes32[]) public userTxHashes;
    
    event TagAdded(address indexed user, bytes32 indexed txHash, uint256 chainId, string category, uint256 timestamp);
    event TagUpdated(address indexed user, bytes32 indexed txHash, uint256 chainId, string category, uint256 timestamp);
    
    function addTag(bytes32 _txHash, uint256 _chainId, string calldata _category, string calldata _note) external {
        require(bytes(_category).length > 0, "Category required");
        require(_txHash != bytes32(0), "Invalid tx hash");
        
        if (!tags[msg.sender][_txHash].exists) {
            userTxHashes[msg.sender].push(_txHash);
        }
        
        tags[msg.sender][_txHash] = Tag({
            txHash: _txHash,
            chainId: _chainId,
            category: _category,
            note: _note,
            timestamp: block.timestamp,
            exists: true
        });
        
        emit TagAdded(msg.sender, _txHash, _chainId, _category, block.timestamp);
    }
    
    function updateTag(bytes32 _txHash, string calldata _category, string calldata _note) external {
        require(tags[msg.sender][_txHash].exists, "Tag not found");
        
        tags[msg.sender][_txHash].category = _category;
        tags[msg.sender][_txHash].note = _note;
        tags[msg.sender][_txHash].timestamp = block.timestamp;
        
        emit TagUpdated(msg.sender, _txHash, tags[msg.sender][_txHash].chainId, _category, block.timestamp);
    }
    
    function getTag(address _user, bytes32 _txHash) external view returns (Tag memory) {
        return tags[_user][_txHash];
    }
    
    function getUserTxHashes(address _user) external view returns (bytes32[] memory) {
        return userTxHashes[_user];
    }
    
    function getAllTags(address _user) external view returns (Tag[] memory) {
        bytes32[] memory hashes = userTxHashes[_user];
        Tag[] memory result = new Tag[](hashes.length);
        for (uint i = 0; i < hashes.length; i++) {
            result[i] = tags[_user][hashes[i]];
        }
        return result;
    }
}
