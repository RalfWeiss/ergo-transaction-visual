import React from 'react'
// based on: https://felixgerschau.com/react-typescript-context/
import { createContext, ReactNode, useState, Dispatch, SetStateAction} from 'react'
//import { Store, mergeStore } from './store'
import { Store } from './store'

interface IStoreContext {
  state: Store, //| undefined,
  // setState: (state:Store) => Store
  setState: Dispatch<SetStateAction<Store>>
}

//const defaultState:Store = mergeStore({})
const defaultState:Store = {
  title: "default title",
  allBoxes: [],
  inputBoxIds: [],
  outputBoxIds: [],  
}

export const Context = createContext<IStoreContext>( {
  state: defaultState,
  //setState: () => mergeStore({})
  setState: () => ({})
})

//export const Context = createContext<Partial<Store>>({boxes: {}, allBoxes: []})
//export const Context = createContext<Partial<Store>>({boxes: {}, allBoxes: []})
//export const Context = createContext<Store | {}>({})


export interface IProvider {
  //data?: Store;
  children: ReactNode
}

export const Provider = ({ children }:IProvider) => {
  const [state, setState] = useState(defaultState)
  return (
    <Context.Provider value={{state, setState}} >
      {children}
    </Context.Provider>
  );
};