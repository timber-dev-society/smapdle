import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import Markers from './markers'
import Events from './events'
import { setMap } from '../../actions'
import config from '../../utils/app-config'
import useMap from '../hooks/map'

const MapDiv = styled.div`
  height: 100vh;
  width: 100vw;
`

const Map = () => {
    const { map, mapRef, isMapLoaded } = useMap(config.mapbox)
    const dispatch = useDispatch()

    const handleDrop = (event) => {
      const { clientX, clientY, dataTransfer } = event
      const { type, payload } = JSON.parse(dataTransfer.getData('text/plain'))

      event.stopPropagation()
      event.preventDefault()

      dispatch({ 
        type, 
        payload: {
          ...payload,
          clientX,
          clientY,
        }
      })
    }

    useEffect(() => {
      if (isMapLoaded) {
        // save map in store
        dispatch(setMap(map.current))
      }
    })

    return (
        <>
          <MapDiv onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} ref={mapRef} className="map-container" />
          { isMapLoaded && <><Markers map={map} /><Events map={map} /></> }
        </>
    )
}

export default Map
