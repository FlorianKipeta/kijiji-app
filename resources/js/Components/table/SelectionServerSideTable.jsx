// @ts-nocheck
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useGlobalFilter, usePagination, useSortBy, useTable} from 'react-table';
import {SelectionReactTable} from "@components/table/SelectionReactTable.jsx";


export const SelectionServerSideTable = ({
                                             columns,
                                             fetchData,
                                             totalPages,
                                             data,
                                             loading = false,
                                             emptyMessage = "No Data",
                                             selectedRows,
                                             setSelectedRows
                                         }) => {
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
            initialState: {pageSize: 10, pageIndex: 0},
            manualGlobalFilter: true,
            manualPagination: true,
            autoResetSortBy: false,
            pageCount: totalPages,
        },
        useGlobalFilter,
        useSortBy,
        usePagination,
    );


    useEffect(() => {
        fetchData({pageIndex: state.pageIndex, pageSize: state.pageSize, globalFilter: state.globalFilter});
    }, [fetchData, state.pageIndex, state.pageSize, state.globalFilter]);

    const toggleRowSelection = (row) => {
        const newRowSelection = [...selectedRows];

        if (newRowSelection.includes(row.original.id)) {
            // Remove row if already selected
            newRowSelection.splice(newRowSelection.indexOf(row.original.id), 1);
        } else {
            // Add row if not selected
            newRowSelection.push(row.original.id);
        }

        setSelectedRows(newRowSelection);
    };

    // Add a new function to handle selecting all rows
    const toggleSelectAllRows = () => {
        const allRowsSelected = selectedRows.length === rows.length;
        const newSelectedRows = allRowsSelected ? [] : rows.map((row) => row.original.id);
        setSelectedRows(newSelectedRows);
    };

    return (
        <SelectionReactTable
            getTableProps={getTableProps}
            getTableBodyProps={getTableBodyProps}
            headerGroups={headerGroups}
            rows={rows}
            prepareRow={(row) => {
                prepareRow(row);
                row.isSelected = selectedRows.includes(row.original.id);
            }}
            visibleColumns={visibleColumns}
            state={state}
            setGlobalFilter={setGlobalFilter}
            pageOptions={pageOptions}
            page={page}
            gotoPage={gotoPage}
            previousPage={previousPage}
            nextPage={nextPage}
            setPageSize={setPageSize}
            canPreviousPage={canPreviousPage}
            canNextPage={canNextPage}
            loading={loading}
            emptyMessage={emptyMessage}
            toggleRowSelection={toggleRowSelection}
            selectedRows={selectedRows}
            toggleSelectAllRows={toggleSelectAllRows}
        />
    );
}


SelectionServerSideTable.propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    loading: PropTypes.bool,
    fetchData: PropTypes.func.isRequired,
    totalPages: PropTypes.number.isRequired
}
