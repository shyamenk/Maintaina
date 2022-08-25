import React from 'react'
import classes from './Dropdown.module.css'
import {propertyData} from '../../store/Dropdown.Data'
const Dropdown = props => {
  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ''
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <select name={props.name} onChange={props.onChange} required>
        <option value="" disabled hidden>
          Choose One
        </option>
        {propertyData.map(property => (
          <option key={property.id} defaultValue={property.name}>
            {property.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Dropdown
