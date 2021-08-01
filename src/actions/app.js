
export const SET_USER = Symbol('SET_USER@APP')
export const setUser = ({ uid, email }) => ({
  type: SET_USER,
  payload: {
    uid,
    email,
    date: new Date(),
  },
})

export const LOAD_MARKERS = Symbol('LOAD_MARKERS@APP')
export const loadMarkers = () => ({
  type: LOAD_MARKERS,
})

export const SET_MARKERS = Symbol('SET_MARKERS@APP')
export const setMarkers = (markers) => ({
  type: SET_MARKERS,
  payload: markers,
})
