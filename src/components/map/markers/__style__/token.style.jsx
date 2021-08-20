import styled from 'styled-components'

export const Container = styled.div`
  position:relative;
  border-radius: 50%;
  padding: 10px;
  height: 20px;
  width: 20px;

  &.focus {
    border: 3px solid red;
  }
`

export const Block = styled.div`
  background: white;
  padding: 5px;
  border-radius: 5px;
  position: absolute;
`
