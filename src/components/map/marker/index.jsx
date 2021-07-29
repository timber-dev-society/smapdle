import { render } from 'react-dom'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import PlayerMarker from './player-marker'

import ZMarker from './z-marker'

const markerRenderer = (Marker) =>({ lng, lat }) => (map) => {
  console.log('markerRenderer render')
  const container = document.createElement('div')
  render(Marker, container)

  new mapboxgl.Marker(container).setLngLat({ lng, lat }).setPitchAlignment('map').addTo(map)
}

export default markerRenderer
export const Player = PlayerMarker
export const Z = ZMarker
