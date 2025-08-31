import Modal from '@components/modals/Modal';
import React from 'react';
import CustomerForm from "@pages/Customer/CustomerForm.jsx";

const CreateCustomer = ({show, setShow, refreshCustomers}) => {

    function onSuccess() {
        refreshCustomers();
        setShow(false);
    }

    return (
        <Modal
            isOpen={show}
            closeModal={() => setShow(false)}
            title="Add new Customer"
            showActionButtons={false}
        >
            <div className="mb-3 px-2">
                <CustomerForm closeCallback={() => setShow(false)} submitLabel="Save" onSuccess={onSuccess}/>
            </div>
        </Modal>
    )
}

export default CreateCustomer
