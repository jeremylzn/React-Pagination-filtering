import React, { useMemo } from 'react'
import { useTable, usePagination, useGlobalFilter } from 'react-table'
import { COLUMNS } from './columns' // Import columns data
import './table.scss'
import moment from 'moment'
import { GlobalFilter } from './GlobalFilter' // Import search filter component


export const BasicTable = ({ patients }: any) => {

    const columns = useMemo<any>(() => COLUMNS, [])
    const data = patients

    // Using react-table functions
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page, // Limited row for pagination
        nextPage, // onClick function for next page
        previousPage, // onClick function for previous page
        pageOptions,
        gotoPage, // Jump to specific page
        pageCount,
        state,
        setGlobalFilter,
        canPreviousPage,  // Checking if prev page exist
        canNextPage, // Checking if next page exist
        prepareRow
    } = useTable({
        columns, // Init column
        data, // Init data
        initialState: { pageIndex: 0 } // Init page number
    }, useGlobalFilter, usePagination)

    const { pageIndex } = state
    const { globalFilter } = state



    return (
        <>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} /> {/* Search filter */}
            <div className="container mt-2">
                <div className="table-responsive">
                    <table {...getTableProps()} className="table table-bordered table-hover">
                        <thead>
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                    ))}
                                </tr>
                            ))}

                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {page.map(row => {
                                prepareRow(row)
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map(cell => {
                                            // Checking row is date in ISO format to display DateString format
                                            return (moment(cell.value, moment.ISO_8601, true).isValid()) ? <td>{new Date(cell.value).toLocaleDateString()}</td> : <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="container">
                    {/* Previous page */}
                    <button className="btn btn-light rounded-pill m-2" onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
                    {pageIndex + 1 < pageOptions.length && <button className="btn btn-light rounded-pill btn-sm m-2" onClick={() => gotoPage(pageIndex + 1)}>{pageIndex + 1}</button>}
                    {pageIndex + 2 < pageOptions.length &&<button className="btn btn-light rounded-pill btn-sm m-2" onClick={() => gotoPage(pageIndex + 2)}>{pageIndex + 2}</button>}
                    {pageIndex + 3 < pageOptions.length && <button className="btn btn-light rounded-pill btn-sm m-2" onClick={() => gotoPage(pageIndex + 3)}>{pageIndex + 3}</button>}
                    {pageIndex + 3 < pageOptions.length && <span> ... </span> }
                    <button className="btn btn-light rounded-pill btn-sm m-2 text-center" onClick={() => gotoPage(pageOptions.length -1)}>{pageOptions.length}</button>
                    {/* Next page */}
                    <button className="btn btn-light rounded-pill m-2" onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
                </div>

                <div className="container mb-5">
                            {/* Jumping to first page */}
                            <button className="btn btn-light m-2" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
                            {/* Display current page */}
                            <span>
                                Page{' '}
                                <strong>
                                    {pageIndex + 1} of {pageOptions.length}
                                </strong>{' '}
                            </span>
                            <span>
                                {/* Jumping to specific page */}
                                | Go to page: {' '}
                                <input type="number" defaultValue={pageIndex + 1}
                                    onChange={e => {
                                        const pageNumber = (e.target.value) ? Number(e.target.value) - 1 : 0
                                        gotoPage(pageNumber)
                                    }} style={{ width: '50px' }} />
                            </span>
                            {/* Jumping to last page */}
                            <button className="btn btn-light m-2" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>

                </div>
            </div></>
    )
}