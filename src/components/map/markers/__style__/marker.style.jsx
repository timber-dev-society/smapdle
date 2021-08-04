import styled from "styled-components"

export const Icon = styled.div`
  background-color: white;
  border: 4px solid white;
  border-radius: 50% 50% 50% 50%;

  padding: 5px;
  margin-top: 4px;
  text-align: center;

  &.p-token {
    height: var(--p-token-size);
    font-size: var(--p-token-font-size);
    line-height: var(--p-token-size);
    width: var(--p-token-size);
  }
`

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`
