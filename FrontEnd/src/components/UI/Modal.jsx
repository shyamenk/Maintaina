import React, {useReducer} from 'react'
import Button from './Button'
import Dropdown from './Dropdown'
import Input from './Input'
import classes from './Modal.module.css'

import axios from 'axios'

//Custom Hooks

// Reducer Function
const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD_VALUE':
      return {
        ...state,
        [action.field]: action.payload,
      }
    case 'RESET':
      return {
        [state]: action.payload,
      }
    default:
      return state
  }
}

const initialData = {
  building: 'Choose',
  name: '',
  location: '',
  features: '',
  address: '',
}

const Modal = props => {
  const [inputData, dispatch] = useReducer(formReducer, initialData)
  const {building, name, location, features, address} = inputData

  const submitHandler = async event => {
    event.preventDefault()

    const URL = 'http://localhost:3001/home/admin/addProperty'
    await axios
      .post(URL, {
        building,
        name,
        location,
        features,
        address,
      })
      .then(response => {
        props.fetchData()
        dispatch({type: 'RESET', payload: initialData})
      })
      .catch(error => {
        console.log(error)
      })
  }

  const addPropertyInputHandler = event => {
    console.log(inputData)
    dispatch({
      type: 'SET_FIELD_VALUE',
      field: event.target.name,
      payload: event.target.value,
    })
  }

  const closeModal = event => {
    props.onClose()
  }
  return (
    <div className={classes.modal}>
      <div className={classes['modal-content']}>
        <span onClick={closeModal} className={classes.close}>
          &times;
        </span>
        <form onSubmit={submitHandler}>
          <h3>Add-Property</h3>
          <div>
            <Dropdown
              name="building"
              onChange={addPropertyInputHandler}
              label="Building"
              value={inputData.building}
            />

            <Input
              name="name"
              onChange={addPropertyInputHandler}
              label="Name"
              type="text"
              value={inputData.name || ''}
              required
            />
            <Input
              name="location"
              onChange={addPropertyInputHandler}
              label="Location"
              type="text"
              value={inputData.location || ''}
            />
            <Dropdown
              name="features"
              onChange={addPropertyInputHandler}
              label="Features"
              value={inputData.features}
            />
            <Input
              name="address"
              onChange={addPropertyInputHandler}
              label="Address"
              type="text"
              value={inputData.address || ''}
            />
          </div>
          <div>
            <Button type="submit">Add</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Modal
