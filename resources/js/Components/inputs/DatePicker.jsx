import React from 'react'
import ReactDatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

export const DatePicker = ({ error = false, className = '', onChange, selected, readOnly = false, ...props }) => {
	return (
		<ReactDatePicker
			dateFormat={'dd/MM/yyyy'}
			showYearDropdown
			showMonthDropdown
			dropdownMode="select"
			selected={selected}
			onChange={onChange}
			readOnly={readOnly}
			className={`my-1 appearance-none block w-full px-2 py-1 border ${readOnly ? 'bg-gray-100 text-gray-500' : 'text-gray-700 '} ${error ? 'border-red-300' : 'border-gray-300'} placeholder-gray-500 rounded-md focus:outline-none focus:ring-blue-400 focus:border-blue-400 focus:z-10 ${className}`}
			{...props}>

		</ReactDatePicker>
	)
}
