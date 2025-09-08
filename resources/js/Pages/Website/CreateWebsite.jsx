import Modal from '@components/modals/Modal';
import React from 'react';
import WebsiteForm from "@pages/Website/WebsiteForm.jsx";

const CreateWebsite = ({show, setShow, refreshWebsites}) => {

    function onSuccess() {
        refreshWebsites();
        setShow(false);
    }

    return (
        <Modal
            isOpen={show}
            closeModal={() => setShow(false)}
            title="Add new Website"
            showActionButtons={false}
        >
            <div className="mb-3 px-2">
                <WebsiteForm closeCallback={() => setShow(false)} submitLabel="Save" onSuccess={onSuccess}/>
            </div>
        </Modal>
    )
}

export default CreateWebsite
