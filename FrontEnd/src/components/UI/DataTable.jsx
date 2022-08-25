import classes from './DataTable.module.css'
//import EditableCell from './EditCell'

//React Table Library
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
  useRowSelect,
} from 'react-table'

// UI elements
import {Checkbox} from './CheckBox'
import GlobalFilter from './GlobalFilter'
//import {useState} from 'react'

const DataTable = ({columns, data}) => {
  // const defaultColumn = {
  //   Cell: EditableCell,
  // }
  // console.log('render')

  const tableHooks = hooks => {
    hooks.visibleColumns.push(columns => [
      ...columns,
      {
        id: 'Edit',
        Header: 'Edit',
        Cell: ({row}) => (
          <button onClick={() => handleEdit(row.original)}>Edit</button>
        ),
      },
    ])
  }
  const tableInstance = useTable(
    {data, columns},
    useGlobalFilter,
    tableHooks,
    useSortBy,
    usePagination,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => {
        return [
          {
            id: 'selection',
            Header: ({getToggleAllRowsSelectedProps}) => (
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({row}) => (
              <Checkbox
                onClick={() => {
                  handleDelete(row.original)
                }}
                {...row.getToggleRowSelectedProps()}
              />
            ),
          },

          ...columns,
        ]
      })
    },
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // rows,
    page,
    // nextPage,
    // previousPage,
    prepareRow,
    // selectedFlatRows,
    state,
    setGlobalFilter,
  } = tableInstance
  const {globalFilter} = state

  const handleEdit = row => {
    console.log(row)
  }
  const handleDelete = row => {
    // const userId = row.original.username
    // axios({
    //   method: 'DELETE',
    //   url: 'http://localhost:3001/auth/delete/' + userId,
    //   withCredentials: true,
    //   credentials: 'include',
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data)
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
    // console.log(selectedFlatRows)
    // setedit(prev => !prev)
  }
  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <div className={classes.box}>
        <div className={classes.container}>
          <div className={classes.innerContainer}>
            <table className={classes.table} {...getTableProps()}>
              <thead>
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                      <th
                        className={classes.th}
                        {...column.getHeaderProps(
                          column.getSortByToggleProps(),
                        )}
                      >
                        {column.render('Header')}
                        {column.isSorted
                          ? column.isSortedDesc
                            ? ' ▼'
                            : ' ▲'
                          : ''}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row, idx) => {
                  prepareRow(row)

                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell, idx) => (
                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* {
        <>
          <button onClick={() => previousPage()}>Previous</button>
          <button onClick={() => nextPage()}>Next</button>
        </>
      } */}
    </>
  )
}

export default DataTable
