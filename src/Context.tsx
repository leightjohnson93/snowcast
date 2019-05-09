import { createContext } from 'react'
import { ContextInterface } from './interfaces'

export const Context = createContext<ContextInterface>({
  pass: '',
  setPass: () => '',
})
export const Provider = Context.Provider
