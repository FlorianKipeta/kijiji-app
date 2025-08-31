import React from 'react'
import { UserAccount } from '@components/user-management/UserAccount'
import { UserPermission } from '@components/user-management/UserPermission'
import Layout from '@/Layouts/AuthenticatedLayout'

const EditUser = ({ user_info: user, permissions, roles }) => {
	return (
		<Layout title="Manage User">
			<div className="card">
				<UserAccount user={user} />
				<UserPermission user={user} roles={roles} permissions={permissions} />
			</div>

		</Layout>
	)
}

export default EditUser
