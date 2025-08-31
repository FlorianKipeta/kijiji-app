import React from 'react'

const TextArea = ({
	className = '',
	onChange = null,
	value = '',
	required = false,
	readOnly = false,
	disabled = false,
	rows = 3,
	id,
	...others
}) => {

	return (
		<textarea
			id={id}
			className={'my-1 appearance-none block w-full px-2 py-1.5 border border-gray-300 placeholder-gray-500 text-gray-700 rounded-md focus:outline-none focus:ring-blue-400 focus:border-blue-400 focus:z-10 ' + className}
			onChange={onChange}
			value={value}
			required={required}
			readOnly={readOnly}
			disabled={disabled}
			rows={rows}
			{...others}
		>

		</textarea>
	)
}

export default TextArea
