import styled from 'styled-components'
import Emoji from "a11y-react-emoji"
import { useDispatch } from 'react-redux'
import { useState } from 'react'

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
  cursor:grab;
  font-size:20px;
  height:20px;
  width:20px;
`

const Panel = () => {
  const dispatch = useDispatch()
  const [ isDragging, setIsDragging ] = useState(false)
  const [ isOutside, setIsOutside ] = useState(false)

  const handleDragStart = () => dispatch(setIsDraggingNewMarker(true))
  const handleDragEnd = (event) => {
    if (isOutside) {
      dispatch(setIsDraggingNewMarker(true))
    }
    setIsDragging(false)
    setIsOutside(false)
  }


  return (
    <Box className="yolo" onDragExit={() => { isDragging && setTimeout(() => setIsOutside(true), 10) }}  onDragEnter={() => { isDragging && setIsOutside(false) }}>
      <Icon style={{ backgroundColor: 'transparent' }} draggable onDragStart={() => { setIsDragging(true) }} onDragEnd={handleDragEnd}>
        <Emoji symbol="🧠" label="login" />
      </Icon>
    </Box>
  )
}

export default Panel
