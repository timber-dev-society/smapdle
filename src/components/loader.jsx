import { useEffect, useRef, useState } from "react"
import Loader from "react-loader-spinner";

const Loader = ({ children }) => {
  const ctx = useRef()
  const [ isLoaded, setIsLoaded ] = useState(false)

  return (
    <>
      { !isLoaded && <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
      />}
      { isLoaded && children}
    </>
  )
}
