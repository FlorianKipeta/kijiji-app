import Modal from '@components/modals/Modal';
import React from 'react';
import OpenaiForm from './OpenaiForm';

const EditOpenai = ({ show, openai, setShow, refreshTable }) => {

    function onSuccess() {
        refreshTable();
        setShow(false);
    }

    return (
        <Modal
            isOpen={show}
            closeModal={() => setShow(false)}
            title="Edit Openai"
            showActionButtons={false}
        >
            <div className="mb-3 px-2">
                <OpenaiForm closeCallback={() => setShow(false)} openai={openai} submitLabel="Update" onSuccess={onSuccess} />
            </div>
        </Modal>
    )
}

export default EditOpenai;
