import { useTable } from 'react-table'

const data = [
    {
      name: 'John Doe',
      age: 32,
      email: 'john.doe@example.com'
    },
    {
      name: 'Jane Smith',
      age: 24,
      email: 'jane.smith@example.com'
    },
    // ...
  ]
  
  const columns = [
    {
      Header: 'Name',
      accessor: 'name'
    },
    {
      Header: 'Age',
      accessor: 'age'
    },
    {
      Header: 'Email',
      accessor: 'email'
    }
  ]
  function HopDongTable() {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data })
  
    return (
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
export default HopDongTable;