import { useState } from 'react'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'

import config from '../../utils/app-config'

const selectUserValues = createSelector(
  store => store.app.user,
  user => ([ user.group, user.uid ])
)

export const READ = Symbol('GRANTED_TO_READ')
export const MOVE = Symbol('GRANTED_TO_MOVE')
export const EDIT = Symbol('GRANTED_TO_EDIT')
export const DELETE = Symbol('GRANTED_TO_DELETE')

const memoIsGrantedTo = ({ isOwner, rules }) => (accessType) => {
  return isOwner || rules.includes(accessType)
}
 
const useAcl = (marker) => {
  const [ group, uid ] = useSelector(selectUserValues)

  const [ isOwner ] = useState(uid === marker.owner)
  const [ rules ] = useState(config.groups.filter(({ role }) => group === role)[0].rules[marker.type])
  const isGrantedTo = memoIsGrantedTo({ isOwner, rules })

  return {
    canRead: isGrantedTo(READ),
    canMove: isGrantedTo(MOVE),
    canEdit: isGrantedTo(EDIT),
    canDelete: isGrantedTo(DELETE),
  }
}

export default useAcl
