import { useSelector } from 'react-redux'

const Filter = ({ filter, Token }) => {
  const tokens = useSelector(filter)

  return (
    <>
      { Object.keys(tokens).map(uid => (<Token key={uid} uid={uid} />)) }
    </>
  )
}

export default Filter
