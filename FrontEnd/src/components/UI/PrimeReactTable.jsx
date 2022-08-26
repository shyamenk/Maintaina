import React, {useState} from 'react'
import {DataTable} from 'primereact/datatable'
import {Column} from 'primereact/column'
import {InputText} from 'primereact/inputtext'
import {Dropdown} from 'primereact/dropdown'
import {InputNumber} from 'primereact/inputnumber'
const PrimeReactTable = ({data}) => {
  const [tableData, setTableData] = useState(null)

  const statuses = [
    {label: 'In Stock', value: 'INSTOCK'},
    {label: 'Low Stock', value: 'LOWSTOCK'},
    {label: 'Out of Stock', value: 'OUTOFSTOCK'},
  ]
  const onRowEditComplete1 = e => {
    let tableRowData = [...tableData]
    let {newData, index} = e

    tableRowData[index] = newData

    setTableData(tableRowData)
  }

  const statusEditor = options => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        optionLabel="label"
        optionValue="value"
        onChange={e => options.editorCallback(e.value)}
        placeholder="Select a Status"
        itemTemplate={option => {
          return (
            <span
              className={`product-badge status-${option.value.toLowerCase()}`}
            >
              {option.label}
            </span>
          )
        }}
      />
    )
  }
  const getStatusLabel = status => {
    switch (status) {
      case 'INSTOCK':
        return 'In Stock'

      case 'LOWSTOCK':
        return 'Low Stock'

      case 'OUTOFSTOCK':
        return 'Out of Stock'

      default:
        return 'NA'
    }
  }
  const textEditor = options => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={e => options.editorCallback(e.target.value)}
      />
    )
  }

  const statusBodyTemplate = rowData => {
    return getStatusLabel(rowData.inventoryStatus)
  }
  const priceBodyTemplate = rowData => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
    }).format(rowData.price)
  }
  const priceEditor = options => {
    return (
      <InputNumber
        value={options.value}
        onValueChange={e => options.editorCallback(e.value)}
        mode="currency"
        currency="USD"
        locale="en-US"
      />
    )
  }
  return (
    <div className="card p-fluid">
      <h5>Property Table</h5>
      <DataTable
        value={data}
        editMode="row"
        dataKey="id"
        onRowEditComplete={onRowEditComplete1}
        responsiveLayout="scroll"
      >
        <Column
          field="code"
          header="Code"
          editor={options => textEditor(options)}
          style={{width: '20%'}}
        ></Column>
        <Column
          field="name"
          header="Name"
          editor={options => textEditor(options)}
          style={{width: '20%'}}
        ></Column>
        <Column
          field="inventoryStatus"
          header="Status"
          body={statusBodyTemplate}
          editor={options => statusEditor(options)}
          style={{width: '20%'}}
        ></Column>
        <Column
          field="price"
          header="Price"
          body={priceBodyTemplate}
          editor={options => priceEditor(options)}
          style={{width: '20%'}}
        ></Column>
        <Column
          rowEditor
          headerStyle={{width: '10%', minWidth: '8rem'}}
          bodyStyle={{textAlign: 'center'}}
        ></Column>
      </DataTable>
    </div>
  )
}

export default PrimeReactTable
