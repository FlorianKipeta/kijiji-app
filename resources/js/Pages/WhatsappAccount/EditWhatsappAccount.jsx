import Modal from '@components/modals/Modal';
import React from 'react';
import WhatsappAccountForm from './WhatsappAccountForm';

const EditWhatsappAccount = ({ show, whatsappAccount, setShow, refreshTable }) => {

    function onSuccess() {
        refreshTable();
        setShow(false);
    }

    return (
        <Modal
            isOpen={show}
            closeModal={() => setShow(false)}
            title="Edit WhatsappAccount"
            showActionButtons={false}
        >
            <div className="mb-3 px-2">
                <WhatsappAccountForm closeCallback={() => setShow(false)} whatsappAccount={whatsappAccount} submitLabel="Update" onSuccess={onSuccess} />
            </div>
        </Modal>
    )
}

export default EditWhatsappAccount;
