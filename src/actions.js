// @flow
type Action = { type: symbol, payload?: any }
type MouseEvent = { clientX: number, clientY: number }

// USER EVENTS
export const SET_USER: symbol = Symbol('SET_USER_@_APP')
export const setUser = ({ uid, email }: Object): Action => ({
  type: SET_USER,
  payload: {
    uid,
    email,
    date: new Date(),
  },
})

// MAP EVENTS
export const SET_MAP: symbol = Symbol('SET_MAP_@_APP')
export const setMap = (map: Object): Action => ({
  type: SET_MAP,
  payload: map,
})

// MARKER EVENTS
export const CREATE_NEW_MARKER: symbol = Symbol('CREATE_NEW_MARKER')
export const createNewMarker = (location: Object): Action => ({
  type: CREATE_NEW_MARKER,
  payload: location,
})

export const ADD_MARKER: symbol = Symbol('ADD_MARKER_@_MARKER')
export const addMarker = (marker: Object, map: Object, user: Object): Action => ({
  type: ADD_MARKER,
  payload: {
    marker,
    map,
    user,
  },
})

export const DEFINE_MARKER: symbol = Symbol('DEFINE_MARKER_@_APP')
export const defineMarker = (marker: Object): Action => ({
  type: DEFINE_MARKER,
  payload: marker,
})

export const CREATE_MARKERS: symbol = Symbol('CREATE_MARKERS_@_MARKER')
export const createMarkers = (markers: Object, map: Object): Action => ({
  type: CREATE_MARKERS,
  payload: {
    markers,
    map,
  },
})

export const CREATE_MARKER_AT_POSITION: symbol = Symbol('CREATE_MARKER_AT_POSITION')
export const createMarkerAtPositon = ({ clientX, clientY, dataTransfer }: MouseEvent): Action => ({
  type: CREATE_MARKER_AT_POSITION,
  payload: {
    token: dataTransfer.getData('text/plain'),
    clientX,
    clientY,
  },
})

export const LOAD_MARKERS: symbol = Symbol('LOAD_MARKERS_@_APP')
export const loadMarkers = (): Action => ({
  type: LOAD_MARKERS,
})

export const SET_MARKERS: symbol = Symbol('SET_MARKERS_@_APP')
export const setMarkers = (markers: Array<Object>): Action => ({
  type: SET_MARKERS,
  payload: markers,
})

export const UPDATE_MARKER: symbol = Symbol('UPDATE_MARKER_@_APP_&_MARKER')
export const updateMarker = (marker: Object): Action => ({
  type: UPDATE_MARKER,
  payload: marker,
})
