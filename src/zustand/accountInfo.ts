import { WebAccountInfo } from '../model/common'
import { StateCreator } from 'zustand'

export interface AccountInfoSlice {
  accountInfo: WebAccountInfo
  saveWebAccountInfo: (payload: WebAccountInfo) => void
  removeAccountInfo: () => void
}

export const createAccountInfoSlice: StateCreator<AccountInfoSlice, [], [], AccountInfoSlice> = (set) => ({
  accountInfo: {
    publicKey: '',
    marketPlaceAddress: '',
    isMuseum: false,
  },
  saveWebAccountInfo: (payload: WebAccountInfo) =>
    set(() => ({
      accountInfo: payload,
    })),
  removeAccountInfo: () => set(() => ({ accountInfo: { publicKey: '', marketPlaceAddress: '', isMuseum: false } })),
})
