import { useState } from "react"
import PropTypes from 'prop-types'
import Emoji from 'a11y-react-emoji'

import { Wrapper, Modal, Row, Label, Input, Error, Button } from './__style__/login-form.style'

const LoginForm = ({ firebase }) => {
    const [ login, setLogin ] = useState('')
    const [ paswd, setPaswd ] = useState('')
    const [ error, setError ] = useState('')
    const [ isError, setIsError ] = useState(false)

    const handleSubmit = async (event) => {
        setIsError(false)
        event.preventDefault()
        firebase.auth().signInWithEmailAndPassword(login, paswd).catch(reason => {
            console.error(reason)
            setIsError(true)
            setError(reason.message)
        })
    }
     
    return (
        <Wrapper>
            <Modal>
                <form onSubmit={handleSubmit}>
                    <Row>
                        <Label htmlFor="login">Login <Emoji symbol="🧠" label="login" /></Label>
                        <Input id="login" type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
                    </Row>

                    <Row>
                        <Label htmlFor="password">Password <Emoji symbol="💀" label="password" /></Label>
                        <Input id="password" type="password" value={paswd} onChange={(e) => setPaswd(e.target.value)} />
                    </Row>
                    {isError && (<Error>{error}</Error>)}
                    <Row>
                        <Button type="submit">Submit <Emoji symbol="🧟‍♂️" label="Brainzzz" /></Button>
                    </Row>
                </form>
            </Modal>
        </Wrapper>
    )
}

LoginForm.propTypes = {
    firebase: PropTypes.object.isRequired
}

export default LoginForm
