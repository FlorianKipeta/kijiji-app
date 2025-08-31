// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';
import { useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';
import { ReactTable } from './ReactTable';


export const Table = ({ columns, data, loading = false, emptyMessage = "No Data", hiddenColumns = [] }) => {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        visibleColumns,
        state,
        setGlobalFilter,
        pageOptions,
        page,
        gotoPage,
        previousPage,
        nextPage,
        setPageSize,
        canPreviousPage,
        canNextPage,

    } = useTable(
        {
            columns,
            data,
            initialState: { pageSize: 10, pageIndex: 0, hiddenColumns: hiddenColumns }
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );


    return (
        <ReactTable
            getTableProps={getTableProps} getTableBodyProps={getTableBodyProps} headerGroups={headerGroups} rows={rows} prepareRow={prepareRow}
            visibleColumns={visibleColumns} state={state} setGlobalFilter={setGlobalFilter} pageOptions={pageOptions} page={page} gotoPage={gotoPage}
            previousPage={previousPage} nextPage={nextPage} setPageSize={setPageSize} canPreviousPage={canPreviousPage} canNextPage={canNextPage}
            loading={loading} emptyMessage={emptyMessage}
        />
    )
}

Table.propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    loading: PropTypes.bool
}
