import { useState } from 'react'
import { useDispatch } from 'react-redux'



const useMenu = () => {
  const dispatch = useDispatch()
  const [ isOpen, setIsOpen ] = useState(false)
  const handler = (action) => () => {
    console.log('handler')
    if (action !== undefined) {
      dispatch(action())
    }
    setIsOpen(!isOpen)
  }
  console.log('useMenu')

  return [
    handler,
    ({children}) => <>{ isOpen && <Menu>{children}</Menu>}</>
  ]
}

export default useMenu
