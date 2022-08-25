import Input from './Input'

const GlobalFilter = ({filter, setFilter}) => {
  return (
    <Input
      label="Search"
      value={filter || ''}
      onChange={e => setFilter(e.target.value)}
      type="search"
      placeholder="Search ..."
    />
  )
}

export default GlobalFilter
