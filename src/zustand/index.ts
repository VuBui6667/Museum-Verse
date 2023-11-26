import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AccountInfoSlice, createAccountInfoSlice } from './accountInfo'
import { useEffect, useState } from 'react'

type StoreSlice = AccountInfoSlice
const ZUSTAND_STORAGE_NAME = 'zustand.museum_nft'

const emptyState: StoreSlice = {
  accountInfo: {
    publicKey: '',
    marketPlaceAddress: '',
    isMuseum: false,
  },
  saveWebAccountInfo: () => {
    return
  },
  removeAccountInfo: () => {
    return
  },
}

const usePersistedStore = create<StoreSlice>()(
  persist(
    (...a) => ({
      ...createAccountInfoSlice(...a),
    }),
    {
      name: ZUSTAND_STORAGE_NAME,
    },
  ),
)

export const useBoundStore = ((selector, compare) => {
  const store = usePersistedStore(selector, compare)
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])

  return hydrated ? store : selector(emptyState)
}) as typeof usePersistedStore
