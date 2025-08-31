import React from 'react'
import { Pagination } from './Pagination';
import { GlobalFilter } from './GlobalFilter';
import { PageLength } from './PageLength';
import { ArrowLongDownIcon, ArrowLongUpIcon } from '@heroicons/react/24/outline';
import { BaseTable } from './BaseTable';

export function ReactTable({
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
	loading, emptyMessage
}) {
	return (
		<div className="flex flex-col">
			<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">


					<div className="w-100 flex justify-between items-center mb-4 space-x-6">
						<PageLength pageSize={state.pageSize} setPageSize={setPageSize} />
						<GlobalFilter globalFilter={state.globalFilter ?? ''} setGlobalFilter={setGlobalFilter} />
					</div>


					<BaseTable {...getTableProps()}>
						<BaseTable.Thead>
							{headerGroups.map(headerGroup => (

								<BaseTable.Tr {...headerGroup.getHeaderGroupProps()}>
									{headerGroup.headers.map(column => (
										<BaseTable.Th {...column.getHeaderProps(column.getSortByToggleProps())} scope="col">
											<div className="flex justify-between items-center">
												<span>
													{column.render('Header')}
												</span>
												<span className="flex flex-nowrap -space-x-2">
													<ArrowLongDownIcon className={`h-3 w-3 ${column.isSortedDesc ? 'opacity-100' : 'opacity-30'}`} />
													<ArrowLongUpIcon className={`h-3 w-3 ${column.isSortedDesc === false ? 'opacity-100' : 'opacity-30'}`} />
												</span>
											</div>
										</BaseTable.Th>
									))}
								</BaseTable.Tr>
							))}
						</BaseTable.Thead>
						<BaseTable.Tbody {...getTableBodyProps()}>

							{
								loading ?
									<BaseTable.Tr>
										<BaseTable.Td colSpan={visibleColumns.length} className="px-4 py-2 whitespace-nowrap">
											<div className="flex items-center justify-center w-full h-full">
												<div className="animate-spin h-5 w-5 border-blue-500 border-l-2 border-t-2 m-3  rounded-full">

												</div>
												loading data
											</div>
										</BaseTable.Td>
									</BaseTable.Tr>
									:
									!page.length &&
									<BaseTable.Tr>
										<BaseTable.Td colSpan={visibleColumns.length} className="px-4 py-2 whitespace-nowrap">
											<div className="text-center">
												{emptyMessage}
											</div>
										</BaseTable.Td>
									</BaseTable.Tr>
							}

							{page.map((row, i) => {
								prepareRow(row);
								return (
									<BaseTable.Tr className="even:bg-blue-50 even:bg-opacity-40" {...row.getRowProps()} >
										{row.cells.map(cell => (
											<BaseTable.Td {...cell.getCellProps()} className="px-1 md:px-4 py-2 whitespace-nowrap">{cell.render('Cell')}</BaseTable.Td>
										))}
									</BaseTable.Tr>
								)
							})}


						</BaseTable.Tbody>
					</BaseTable>
					<Pagination gotoPage={gotoPage} canNextPage={canNextPage} nextPage={nextPage} canPreviousPage={canPreviousPage} previousPage={previousPage} pageIndex={state.pageIndex} pageSize={state.pageSize} pageOptions={pageOptions} page={page} />
				</div>
			</div>
		</div >
	)
}
