import React from 'react';
import PropTypes from 'prop-types';

/**
 * form input suitable for email, text, password and other text related input
 * @returns
 */
export const Input = ({ error = false, ...props }) => {

    // @ts-ignore
    const { id= null, type= 'text', name = null, className= null, value = undefined, label= null, visible_label = false, refs, readOnly, ...other_props } = props;

    if (readOnly) {
        return <input readOnly id={id} type={type} ref={refs} name={name} value={value} className='my-1 appearance-none w-full px-2 py-1 bg-gray-100 text-gray-500 border border-gray-200 rounded-md focus:outline-none focus:ring-0 focus:border-gray-200 ' />
    }

    return (
        <>
            {/* <label htmlFor={id} className={visible_label ? '' : 'sr-only'}>{label}</label> */}
            <input id={id} type={type} ref={refs} name={name} value={value} className={`my-1 appearance-none block w-full px-2 py-1 border ${error ? 'border-red-300' : 'border-gray-300'} placeholder-gray-500 text-gray-700 rounded-md focus:outline-none focus:ring-blue-400 focus:border-blue-400 focus:z-10 ${className}`} {...other_props} />
        </>
    )
};

Input.propTypes = {
    id: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
    visible_label: PropTypes.bool,
    refs: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ])
}
