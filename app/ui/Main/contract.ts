import { ZKSYNC_ABI, ARBITRUM_ABI, BSC_ABI } from "./ABI";
const contract = new Map([
  ["42161", {
    address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
    abi: ARBITRUM_ABI,
  }],
  ["324", {
    address: '0x8676FCDfD58094454937042dC6CB9c75fC9b1fEC',
    abi: ZKSYNC_ABI,
  }],
  ["56", {
    address: '0x55d398326f99059fF775485246999027B3197955',
    abi: BSC_ABI,
  }],
]);

export default contract;