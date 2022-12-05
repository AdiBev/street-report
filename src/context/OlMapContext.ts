import { Map } from "ol"
import { createContext } from "react"

type OlMapContextT = {
  map: Map | undefined
}

export const OlMapContext = createContext<OlMapContextT | null>(null)
