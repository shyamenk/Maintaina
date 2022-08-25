import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
})

export const AuthContextProvider = props => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isError, setIsError] = useState({type: '', status: false})
  // const [users, setUsers] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsLoggedIn(true)
      navigate('home')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // const fetchUsers = () => {
  //   const fetchUser = 'http://localhost:3001/auth/getUsers'
  //   const result = fetchRequest('get', {}, fetchUser, '')
  //   return result
  // }

  //Logout the user from the server
  const logoutHandler = async () => {
    await axios({
      method: 'post',
      url: 'http://localhost:3001/auth/logout',
      withCredentials: true,
      credentials: 'include',
    })
      .then(function (response) {
        if (response.data.status === 'error') {
          setIsError({type: response.data.message, status: true})
        }
        localStorage.removeItem('token')
        setIsLoggedIn(false)
        navigate('login')
      })
      .catch(function (err) {
        console.log(err.message)
        navigate('login')
      })
  }

  const loginHandler = async (username, password) => {
    await axios({
      method: 'post',
      url: 'http://localhost:3001/auth/login',
      data: {username, password},
      withCredentials: true,
      credentials: 'include',
    })
      .then(response => {
        if (response.data.status === 'error') {
          setIsError({type: response.data.message, status: true})
          console.log(response.data)
        }
        if (response.data.user) {
          localStorage.setItem('token', response.data.token)
          setIsLoggedIn(true)
          navigate('home')
        }
      })
      .catch(function (err) {
        console.log(err.message)
        navigate('login')
      })
  }

  const registerHandler = async (name, username, password) => {
    await axios({
      method: 'POST',
      withCredentials: true,
      data: {
        name: name,
        username: username,
        password: password,
      },
      url: 'http://localhost:3001/auth/register',
    })
      .then(function (response) {
        if (response.data.status === 'error') {
          console.log(response.data)
          setIsError({type: response.data.message, status: true})
          console.log(response.data)
          navigate('/')
        } else {
          navigate('login')
        }
      })
      .catch(function (error) {
        setIsError({type: error.message, status: true})
      })
  }

  return (
    <AuthContext.Provider
      value={{
        // isRegistered: isRegistered,
        isError: isError,
        // users: users,
        setIsError: setIsError,
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onRegister: registerHandler,
        onLogin: loginHandler,
        // fetchUsers: fetchUsers,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext
