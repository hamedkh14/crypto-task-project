
import { createContext, ReactNode, useContext, useState } from "react";

const AppContext = createContext({
  hello: 'world'
});

export function AppWrapper({children}: {
  children: ReactNode
}) {
  const [state, setState] = useState({
    hello: 'world'
  })
  return (
    <AppContext.Provider value={{}}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}