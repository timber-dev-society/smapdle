import Emoji from "a11y-react-emoji"
import styled from "styled-components"

const Icon = styled.div`
    background-color: white;
    border: 4px solid tomato;
    border-radius: 50%;
    height: 40px;
    font-size: 30px;
    line-height: 40px;
    padding: 5px;
    text-align: center;
    width: 40px;
`

const Progress = styled.progress`
    margin-top: 10px;
    background-color: tomato;
`

const Wrapper = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

const Marker = () => (
    <Wrapper>
        <Icon><Emoji symbol="🧠" label="login" /></Icon>
        <Progress id="file" max="100" value="70"> 70% </Progress>
    </Wrapper>
)

export default Marker
