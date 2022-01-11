import { useState } from 'react'
import PropTypes from 'prop-types'

import { Row, Label, Input, Error, Button } from '../__style__/login-form.style'

const cleanLogin = (login) => {
  if (login.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
    return login
  }

  return `${login}@i-vestigate.com`
}

const ClientForm = ({ firebase }) => {
  const [ login, setLogin ] = useState(window.location.hash ? window.location.hash.slice(1) : '')
  const [ error, setError ] = useState('')
  const [ isError, setIsError ] = useState(false)

  const handleSubmit = async (event) => {
    setIsError(false)
    event.preventDefault()

    firebase.auth().signInWithEmailAndPassword(cleanLogin(login), '0s3f-p@ss').catch(reason => {
      console.error(reason)
      setIsError(true)
      setError(reason.message)
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Row>
        <Label htmlFor="login">Login</Label>
        <Input id="login" type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
      </Row>

      {isError && (<Error>{error}</Error>)}
      <Row>
        <Button type="submit">Submit</Button>
      </Row>
    </form>
  )
}

ClientForm.propTypes = {
  firebase: PropTypes.object.isRequired
}

export default ClientForm
