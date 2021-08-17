import { createAction } from '@reduxjs/toolkit'

// @flow
type Action = { type: symbol, payload?: any }
type MouseEvent = { clientX: number, clientY: number }

// USER EVENTS
export const SET_USER: symbol = Symbol('SET_USER_@_APP')
export const setUser = createAction(SET_USER, ({ uid, email }: Object) => ({
  payload: {
    uid,
    email,
    date: new Date(),
  },
}))

// APP EVENTS
export const SET_IS_LOADED: symbol = Symbol('SET_IS_LOADED_@_APP')
export const setIsLoaded = createAction(SET_IS_LOADED)

// MAP EVENTS
export const SET_MAP: symbol = Symbol('SET_MAP_@_APP')
export const setMap = createAction(SET_MAP)

// MARKER EVENTS
export const ADD_MARKER: symbol = Symbol('ADD_MARKER_@_MARKER')
export const addMarker = createAction(ADD_MARKER)

export const CREATE_MARKER_AT_POSITION: symbol = Symbol('CREATE_MARKER_AT_POSITION')
export const createMarkerAtPositon = createAction(CREATE_MARKER_AT_POSITION, ({ clientX, clientY, dataTransfer }: MouseEvent) => ({
  payload: {
    token: dataTransfer.getData('text/plain'),
    clientX,
    clientY,
  },
}))

export const LOAD_MARKERS: symbol = Symbol('LOAD_MARKERS')
export const loadMarkers = createAction(LOAD_MARKERS)

export const UPDATE_MARKER: symbol = Symbol('UPDATE_MARKER_@_MARKER')
export const updateMarker = createAction(UPDATE_MARKER)
