import { useSelector, shallowEqual } from 'react-redux'

const Filter = ({ filter, Token }) => {
  const tokens = useSelector(filter, shallowEqual)

  return (
    <>
      { Object.keys(tokens).map(uid => (<Token key={uid} uid={uid} />)) }
    </>
  )
}

export default Filter
