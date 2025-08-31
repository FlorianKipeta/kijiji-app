import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from '@inertiajs/react';
import { CheckBox, Input } from '@components/inputs';
import { PrimaryBtn } from '@components/buttons';
import Accordion from '@components/accordion/Accordion';

export const RoleForm = ({ role = null, permissions =[]}) => {

	const { data, post, put, errors, setData, processing } = useForm({
		name: role?.name ?? '',
		permissions: role?.permissions ?? [],
		role_id: role?.id ?? null
	});

	const [permissionStates, setPermissionsState] = useState({});

	const groupedPermissions = useMemo(() => {

		return permissions.reduce((groupedPermissions, permission) => {
			groupedPermissions[permission.module]?.length ?
				groupedPermissions[permission.module].push(permission)
				:
				groupedPermissions[permission.module] = [permission]

			return groupedPermissions;
		}, {});

	}, []);

	function handleSubmit(event) {
		event.preventDefault();
		if (data.role_id) {
			put(route('roles.update', data.role_id))
			return
		}
		post(route('roles.store'));
	}

	const updatePermissionState = permission => {
		let newPermStates = permissionStates;

		newPermStates[permission.module] = permissionStates[permission.module]
			.map(per => per.name === permission.name ?
				{ ...per, checked: !per.checked } : per
			);

		setPermissionsState(newPermStates)
	}

	function addPermission(permission) {
		setData('permissions', [...data.permissions, permission.name]);
		updatePermissionState(permission);
	}

	function removePermission(permission) {
		setData('permissions', data.permissions.filter(p => p !== permission.name));
		updatePermissionState(permission);
	}



	useEffect(() => {
		if (!groupedPermissions) {
			return;
		}

		let permissionState = {};
		for (const key in groupedPermissions) {
			if (Object.hasOwnProperty.call(groupedPermissions, key)) {
				permissionState[key] = groupedPermissions[key].map(permission => {
					return {
						...permission,
						checked: data.permissions.includes(permission.name)
					}
				});
			}
		}

		setPermissionsState(permissionState);
	}, [groupedPermissions]);

	return (
		<div>
			<form onSubmit={handleSubmit} action="" method="POST">

				<div className="pb-2 max-w-lg">
					<Input
						error={Boolean(errors.name)}
						id="name"
						value={data.name} onChange={e => setData('name', e.target.value)}
						label="Name"
						placeholder="Role name"
						visible_label required />
					<small className="text-red-400 text-sm">
						{errors?.name}
					</small>
				</div>
				<div className="flex flex-col">
					<h2 className="text-xl font-bold text-slate-700 mt-2 mb-3">Role Permissions</h2>
					{
						Object.keys(permissionStates).map((key, index) => {
							return (
								<Accordion key={'module' + key} defaultOpen={index == 0 || index == 1}>
									{({ open }) => (
										<>
											<Accordion.Button open={open}>
												<span className="capitalize">{key} </span>
											</Accordion.Button>
											<Accordion.Panel>
												<div className="grid items-center gap-3 md:grid-cols-3 lg:grid-cols-4 mb-2 border-b">
													{
														permissionStates[key].map(permission => (
															<div key={permission.id} className={`inline-block w-auto mr-4 my-1 px-2 ${permission.checked ? 'bg-slate-200 text-slate-700 rounded-xl' : null}`}>
																<CheckBox
																	isChecked={permission.checked}
																	onChange={e => e.target.checked ? addPermission(permission) : removePermission(permission)}
																	id={`permissions-${permission.id}`}
																	label={permission.name} />
															</div>
														))
													}
												</div>
											</Accordion.Panel>
										</>
									)}
								</Accordion>
							)
						})
					}
				</div>

				<PrimaryBtn labelName={processing ? "Saving data" : "Save"} disabled={processing} />
			</form>
		</div>
	)
}

RoleForm.propTypes = {
	role: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		name: PropTypes.string,
		permissions: PropTypes.array
	}),

	permissions: PropTypes.array.isRequired
}
