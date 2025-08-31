import React from 'react'
import PropTypes from 'prop-types'

export const PageLength = ({ pageSize, setPageSize }) => {
    return (
        <div className="flex items-center space-x-2 max-w-xs">
            {/* <label htmlFor="page_length" className="sr-only">Show</label> */}
            <select value={pageSize} id="page_length" onChange={e => setPageSize(Number(e.target.value))} className="rounded py-1" >
                {[10, 20, 30, 40, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                        {pageSize}
                    </option>
                ))}
            </select>

        </div>
    )
}

PageLength.propTypes = {
    setPageSize: PropTypes.func
}