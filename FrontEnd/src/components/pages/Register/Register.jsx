import {useNavigate} from 'react-router-dom'

import {useContext, useReducer} from 'react'
import classes from './Register.module.css'
import Card from '../../UI/Card'
import Input from '../../UI/Input'
import Button from '../../UI/Button'
import AuthContext from '../../../store/auth-context'

const formReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      ...state,
      [action.input]: action.value,
      // emailIsValid: action.value.includes('@'),
      // passwordIsValid: action.value.trim().length > 6,
    }
  }
  return {value: '', emailIsValid: false, passwordIsValid: false}
}

const Register = () => {
  const navigate = useNavigate()

  // const [formIsValid, setFormIsValid] = useState(false)
  const [inputState, dispatchInput] = useReducer(formReducer, {
    name: '',
    email: '',
    password: '',
    emailIsValid: false,
    passwordIsValid: false,
  })

  const authCtx = useContext(AuthContext)

  const {name, email, password} = inputState

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     setFormIsValid(emailIsValid && passwordIsValid)
  //   }, 500)

  //   return () => {
  //     clearTimeout(identifier)
  //   }
  // }, [emailIsValid, passwordIsValid])
  const loginRouteHandler = (req, res) => {
    navigate('login')
  }
  const onChangeHandler = event => {
    authCtx.setIsError({type: '', status: false})
    const {id, value} = event.target
    dispatchInput({
      type: 'USER_INPUT',
      input: id,
      value: value,
    })
    //console.log(inputState)
  }

  const submitHandler = event => {
    event.preventDefault()
    authCtx.onRegister(name, email, password)
  }

  return (
    <Card className={classes.register}>
      {authCtx.isError.status && <p>{authCtx.isError.type}</p>}
      <div style={{textAlign: 'center'}}>
        <h1>Register</h1>
      </div>
      <form onSubmit={submitHandler}>
        <Input
          id="name"
          label="Name"
          autocomplete="on"
          type="text"
          value={inputState.name}
          onChange={onChangeHandler}
        />
        <Input
          id="email"
          label="E-Mail"
          type="email"
          autocomplete="on"
          // isValid={emailIsValid}
          value={inputState.email}
          onChange={onChangeHandler}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          autocomplete="on"
          // isValid={passwordIsValid}
          value={inputState.password}
          onChange={onChangeHandler}
        />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Register
          </Button>
          <Button
            type="submit"
            className={classes.btn}
            onClick={loginRouteHandler}
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default Register
