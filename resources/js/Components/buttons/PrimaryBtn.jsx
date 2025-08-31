import React from 'react';
import PropTypes from 'prop-types'

export const PrimaryBtn = (props) => {
    const {Icon = () => <></>, labelName = null, disabled = false, type = "submit", className, ...otherProps} = props
    return (
        <button
            {...otherProps}
            type={type}
            disabled={disabled}
            className={`group flex items-center rounded-md font-medium px-4 py-1.5 focus:outline-none focus:border-blue-400 ${disabled ? "text-blue-200 cursor-not-allowed bg-blue-500" : 'text-blue-50 bg-blue-600 hover:bg-blue-800 hover:text-blue-100'} ${className}`}>
            <Icon/>
            {labelName}
        </button>
    )
}

PrimaryBtn.propTypes = {
    Icon: PropTypes.func,
    labelName: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.node]).isRequired
}
