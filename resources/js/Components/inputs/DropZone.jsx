import React from 'react'
import PropTypes from 'prop-types'
import {useDropzone} from 'react-dropzone';

export const DropZone = ({
                             onDropAccepted = () => null,
                             onDropRejected = () => null,
                             accept = null,
                             maxFiles = 0,
                             maxSize = Infinity,
                             message = null,
                             disabled = false
                         }) => {

    const {getRootProps, getInputProps} = useDropzone({
        onDropAccepted,
        onDropRejected,
        accept,
        maxSize,
        maxFiles,
        disabled
    });

    return (
        <div
            className={`mb-5 mt-2 flex items-center justify-center bg-opacity-50 h-full md:max-h-36 w-full border-2 border-dashed ${disabled ? 'bg-gray-50 border-blue-200 text-gray-500' : 'bg-gray-100 border-blue-400'}`} {...getRootProps()}>
            <input {...getInputProps()} />
            <div className="w-full">
                <p className="mx-3 my-2 p-1 text-sm text-center">Drag 'n' drop some files here, or click to select
                    files</p>
                <p className="mx-3 my-2 p-1 text-sm text-center">{message}</p>
            </div>
        </div>
    )
}

DropZone.propTypes = {
    onDropAccepted: PropTypes.func.isRequired,
    onDropRejected: PropTypes.func,
    accept: PropTypes.object,
    maxFiles: PropTypes.number,
    maxSize: PropTypes.number,
    message: PropTypes.string,
    disabled: PropTypes.bool
}
