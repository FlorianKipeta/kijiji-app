import Modal from '@components/modals/Modal';
import React from 'react';
import ProjectForm from "@pages/Project/ProjectForm.jsx";

const CreateProject = ({show, setShow, refreshProjects}) => {

    function onSuccess() {
        refreshProjects();
        setShow(false);
    }

    return (
        <Modal
            isOpen={show}
            closeModal={() => setShow(false)}
            title="Add new Project"
            showActionButtons={false}
        >
            <div className="mb-3 px-2">
                <ProjectForm closeCallback={() => setShow(false)} submitLabel="Save" onSuccess={onSuccess}/>
            </div>
        </Modal>
    )
}

export default CreateProject
