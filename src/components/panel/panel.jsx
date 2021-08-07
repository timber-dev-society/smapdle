import styled from 'styled-components'
import Emoji from "a11y-react-emoji"
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax


import { setIsDraggingNewMarker } from '../../actions'

const Box = styled.div`
  background-color: white;
  border-radius: 5px;
  height: 100px;
  left: 50px;
  padding: 15px;
  position: absolute;
  top: 50px;
  width: 100px;
`

const Icon = styled.div`
  background-color: transparent;
  cursor: grab;
  font-size: 20px;
  height: 20px;
  width: 20px;
`

const Panel = () => {
  const dispatch = useDispatch()
  const [ isDragging, setIsDragging ] = useState(false)

  const handleDragStart = () => {

    setIsDragging(true)
  }

  const handleDragEnd = () => {

    setIsDragging(false)
  }

  return (
    <Box onDrop={(e) => e.stopPropagation()} onDragOver={(e) => e.preventDefault()}>
      <Icon draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <Emoji symbol="🧠" label="login" />
      </Icon>
    </Box>
  )
}

export default Panel
