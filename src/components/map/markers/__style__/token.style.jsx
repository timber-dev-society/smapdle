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

export const Menu = styled.div`
  background:white;
  border-radius: 510px;
  left: 100%;
  margin-left: 10px;
  padding: 5px;
  position:absolute;
  top: 0;

  &:after {
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-right: 10px solid #fff;
    clear: both;
    content: '';
    height: 0;
    position: absolute;
    right: 100%;
    top: 15px;
    width: 0;
  }
`
