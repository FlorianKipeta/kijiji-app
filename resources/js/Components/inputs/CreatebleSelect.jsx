import React from 'react';
import PropTypes from 'prop-types';
// import ReactSelect from 'react-select/creatable';

export const CreatableSelect = ({ id, label, showLabel, options, value, onChange }) => {
	return (
		<div className="">
			<label htmlFor={id} className={showLabel ? '' : 'sr-only'}>{label}</label>
			<ReactSelect
				id={id}
				options={options}
				onChange={onChange}
				value={value}
			>

			</ReactSelect>
		</div>
	)
}

CreatableSelect.propTypes = {
	id: PropTypes.string,
	label: PropTypes.string,
	showLabel: PropTypes.bool,
	options: PropTypes.arrayOf(
		PropTypes.exact({
			value: PropTypes.string,
			label: PropTypes.string
		})
	),
	value: PropTypes.object,
	onChange: PropTypes.func
}