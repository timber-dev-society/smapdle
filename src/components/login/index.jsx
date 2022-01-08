import InvestigatorForm from './investigator-form'
import { Wrapper, Modal } from '../__style__/login-form.style'

const Login = ({ firebase }) => {
  const [ formType, setFormType ] = useState('client')

  return (
    <Wrapper>
      <Modal>
        <ul>
          <li onClick={() => setFormType('client')}>Client</li>
          <li onClick={() => setFormType('investigator')}>Investigator</li>
        </ul>
        { formType === 'investigator' && <InvestigatorForm firebase={firebase} /> }
        { formType === 'client' && <ClientForm firebase={firebase} /> }
      </Modal>
    </Wrapper>
  )
}

export default Login
