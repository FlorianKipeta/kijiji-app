import Modal from '@components/modals/Modal';
import React from 'react';
import ProjectForm from './ProjectForm';

const EditProject = ({ show, project, setShow, refreshTable }) => {

    function onSuccess() {
        refreshTable();
        setShow(false);
    }

    return (
        <Modal
            isOpen={show}
            closeModal={() => setShow(false)}
            title="Edit Project"
            showActionButtons={false}
        >
            <div className="mb-3 px-2">
                <ProjectForm closeCallback={() => setShow(false)} project={project} submitLabel="Update" onSuccess={onSuccess} />
            </div>
        </Modal>
    )
}

export default EditProject;
