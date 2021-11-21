import { render } from 'react-dom'
import { useState } from 'react'


import Trash from './trash'
import Menu from './menu'
import { Box, DragContainer } from '../__style__/admin-panel.style'
import { json } from 'utils/app-func'
import { dndCreateMarker } from 'actions'

export const ToolsPanel = () => {
  const [ isDragging, setIsDragging ] = useState(false)

  const handleDragStart = (event, type, token) => {
    event.stopPropagation()

    const dragImage = document.createElement('div')
    render(<DragContainer>{token}</DragContainer>, dragImage)

    event.dataTransfer.effectAllowed = 'copy'
    event.dataTransfer.setData('text/plain', json`${dndCreateMarker(type)}`)

    setIsDragging(true)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  return (
    <Box onDrop={(e) => { e.stopPropagation(); e.preventDefault() }} onDragOver={(e) => e.preventDefault()}>
      <Trash isOpen={ isDragging }/>
      <Menu handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />
    </Box>
  )
}
