import Modal from '@components/modals/Modal';
import React from 'react';
import FileForm from "@pages/Project/File/FileForm.jsx";

const CreateFile = ({show, setShow, refreshFiles, project}) => {

    function onSuccess() {
        refreshFiles();
        setShow(false);
    }

    return (
        <Modal
            isOpen={show}
            closeModal={() => setShow(false)}
            title="Add new File"
            showActionButtons={false}
        >
            <div className="mb-3 px-2">
                <FileForm closeCallback={() => setShow(false)} submitLabel="Save" onSuccess={onSuccess} project={project}/>
            </div>
        </Modal>
    )
}

export default CreateFile
