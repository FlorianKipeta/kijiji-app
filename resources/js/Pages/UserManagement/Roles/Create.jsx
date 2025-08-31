import React from 'react';
import PropTypes from 'prop-types';
import Layout from '@/Layouts/AuthenticatedLayout';
import { RoleForm } from '@components/user-management/RoleForm';

const CreateRole = ({ permissions }) => {
	return (
		<Layout title="Create Role">
			<div className="card">
				<RoleForm permissions={permissions} />
			</div>
		</Layout>
	)
}

CreateRole.propType = {
	permissions: PropTypes.array
}

export default CreateRole


