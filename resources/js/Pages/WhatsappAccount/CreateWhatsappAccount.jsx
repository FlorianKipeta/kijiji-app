import Modal from '@components/modals/Modal';
import React from 'react';
import WhatsappAccountForm from "@pages/WhatsappAccount/WhatsappAccountForm.jsx";

const CreateWhatsappAccount = ({show, setShow, refreshWhatsappAccounts}) => {

    function onSuccess() {
        refreshWhatsappAccounts();
        setShow(false);
    }

    return (
        <Modal
            isOpen={show}
            closeModal={() => setShow(false)}
            title="Add new Whatsapp Account"
            showActionButtons={false}
        >
            <div className="mb-3 px-2">
                <WhatsappAccountForm closeCallback={() => setShow(false)} submitLabel="Save" onSuccess={onSuccess}/>
            </div>
        </Modal>
    )
}

export default CreateWhatsappAccount
