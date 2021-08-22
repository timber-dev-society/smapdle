import { useSelector, shallowEqual } from 'react-redux'

const Filter = ({ filter, Marker }) => {
  const markers = useSelector(filter, shallowEqual)

  return (
    <>
      { Object.keys(markers).map(uid => (<Marker key={uid} uid={uid} />)) }
    </>
  )
}

export default Filter
