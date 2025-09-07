import Modal from '@components/modals/Modal';
import React from 'react';
import OpenaiForm from "@pages/Openai/OpenaiForm.jsx";

const CreateOpenai = ({show, setShow, refreshOpenais}) => {

    function onSuccess() {
        refreshOpenais();
        setShow(false);
    }

    return (
        <Modal
            isOpen={show}
            closeModal={() => setShow(false)}
            title="Add new Openai"
            showActionButtons={false}
        >
            <div className="mb-3 px-2">
                <OpenaiForm closeCallback={() => setShow(false)} submitLabel="Save" onSuccess={onSuccess}/>
            </div>
        </Modal>
    )
}

export default CreateOpenai
