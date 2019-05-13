import { createContext } from 'react'
import { ContextInterface } from './interfaces'

export const Context = createContext<ContextInterface>({
  pass: '',
  setPass: () => '',
  sortList: [],
  sortBy: '',
  setSortBy: () => '',
})
export const Provider = Context.Provider
