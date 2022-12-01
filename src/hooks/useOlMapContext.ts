import { useContext } from "react";
import { OlMapContext } from "../context/OlMapContext";
export function useOlMapContext() {
  const mapContext = useContext(OlMapContext);
  if (!mapContext) {
    throw new Error("useThemeContext must be used within ThemeProvider");
  }
  return mapContext;
}
