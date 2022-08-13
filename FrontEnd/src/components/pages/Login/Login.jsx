import React, {useReducer, useContext} from 'react'

import Card from '../../UI/Card'
import Button from '../../UI/Button'
import AuthContext from '../../../store/auth-context'
import Input from '../../UI/Input'
import classes from './Login.module.css'

const formReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      ...state,
      [action.input]: action.value,
      // emailIsValid: action.value.includes('@'),
      //passwordIsValid: action.value.trim().length > 6,
    }
  }
  return {value: '', emailIsValid: false, passwordIsValid: false}
}

const Login = props => {
  //const [formIsValid, setFormIsValid] = useState(false)

  const [inputState, dispatchInput] = useReducer(formReducer, {
    email: '',
    password: '',
    emailIsValid: false,
    passwordIsValid: false,
  })

  const authCtx = useContext(AuthContext)

  const {email, password} = inputState

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     setFormIsValid(emailIsValid && passwordIsValid)
  //   }, 500)

  //   return () => {
  //     clearTimeout(identifier)
  //   }
  // }, [emailIsValid, passwordIsValid])

  const onChangeHandler = event => {
    authCtx.setIsError({type: '', status: false})
    const {id, value} = event.target
    dispatchInput({
      type: 'USER_INPUT',
      input: id,
      value: value,
    })
  }

  const submitHandler = event => {
    event.preventDefault()
    authCtx.onLogin(email, password)
  }

  return (
    <Card className={classes.login}>
      {authCtx.isError.status && <p>{authCtx.isError.type}</p>}
      <div style={{textAlign: 'center'}}>
        <h1>Login</h1>
      </div>

      <form onSubmit={submitHandler}>
        <Input
          id="email"
          label="E-Mail"
          type="email"
          onChange={onChangeHandler}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          onChange={onChangeHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default Login
