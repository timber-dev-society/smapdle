import { useRef, useEffect, Profiler } from 'react'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import styled from 'styled-components'

import Markers from './markers'

import 'mapbox-gl/dist/mapbox-gl.css'

const MapDiv = styled.div`
  height: 100vh;
  width: 100vw;
`

mapboxgl.accessToken = 'pk.eyJ1Ijoiam9saW5lNmIiLCJhIjoiY2tyaGdtbHVxMDhyMjJwcGV2c3IwenB5dyJ9.TjhnAgs9IG99q2HhmAqlZg';

const Map = () => {
    const mapContainer = useRef(null)
    const map = useRef(null)
    let lng = window.localStorage.getItem('lng') || -70.9
    let lat = window.localStorage.getItem('lat') || 42.35
    let zoom = window.localStorage.getItem('zoom') || 9

    useEffect(() => {
        if (map.current) return; // initialize map only once

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/joline6b/ckrjlmvix8ffu17ny2vaseowq',
            center: [ lng, lat ],
            zoom: zoom
        })

        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')
        map.current.addControl(new mapboxgl.ScaleControl(), 'bottom-right')
        map.current.on('zoomend', () => {
          window.localStorage.setItem('zoom', map.current.getZoom())
        })
        map.current.on('moveend', () => {
          const { lng, lat } = map.current.getCenter();
          window.localStorage.setItem('lng', lng)
          window.localStorage.setItem('lat', lat)
        })

    })

    return (
        <>
          <Profiler id="map" onRender={console.log}>
            <MapDiv ref={mapContainer} className="map-container" />
          </Profiler>
          <Profiler id="markers" onRender={console.log}>
            <Markers map={map} />
          </Profiler>
        </>
    )
}

export default Map
