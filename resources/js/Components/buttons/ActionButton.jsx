import React from 'react';
import PropTypes from 'prop-types'

export const ActionBtn = (props) => {
	const { Icon = () => <></>, labelName=null, disabled=false, type="submit", ...otherProps } = props

	return (
		<button
			{...otherProps}
			type={type}
			disabled={disabled}
			className={`group flex w-max items-center rounded-md bg-blue-600 font-bold px-5 py-3 focus:outline-none focus:border-blue-400 ${disabled ? "text-blue-300" : 'text-blue-100 hover:bg-blue-800 hover:px-7 transition-all duration-300 hover:text-blue-100'}`}>
			<Icon />
			{labelName}
		</button>
	)
}

ActionBtn.propTypes = {
	Icon: PropTypes.func,
	labelName: PropTypes.string.isRequired
}
