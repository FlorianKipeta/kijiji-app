// @ts-nocheck
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';
import { ReactTable } from './ReactTable';


export const ServerSideTable = ({ columns, fetchData, totalPages, data, loading=false, emptyMessage = "No Data" }) => {

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
			initialState: { pageSize: 10, pageIndex: 0 },
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
		fetchData({ pageIndex: state.pageIndex, pageSize: state.pageSize, globalFilter: state.globalFilter });
	}, [fetchData, state.pageIndex, state.pageSize, state.globalFilter]);

	return (
		<ReactTable
			getTableProps={getTableProps} getTableBodyProps={getTableBodyProps} headerGroups={headerGroups} rows={rows} prepareRow={prepareRow}
			visibleColumns={visibleColumns} state={state} setGlobalFilter={setGlobalFilter} pageOptions={pageOptions} page={page} gotoPage={gotoPage}
			previousPage={previousPage} nextPage={nextPage} setPageSize={setPageSize} canPreviousPage={canPreviousPage} canNextPage={canNextPage}
			loading={loading} emptyMessage={emptyMessage}
		/>
	)
}

ServerSideTable.propTypes = {
	columns: PropTypes.array.isRequired,
	data: PropTypes.array.isRequired,
	loading: PropTypes.bool,
	fetchData: PropTypes.func.isRequired,
	totalPages: PropTypes.number.isRequired
}
