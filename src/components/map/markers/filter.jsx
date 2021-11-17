import { useSelector } from 'react-redux'

const Filter = ({ filter, Marker, visibleAfter }) => {
  const markers = useSelector(filter)

  return (
    <>
      { Object.keys(markers).map(uid => (<Marker key={uid} uid={uid} visibleAfter={visibleAfter} />)) }
    </>
  )
}

export default Filter
