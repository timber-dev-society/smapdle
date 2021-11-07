import { useState } from 'react'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'

import config from '../../utils/app-config'

const selectUserValues = createSelector(
  store => store.app.user,
  user => ([ user.group, user.uid ])
)

export const NOTHING = 0 // 0000
export const READ = 1    // 0001
export const MOVE = 2    // 0010
export const EDIT = 4    // 0100
export const DELETE = 8  // 1000
export const ALL = 15    // 1111

const memoIsGrantedTo = ({ isOwner, rules }) => (accessType) => {
  return isOwner || !!(rules & accessType)
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
