import React from 'react';
import PropTypes from 'prop-types'

export const SuccessBtn = (props) => {
    const { Icon = () => <></>, labelName = null, disabled=false, type="submit", ...otherProps } = props
    return (
        <button
            {...otherProps}
            type={type}
            disabled={disabled}
            className={`group flex w-max items-center rounded-md text-sm font-medium px-4 py-2 focus:outline-none focus:border-sky-900 ${disabled ? "text-sky-200 cursor-not-allowed bg-sky-500" : 'text-sky-50 bg-sky-800 hover:bg-sky-900 hover:text-sky-100'}`}>
            <Icon />
            {labelName}
        </button>
    )
}

SuccessBtn.propTypes = {
    Icon: PropTypes.func,
    labelName: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
}
