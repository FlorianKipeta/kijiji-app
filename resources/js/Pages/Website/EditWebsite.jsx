import Modal from '@components/modals/Modal';
import React from 'react';
import WebsiteForm from './WebsiteForm';

const EditWebsite = ({ show, website, setShow, refreshTable }) => {

    function onSuccess() {
        refreshTable();
        setShow(false);
    }

    return (
        <Modal
            isOpen={show}
            closeModal={() => setShow(false)}
            title="Edit Website"
            showActionButtons={false}
        >
            <div className="mb-3 px-2">
                <WebsiteForm closeCallback={() => setShow(false)} website={website} submitLabel="Update" onSuccess={onSuccess} />
            </div>
        </Modal>
    )
}

export default EditWebsite;
