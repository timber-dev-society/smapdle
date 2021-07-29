
export const SET_USER = Symbol('SET_USER@APP')
export const setUser = ({ uid, email }) => ({
  type: SET_USER,
  payload: {
    uid,
    email,
  },
})
