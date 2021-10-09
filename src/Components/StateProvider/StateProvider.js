import  { createContext, useReducer, useContext } from "react";

export const StateContex = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContex.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContex.Provider>
);

export const useStateValue = () => useContext(StateContex);
