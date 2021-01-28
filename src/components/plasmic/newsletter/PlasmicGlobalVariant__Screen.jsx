// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import * as React from "react"

export const ScreenContext = React.createContext(
  "PLEASE_RENDER_INSIDE_PROVIDER"
)

const screenVariants = ["mobile"]

const screenQueries = ["(min-width:0px) and (max-width:500px)"]

function matchScreenVariants() {
  const matching = []
  if (!globalThis.matchMedia) {
    return matching
  }
  for (let i = 0; i < screenQueries.length; i++) {
    if (globalThis.matchMedia(screenQueries[i]).matches) {
      matching.push(screenVariants[i])
    }
  }
  return matching
}

export function ScreenVariantProvider(props) {
  const [value, setValue] = React.useState([])
  React.useEffect(() => {
    const handler = () => {
      const newValues = matchScreenVariants()
      if (
        newValues.length !== value.length ||
        newValues.some(v => !value.includes(v))
      ) {
        setValue(newValues)
      }
    }
    handler()
    window.addEventListener("resize", handler)
    return () => window.removeEventListener("resize", handler)
  }, [value])
  return (
    <ScreenContext.Provider value={value}>
      {props.children}
    </ScreenContext.Provider>
  )
}

export default ScreenContext
/* prettier-ignore-end */
