import styled from 'styled-components'

export const Container = styled.div`
  --size: calc(var(--corpse-size) * 1.3);
  position:relative;
  border-radius: 50%;
  padding: 10px;
  display: flex;
  height: var(--size);
  width: var(--size);
  padding: var(--corpse-size);

  &.focus {
    border: 3px solid red;
  }

  &.z {
    text-align: center;
    background: rgb(0,0,0);
    background: radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 100%);
    box-shadow: rgba(0, 0, 0, 0.56) 0 0 80px 10px;

    &.hidden {
      background: none;
      box-shadow: none;
    }
  }
`

export const Block = styled.div`
  background: white;
  padding: 5px;
  border-radius: 5px;
  position: absolute;
`
