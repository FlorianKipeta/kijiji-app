import React, { useState } from 'react';
import { UsersTable } from '@components/user-management/UsersTable';
import Layout from '@/Layouts/AuthenticatedLayout';
import { UserForm } from '@components/user-management/UserForm';
import { PrimaryBtn } from '@components/buttons';
import Modal from "@components/modals/Modal.jsx";


function Users({ canEditUser, users, roles }) {

	const [showAddModal, setShowAddModal] = useState(false);

	return (
		<Layout title="Roles">

			<div className='flex justify-end mb-4'>
				<PrimaryBtn disabled={!canEditUser} onClick={() => setShowAddModal(true)} labelName='Create user' />
			</div>

			<div className="card">
				<UsersTable canEdit={canEditUser} users={users} />
			</div>

			<Modal
				title={'Add User'}
				showActionButtons={false}
				isOpen={showAddModal}
				closeModal={() => setShowAddModal(false)}
				size={'md'}
			>
				<UserForm
					canSubmit={canEditUser}
					onSuccess={() => {
						setShowAddModal(false)
						refetch()
					}}
                    roles={roles}
					closeCallback={() => setShowAddModal(false)}
				/>
			</Modal>
		</Layout>
	)
}


export default Users;
