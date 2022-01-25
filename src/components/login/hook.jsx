const useError = () => {
  const [ isError, setIsError ] = useState(false);
  const [ error, setError ] = useState('');

  const trigger = (isError, reason) => {
    setIsError(isError)
    if (isError) { setError(reasonFail.message) }
  }

  return [ isError, error, trigger ]
}
