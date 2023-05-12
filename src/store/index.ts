import { Wallet } from "@ijstech/eth-wallet";

export const enum EventId {
  ConnectWallet = 'connectWallet',
  IsWalletConnected = 'isWalletConnected',
  IsWalletDisconnected = 'IsWalletDisconnected',
  chainChanged = 'chainChanged'
}

export enum WalletPlugin {
  MetaMask = 'metamask',
  WalletConnect = 'walletconnect',
}

const Networks: { [chainId: number]: string } = {
  1: 'Ethereuem',
  25: 'Cronos Mainnet',
  42: 'Kovan Test Network',
  56: 'Binance Smart Chain',
  97: 'BSC Testnet',
  137: 'Polygon',
  338: 'Cronos Testnet',
  31337: 'Amino Testnet',
  80001: 'Mumbai',
  43113: 'Avalanche FUJI C-Chain',
  43114: 'Avalanche Mainnet C-Chain',
  250: 'Fantom Opera',
  4002: 'Fantom Testnet',
  13370: 'AminoX Testnet'
}

export const getNetworkName = (chainId: number) => {
  return Networks[chainId] || ""
}

export interface IContractDetailInfo {
  address: string;
}

export type ContractType = 'Proxy' | 'Distributor';

export interface IContractInfo {
  Proxy: IContractDetailInfo;
  Distributor: IContractDetailInfo;
}

export type ContractInfoByChainType = { [key: number]: IContractInfo };

export const state = {
  contractInfoByChain: {} as ContractInfoByChainType
}

export const setDataFromConfig = (options: any) => {
  if (options.contractInfo) {
    setContractInfo(options.contractInfo);
  }
}

const setContractInfo = (data: ContractInfoByChainType) => {
  state.contractInfoByChain = data;
}

const getContractInfo = (chainId: number) => {
  return state.contractInfoByChain[chainId];
}

export const getContractAddress = (type: ContractType) => {
  const chainId = Wallet.getInstance().chainId;
  const contracts = getContractInfo(chainId) || {};
  return contracts[type]?.address;
}
