import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { PencilIcon, XCircleIcon } from '@heroicons/react/20/solid';
import { EditPermissionForm } from './EditPermissionForm';
import { EditRoleForm } from './EditRoleForm';
import { PrimaryBadge, SecondaryBadge } from '@components/badges';

export const UserPermission = ({ user, permissions, roles }) => {

	const [showEditPermissionForm, setShowEditPermissionForm] = useState(false);

	const [showEditRoleForm, setShowEditRoleForm] = useState(false);

	function toggleEditRoleForm() {
		setShowEditRoleForm(!showEditRoleForm);
	}


	function toggleEditPermissionForm() {
		setShowEditPermissionForm(!showEditPermissionForm);
	}

	return (
		<div className="space-y-6">

			{/* Role sections */}
			<div>
				<div className="md:flex md:space-x-2 md:items-start md:justify-between mt-3 mb-3">
					<div>
						<h2 className="font-semibold text-slate-700 text-xl">Roles</h2>
						<p className="text-slate-500 text-sm">Roles assigned to <span className="text-indigo-500 font-semibold py-2">{user.name} </span></p>
					</div>
					<div className="md:px-2" onClick={toggleEditRoleForm}>
						{
							showEditRoleForm ?
								<SecondaryBadge>
									<XCircleIcon className="hidden md:inline-block w-4 h-4 mr-1" />
									<span className='text-sm'>Cancel edit</span>
								</SecondaryBadge> :
								<PrimaryBadge>
									<PencilIcon className="hidden md:inline-block w-4 h-4 mr-1" />
									<span className='text-sm'>Edit role</span>
								</PrimaryBadge>
						}
					</div>
				</div>
				{
					showEditRoleForm ?
						<EditRoleForm roles={roles} user={user} closeForm={toggleEditRoleForm} />
						:
						user?.roles && user?.roles?.length ?
							<div className="flex flex-wrap">
								{
									user.roles.map(role => <span className="bg-indigo-200 bg-opacity-40 text-indigo-700 mr-3 my-2 px-3 py-1 rounded-xl inline-block" key={`role-${role}`}>{role}</span>)
								}
							</div>
							:
							<div>
								No roles assigned to this user.
							</div>
				}
			</div>

			{/* Permissions section  */}
			<div className="pt-4">
				<div className="md:flex md:space-x-2 md:items-start md:justify-between mb-3">
					<div>
						<h2 className="font-semibold text-slate-700 text-xl">Permissions</h2>
						<p className="text-slate-500 text-sm">Permissions assigned to <span className="text-indigo-500 font-semibold">{user.name}</span></p>
					</div>
					<div className="md:px-2 text-indigo-500 cursor-pointer" onClick={toggleEditPermissionForm}>
						{
							showEditPermissionForm ?
								<SecondaryBadge>
									<XCircleIcon className="hidden md:inline-block w-4 h-4 mr-1" />
									<span className='text-sm'>Cancel editing</span>
								</SecondaryBadge> :
								<PrimaryBadge>
									<PencilIcon className="hidden md:inline-block w-4 h-4 mr-1" />
									<span className='text-sm'>Edit permissions</span>
								</PrimaryBadge>
						}
					</div>
				</div>
				{
					showEditPermissionForm ?
						<EditPermissionForm permissions={permissions} user={user} closeForm={toggleEditPermissionForm} />
						:
						user?.permissions && user.permissions?.length ?
							<div className="flex flex-wrap">
								{
									user.permissions.map(permission => <span className="bg-slate-200 bg-opacity-40 text-indigo-600 mr-3 my-2 px-3 py-1 rounded-xl inline-block" key={`permission-${permission}`}>{permission}</span>)
								}
							</div>
							:
							<div>
								No Permissions assigned to this user
							</div>
				}
			</div>
		</div>
	)
}


UserPermission.propTypes = {
	permissions: PropTypes.arrayOf(PropTypes.object).isRequired,
	roles: PropTypes.arrayOf(PropTypes.object).isRequired,
	user: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		permissions: PropTypes.arrayOf(PropTypes.string),
		roles: PropTypes.arrayOf(PropTypes.string),
	}).isRequired,
}
