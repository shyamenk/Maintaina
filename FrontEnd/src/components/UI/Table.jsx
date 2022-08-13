import classes from './Table.module.css'

const Table = ({data}) => {
  const tableData = Array.isArray(data) && data.length ? data[0] : {}

  const headers = Object.keys(tableData)
  // const [inEditMode, setInEditMode] = useState({
  //   status: false,
  //   rowKey: null,
  // })
  // const [unitPrice, setUnitPrice] = useState(null)
  // const onEdit = ({id, currentUnitPrice}) => {
  //   setInEditMode({
  //     status: true,
  //     rowKey: id,
  //   })
  //   setUnitPrice(currentUnitPrice)
  // }

  return (
    <table className={classes.table}>
      <tbody>
        <tr key={Math.floor(Math.random() * 999999)}>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
        {data.map(row => {
          return (
            <tr key={Math.floor(Math.random() * 999999)}>
              {headers.map((header, index) => (
                <td key={index}>{row[header]}</td>
              ))}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Table
