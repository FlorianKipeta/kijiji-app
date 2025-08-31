import React from 'react';
import PropTypes from 'prop-types'

export const SecondaryBtn = (props) => {
    const { Icon = () => <></>, labelName = null, disabled = false, onClick = () =>null, type="submit", ...otherProps } = props;
    return (
        <button
            onClick={onClick}
            type={type}
            className={
                `group flex items-center rounded-md bg-gray-200 text-sm font-medium px-4 py-2 focus:outline-none focus:border-gray-500 ${disabled ? 'text-gray-500' : 'text-gray-700 hover:text-gray-800 hover:bg-gray-300'}`
            }
            {...otherProps}
        >
            <Icon />
            {labelName}
        </button>
    )
}

SecondaryBtn.propTypes = {
    Icon: PropTypes.func,
    labelName: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    onClick: PropTypes.func
}
