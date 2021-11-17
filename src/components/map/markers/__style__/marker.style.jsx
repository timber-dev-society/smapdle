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

  &.i-token {
    height: var(--i-token-size);
    font-size: var(--i-token-font-size);

    &.i-size-1 {
      font-size: calc(var(--i-token-font-size) * 2);
    }
    &.i-size-2 {
      font-size: calc(var(--i-token-font-size) * 1.5);
    }
    &.i-size-3 {
      font-size: calc(var(--i-token-font-size) * 2);
    }
    &.i-size-3 {
      font-size: calc(var(--i-token-font-size) * 2);
    }
    &.i-size-4 {
      font-size: calc(var(--i-token-font-size) * 2);
    }
    &.i-size-5 {
      font-size: calc(var(--i-token-font-size) * 2);
    }
    &.i-size-6 {
      font-size: calc(var(--i-token-font-size) * 2);
    }
    &.i-size-7 {
      font-size: calc(var(--i-token-font-size) * 2);
    }
    &.i-size-8 {
      font-size: calc(var(--i-token-font-size) * 2);
    }
    &.i-size-9 {
      font-size: calc(var(--i-token-font-size) * 2);
    }
  }
`
