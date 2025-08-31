import React from 'react'

export const BaseTable = ({ children, ...otherProps }) => {
	return (
		<div className="flex w-full flex-col">
			<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
					<div className="overflow-hidden border-b border-gray-100 sm:rounded-lg">
						<table className="min-w-full divide-y divide-gray-200" {...otherProps}>
							{children}
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}


BaseTable.Thead = ({ children, className = null }) => {
	return (
		<thead className={`bg-slate-200 bg-opacity-70 ${className}`}>
			{children}
		</thead>
	)
}

BaseTable.Tbody = ({ children, className = null, ...props }) => {
	return (
		<tbody className={`bg-gray-50 divide-y divide-gray-200 ${className}`} {...props}>
			{children}
		</tbody>
	)
}

BaseTable.Tr = ({ children, className = null, ...props }) => {
	return (
		<tr className={className} {...props}>
			{children}
		</tr>
	)
}

BaseTable.Th = ({ children, className = null, ...props }) => {
	return (
		<th scope="col" className={`px-6 py-3 text-left font-semibold text-slate-800 capitalize ${className}`} {...props}>
			{children}
		</th>
	)
}

BaseTable.Td = ({ children, className = null, colSpan = 1, ...props }) => {
	return (
		<td colSpan={colSpan} className={`px-6 py-4 whitespace-nowrap ${className}`} {...props}>
			{children}
		</td>
	)
}
