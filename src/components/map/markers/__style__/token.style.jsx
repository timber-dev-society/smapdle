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

export const Menu = styled(Block)`
  left: 100%;
  margin-left: 10px;
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

export const Sublist = styled(Block)`
  border-radius: 0 5px 5px 0;
  left: 100%;
  top: 38px;
`

export const HorizontalList = styled.ul`
  display: flex;
`

export const HorizontalItem = styled.li`
  padding: 0 5px;
`
