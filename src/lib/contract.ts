export const CONTRACT_ADDRESS = "0xYourDeployedContract"; // EDIT THIS
export const ABI = [
  "function getParties() view returns (string[])",
  "function getResults() view returns (uint256[])",
  "function vote(uint256 partyIndex)"
];