import { StateContext } from '../contexts/ContextProvider'
import { useContext } from "react"

export const useResidentContext = () => {
  const context = useContext(StateContext)

  if(!context) {
    throw Error('useResidentContext must be used inside an ResidentContextProvider')
  }

  return context
}