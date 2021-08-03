import styled from 'styled-components'
import Emoji from "a11y-react-emoji"
import { useState } from 'react'

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

  const [ isDrag, setIsDrag ] = useState(false)

  return (
    <Box onDragLeave={() => {console.log('going outside')}}  onDragEnter={() => {console.log('going inside')}}>
      <Icon draggable onDragStart={() => setIsDrag(true)} onDragEnd={() => setIsDrag(false)}>
        <Emoji symbol="🧠" label="login" />
      </Icon>
    </Box>
  )
}

export default Panel
