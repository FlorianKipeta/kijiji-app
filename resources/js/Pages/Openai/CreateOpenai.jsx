import Modal from '@components/modals/Modal';
import React from 'react';
import OpenaiForm from "@pages/Openai/OpenaiForm.jsx";

const CreateOpenai = ({openai = null, show, setShow, refreshOpenais}) => {

    function onSuccess() {
        refreshOpenais();
        setShow(false);
    }

    return (
        <Modal
            isOpen={show}
            closeModal={() => setShow(false)}
            title="Update OpenAI Config"
            showActionButtons={false}
        >
            <div className="mb-3 px-2">
                <OpenaiForm openai={openai} closeCallback={() => setShow(false)} submitLabel="Save" onSuccess={onSuccess}/>
            </div>
        </Modal>
    )
}

export default CreateOpenai
