import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

const Item = ({ type, uid }) => {

  return (
    <li>{type} - {uid}</li>
  )
}

const List = ({ type, markers }) => {
  const keys = Object.keys(markers)
  const isItems = keys.length > 0
  
  return (
    <>
      <h3>{type}</h3>
      <ul>
        {isItems && keys.map((key) => (<Item key={key} type={key} {...markers[key]} />))}
        {!isItems && <li>No items</li>}
      </ul>
    </>
  )
}

export const SidePanel = ({ style }) => {
  const markers = useSelector(state => state.markers)
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) { return }

  }, [ref])

  return (
    <div style={{ height: '100vh', ...style }}>
      { Object.keys(markers).map((key) => (<List key={key} type={key} markers={markers[key]} />)) }
    </div>
  )
}
