// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types'

/**
 * form input type checkbox
 */
export function CheckBox({
                             id = null,
                             isChecked = false,
                             value = '',
                             label = null,
                             onChange = event => null,
                             labelClass = ''
                         }) {
    return (
        <label className="inline-flex items-center my-1 mr-auto py-1" htmlFor={id}>
            <input id={id} type="checkbox"
                   className="h-4 w-4 text-blue-500 focus:outline-none focus:ring-0 border-gray-300 rounded"
                   value={value} checked={isChecked} onChange={onChange}/>
            <span className={'ml-2 text-gray-700 leading-4 mb-0 pb-0 ' + labelClass}>{label}</span>
        </label>
    )
}

CheckBox.propTypes = {
    id: PropTypes.string,
    isChecked: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onChange: PropTypes.func,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
}
