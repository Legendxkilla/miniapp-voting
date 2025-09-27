// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Voting {
    string[] public parties;
    mapping(uint => uint) public votes;
    mapping(address => bool) public hasVoted;

    constructor(string[] memory _parties) {
        parties = _parties;
    }

    function vote(uint partyIndex) public {
        require(partyIndex < parties.length, "Invalid party");
        require(!hasVoted[msg.sender], "Already voted");
        votes[partyIndex]++;
        hasVoted[msg.sender] = true;
    }

    function getParties() public view returns (string[] memory) {
        return parties;
    }

    function getResults() public view returns (uint[] memory) {
        uint[] memory res = new uint[](parties.length);
        for (uint i = 0; i < parties.length; i++) {
            res[i] = votes[i];
        }
        return res;
    }
}