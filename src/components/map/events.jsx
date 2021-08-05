import { render } from 'react-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import { setIsDraggingNewMarker } from '../../actions'
import ZToken from './markers/z-marker'

const Events = ({ map }) => {
  const dispatch = useDispatch()
  const isDraggingNewMarker = useSelector((state) => state.app.isDraggingNewMarker)

  useEffect(() => {
    if (!map.current) { return }

    if (isDraggingNewMarker) {
      map.current.once('mousemove', (event) => {
        const container = document.createElement('div')
        render(<ZToken map={map.current} />, container)
        new mapboxgl.Marker(container)
                    .setLngLat(event.lngLat)
                    .setPitchAlignment('map')
                    .setDraggable(true)
                    .addTo(map.current)

        dispatch(setIsDraggingNewMarker(false))
      })
    }
  })

  return (<></>)
}

export default Events
