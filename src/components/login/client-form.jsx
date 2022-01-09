import { useState } from 'react'
import PropTypes from 'prop-types'

import { Row, Label, Input, Error, Button } from '../__style__/login-form.style'

const ClientForm = ({ firebase }) => {
  const [ login, setLogin ] = useState('')
  const [ error, setError ] = useState('')
  const [ isError, setIsError ] = useState(false)

  const handleSubmit = async (event) => {
    setIsError(false)
    event.preventDefault()
    firebase.auth().signInWithEmailAndPassword(login).catch(reason => {
      console.error(reason)
      setIsError(true)
      setError(reason.message)
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Row>
        <Label htmlFor="login">E-mail</Label>
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
