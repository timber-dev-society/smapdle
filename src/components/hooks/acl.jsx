import { useState } from 'react'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'

import config from '../../utils'

const selectUserValues = createSelector(
  store => store.app.user,
  user => ([ user.isAdmin, user.uid ])
)

export const READ = Symbol('GRANTED_TO_READ')
export const MOVE = Symbol('GRANTED_TO_MOVE')
export const EDIT = Symbol('GRANTED_TO_EDIT')
export const DELETE = Symbol('GRANTED_TO_DELETE')


const memoIsGrantedTo = ({ isOwner, rules }) => (access) => {
  return isOwner || rules.includes(access)
}
 
const useAcl = (marker) => {
  const [ group, uid, type ] = useSelector(selectUserValues)

  const [ isOwner ] = useState(uid === marker.owner)
  const [ rules ] = useState(config[group][type])
  const isGrantedTo = memoIsGrantedTo({ isOwner, rules})

  return [
    isGrantedTo(READ),
    isGrantedTo(MOVE),
    isGrantedTo(EDIT),
    isGrantedTo(DELETE),
  ]
}

export default useAcl
