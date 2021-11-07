import styled from 'styled-components'

export const Wrapper = styled.div`
  background-color: white;
  border-radius: 5px;
  bottom: 50px;
  box-sizing: border-box;
  position: absolute;
  left: 50px;
`

export const List = styled.ul`
  padding: 10px 10px;
  width: 60px;
`

export const Box = styled.div`
  box-sizing: border-box;
  height: 140px;
  left: 50px;
  position: absolute;
  top: 50px;
  width: 75px;
`

export const Icon = styled.div`
  background-color: transparent;
  cursor: grab;
  font-size: 20px;
  height: 20px;
  width: 20px;
`

export const DragContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 30px;
  height: 30px;
  font-size: 30px;
  background-color: transparent;
  z-index: -1;
`
