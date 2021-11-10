import useObjectState from './useObjectState';

const useForm = (inputsList) => {
  const initialInputsObj = inputsList.reduce((obj, { name, defaultValue = undefined }) => ({ ...obj, [name]: defaultValue }), {});
  const [inputs, setInputs] = useObjectState(initialInputsObj);
  const [inputErrors, setInputErrors] = useObjectState(initialInputsObj);

  const onInputChange = (input, mapFunc = value => value) => value => setInputs({ [input]: mapFunc(value) });

  const verifyInputs = () => {
    const newInputErrors = inputsList.reduce((newInputErrors, { name, verifier = isEmptyVerifier }) => ({
      ...newInputErrors, [name]: verifier(inputs[name])
    }), {});
    setInputErrors(newInputErrors);
    return Object.values(newInputErrors).every(error => !error);
  };

  return [inputs, inputErrors, onInputChange, verifyInputs, setInputs];
};

const isEmptyVerifier = (input) => {
  if (input === undefined || input === null || input === "" || (Array.isArray(input) && input.length === 0)) {
    return "This field is required."
  };
};

export default useForm;