
export const SET_USER = Symbol('SET_USER_@_APP')
export const setUser = ({ uid, email }) => ({
  type: SET_USER,
  payload: {
    uid,
    email,
    date: new Date(),
  },
})

export const SET_IS_DRAGGING_NEW_MARKER = Symbol('SET_IS_DRAGGING_NEW_MARKER_@_APP')
export const setIsDraggingNewMarker = (isDragging) => ({
  type: SET_IS_DRAGGING_NEW_MARKER,
  payload: isDragging,
})

export const CREATE_NEW_MARKER = Symbol('CREATE_NEW_MARKER')
export const createNewMarker = (location) => ({
  type: CREATE_NEW_MARKER,
  payload: location,
})

export const LOAD_MARKERS = Symbol('LOAD_MARKERS_@_APP')
export const loadMarkers = () => ({
  type: LOAD_MARKERS,
})

export const SET_MARKERS = Symbol('SET_MARKERS_@_APP')
export const setMarkers = (markers) => ({
  type: SET_MARKERS,
  payload: markers,
})

export const UPDATE_MARKER = Symbol('UPDATE_MARKER_@_APP_&_MARKER')
export const updateMarker = (marker) => ({
  type: UPDATE_MARKER,
  payload: marker,
})

export const SET_MAP = Symbol('SET_MAP_@_APP')
export const setMap = (map) => ({
  type: SET_MAP,
  payload: map,
})

export const CREATE_MARKERS = Symbol('CREATE_MARKERS_@_MARKER')
export const createMarkers = (markers, map) => ({
  type: CREATE_MARKERS,
  payload: {
    markers,
    map,
  }
})
