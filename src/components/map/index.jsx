import { useRef, useEffect, useState } from 'react'
import { render } from 'react-dom'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import styled from 'styled-components'

import Tooltip from './tooltip'
import Marker from './Marker'

import 'mapbox-gl/dist/mapbox-gl.css'

const MapDiv = styled.div`
    height: 100vh;
    width: 100vw;
`
 
mapboxgl.accessToken = 'pk.eyJ1Ijoiam9saW5lNmIiLCJhIjoiY2tyaGdtbHVxMDhyMjJwcGV2c3IwenB5dyJ9.TjhnAgs9IG99q2HhmAqlZg';

const Map = () => {
    const mapContainer = useRef(null)
    const map = useRef(null)
    const marker = useRef(null)
    const [lng, setLng] = useState(-70.9)
    const [lat, setLat] = useState(42.35)
    const [zoom, setZoom] = useState(9)

    useEffect(() => {
        if (map.current) return; // initialize map only once

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/joline6b/ckrjlmvix8ffu17ny2vaseowq',
            center: [ lng, lat ],
            zoom: zoom
        })

        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

        marker.current = document.createElement('div')
        render(<Marker />, marker.current)

        new mapboxgl.Marker(marker.current).setLngLat({lng, lat}).addTo(map.current)
    })

    return (
        <>
            <MapDiv ref={mapContainer} className="map-container" />
        </>
    )
}

export default Map
