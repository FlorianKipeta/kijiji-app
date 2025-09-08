import Modal from '@components/modals/Modal';
import React from 'react';
import FileForm from './FileForm';

const EditFile = ({ show, file, setShow, refreshTable }) => {

    function onSuccess() {
        refreshTable();
        setShow(false);
    }

    return (
        <Modal
            isOpen={show}
            closeModal={() => setShow(false)}
            title="Edit File"
            showActionButtons={false}
        >
            <div className="mb-3 px-2">
                <FileForm closeCallback={() => setShow(false)} file={file} submitLabel="Update" onSuccess={onSuccess} />
            </div>
        </Modal>
    )
}

export default EditFile;
