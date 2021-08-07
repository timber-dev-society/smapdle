import { render } from 'react-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import { setIsDraggingNewMarker } from '../../actions'
import ZToken from './markers/z-marker'

let lastEvent = null

const getMouseCoors = (map) => {
  const el = map.current.getCanvasContainer()
  const rect = el.getBoundingClientRect()
  const scaling = el.offsetWidth === rect.width ? 1 : el.offsetWidth / rect.width;

  const point = new mapboxgl.Point(
      (lastEvent.clientX - rect.left) * scaling,
      (lastEvent.clientY - rect.top) * scaling
  )

  return map.current.unproject(point)
}
const handleMouseMove = (event) => {
  lastEvent = event
}

const Events = ({ map }) => {
  const dispatch = useDispatch()
  const dragActionState = useSelector((state) => state.app.dragActionState)

  useEffect(() => {
    if (!map.current) { return }

    switch (dragActionState) {
      case 1:
        document.addEventListener('mousemove', handleMouseMove)
        break

      case 2:
        const lngLat = getMouseCoors(map)
        const container = document.createElement('div')
        render(<ZToken map={map.current} />, container)
        new mapboxgl.Marker(container)
                    // .setLngLat(event.lngLat)
                    .setLngLat(lngLat)
                    .setPitchAlignment('map')
                    .setDraggable(true)
                    .addTo(map.current)

      case 3:
        document.removeEventListener('mousemove', handleMouseMove)
        dispatch(setIsDraggingNewMarker(0))
        break

      default:
        break
    }
  })

  return (<></>)
}

export default Events
