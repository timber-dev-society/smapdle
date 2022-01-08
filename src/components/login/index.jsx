import InvestigatorForm from './investigator-form'
import { Wrapper, Modal } from '../__style__/login-form.style'

const Login = ({ firebase }) => {
  const [ formType, setFormType ] = useState('client')

  return (
    <Wrapper>
      <Modal>
        { formType === 'investigator' && <InvestigatorForm firebase={firebase} /> }
        { formType === 'client' && <ClientForm firebase={firebase} /> }
      </Modal>
    </Wrapper>
  )
}
