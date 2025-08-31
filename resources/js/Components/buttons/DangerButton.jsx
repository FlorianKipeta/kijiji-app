import React from 'react';
import PropTypes from 'prop-types'

export const DangerBtn = (props) => {
    const { Icon = () => <></>, labelName = null, disabled = false, type="submit", ...otherProps } = props

    return (
        <button
            {...otherProps}
            type={type}
            disabled={disabled}
            className={`group flex w-max items-center rounded-md text-sm font-medium px-4 py-2 focus:outline-none focus:border-red-300 ${disabled ? "text-red-300 bg-red-500 cursor-not-allowed" : 'text-red-50 bg-red-500 hover:bg-red-800 hover:text-red-100'}`}>
            <Icon />
            {labelName}
        </button>
    )
}

DangerBtn.propTypes = {
    Icon: PropTypes.func,
    labelName: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired
}
