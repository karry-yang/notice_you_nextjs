'use client'

import { Provider } from 'react-redux'
import { makeStore } from './store'
import { ReactNode } from 'react';

export default function ReduxProvider({ children }: { readonly children: ReactNode }) {
  const store = makeStore()
  return <Provider store={store}>{children}</Provider>
}