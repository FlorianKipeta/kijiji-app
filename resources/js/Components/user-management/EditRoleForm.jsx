import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useForm } from '@inertiajs/react'
import { CheckBox } from '@components/inputs';
import { PrimaryBtn, SecondaryBtn } from '@components/buttons';

export const EditRoleForm = ({ user, roles, closeForm = null}) => {

	const { data, setData, put, processing } = useForm({
		user_id: user?.id,
		roles: user.roles
	});

	const rolesState = useMemo(() => roles.map(role => ({
		...role, checked: data.roles.includes(role.name)
	})), [data.roles]);

	function handleSubmit(event) {
		event.preventDefault();

		put(route('users-roles.update', data.user_id), {
			preserveScroll: true,
			preserveState: true,
			onSuccess: () => {
				if (typeof closeForm === 'function') {
					closeForm();
				}
			}
		})
		return
	}

	function addRole(role) {
		setData('roles', [...data.roles, role.name]);
	}

	function removeRole(role) {
		setData('roles', data.roles.filter(r => r !== role.name));
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className="shadow-inner px-2 pt-3 mb-2 border rounded">
				<p className="text-slate-500">
					Select roles below and click save to assign roles to user.
				</p>
				<div className="flex flex-wrap items-start justify-start">
					{
						rolesState.map(role => {
							return (
								<div key={`role-${role.id}`} className={`inline-block mr-4 my-3 px-2 ${role.checked ? 'bg-slate-100 rounded-xl' : null}`}>
									<CheckBox
										isChecked={role.checked}
										onChange={e => e.target.checked ? addRole(role) : removeRole(role)}
										id={`role-${role.id}`}
										label={role.name} />
								</div>
							)
						})
					}
				</div>
			</div>
			<div className="flex space-x-2">
				<PrimaryBtn labelName={processing ? 'Saving' : 'Save'} disabled={processing} />
				{
					closeForm &&
					<SecondaryBtn labelName="Cancel" onClick={closeForm} disabled={processing} />
				}
			</div>
		</form>
	)
}

EditRoleForm.propTypes = {
	roles: PropTypes.arrayOf(PropTypes.object).isRequired,
	user: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		roles: PropTypes.arrayOf(PropTypes.string),
	}).isRequired,
	closeForm: PropTypes.func
}
