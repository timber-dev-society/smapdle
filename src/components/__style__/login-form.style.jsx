import styled from "styled-components"

export const Wrapper = styled.div`
    align-items: center;
    background-color: tomato;
    display: flex;
    height: 100vh;
    width: 100vw;
`

export const Modal = styled.div`
    display: block;
    background-color: white;
    border: 2px solid tomato;
    border-radius: 8px;
    margin: 0 auto;
    padding: 30px 15px;
    width: 55vw;
`

export const Row = styled.div`
    margin: 10px;
`
export const Label = styled.label`
    box-sizing: border-box;
    display: inline-block;
    margin-right: 10px;
    text-align: right;
    width: 25%;
`

export const Input = styled.input`
    border: 2px solid tomato;
    border-radius: 3px;
    box-sizing: border-box;
    padding: 5px;
    width: 50%;

    &:focus-visible,
    &:focus {
        outline-color: crimson;
    }
`

export const Error = styled(Row)`
    color: red;
    font-weight: bold;
    text-align: center;
`

export const Button = styled.button`
    background-color: tomato;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    float: right;
    font-size: 14px;
    font-weight: bold;
    margin: 4px 2px;
    padding: 16px 26px 16px 33px;
    text-decoration: none;
`