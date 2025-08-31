import React from 'react';
import PropTypes from 'prop-types';
import { RoleForm } from '@components/user-management/RoleForm';
import Layout from '@/Layouts/AuthenticatedLayout';

const EditRole = ({ permissions, role }) => {
	return (
		<Layout title="Edit Role">
			<div className="card">
				<RoleForm role={role} permissions={permissions} />
			</div>
		</Layout >
	)
}

EditRole.propType = {
	permissions: PropTypes.array,
	role: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		name: PropTypes.string,
		permissions: PropTypes.array
	}),
}

export default EditRole
