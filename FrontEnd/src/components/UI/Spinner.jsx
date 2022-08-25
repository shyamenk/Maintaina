import React, {useState} from 'react'
//import classes from './Spinner.module.css'

const Spinner = () => {
  const DUMMY_DATA = [
    {
      ID: 1,
      Name: 'shyamenk',
      Email: 'shyamenk@gmail.com',
      Phone: '2 456-1234',
    },
    {
      ID: 2,
      Name: 'John',
      Email: 'john@gmail.com',
      Phone: '123-456-1234',
    },
    {
      ID: 3,
      Name: 'kumar',
      Email: 'kumar@gmail.com',
      Phone: '555-555-5555',
    },
    {
      ID: 4,
      Name: 'kumar',
      Email: 'kumar@gmail.com',
      Phone: '555-555-5555',
    },
    {
      ID: 5,
      Name: 'kumar',
      Email: 'kumar@gmail.com',
      Phone: '555-555-5555',
    },
    {
      ID: 6,
      Name: 'kumar',
      Email: 'kumar@gmail.com',
      Phone: '555-555-5555',
    },
  ]
  //const [data, setData] = useState([])

  const [inEditMode, setInEditMode] = useState({
    status: true,
    rowKey: null,
  })

  const [unitPrice, setUnitPrice] = useState(null)

  /**
   *
   * @param id - The id of the product
   * @param currentUnitPrice - The current unit price of the product
   */
  const onEdit = ({id, currentUnitPrice}) => {
    setInEditMode({
      status: true,
      rowKey: id,
    })
    setUnitPrice(currentUnitPrice)
  }

  /**
   *
   * @param id
   * @param newUnitPrice
   */

  /**
   *
   * @param id -The id of the product
   * @param newUnitPrice - The new unit price of the product
   */
  const onSave = ({id, newUnitPrice}) => {
    // updateInventory({id, newUnitPrice})
  }

  const onCancel = () => {
    // reset the inEditMode state value
    setInEditMode({
      status: false,
      rowKey: null,
    })
    // reset the unit price state value
    setUnitPrice(null)
  }
  return (
    <div className="container">
      <h1>Simple Inventory Table</h1>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Category</th>
            <th>Unit Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {DUMMY_DATA.map(item => (
            <tr key={item.ID}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>
                {inEditMode.status && inEditMode.rowKey === item.id ? (
                  <input
                    value={unitPrice}
                    onChange={event => setUnitPrice(event.target.value)}
                  />
                ) : (
                  item.unit_price
                )}
              </td>
              <td>
                {inEditMode.status && inEditMode.rowKey === item.id ? (
                  <React.Fragment>
                    <button
                      className={'btn-success'}
                      onClick={() =>
                        onSave({id: item.ID, newUnitPrice: unitPrice})
                      }
                    >
                      Save
                    </button>

                    <button
                      className={'btn-secondary'}
                      style={{marginLeft: 8}}
                      onClick={() => onCancel()}
                    >
                      Cancel
                    </button>
                  </React.Fragment>
                ) : (
                  <button
                    className={'btn-primary'}
                    onClick={() =>
                      onEdit({id: item.id, currentUnitPrice: item.unit_price})
                    }
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Spinner
