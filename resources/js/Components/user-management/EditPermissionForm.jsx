import React, { useMemo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from '@inertiajs/react';
import { CheckBox } from '@components/inputs';
import { PrimaryBtn, SecondaryBtn } from '@components/buttons';
import Accordion from '@components/accordion/Accordion';

export const EditPermissionForm = ({ permissions, user, closeForm = null}) => {

	const { data, setData, put, processing } = useForm({
		user_id: user?.id,
		permissions: user.permissions
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

		// @ts-ignore
		put(route('users-permissions.update', data.user_id), {
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
		<form onSubmit={handleSubmit}>
			<div className="shadow-inner px-2 pt-3 mb-2 border rounded">
				<p className="text-slate-500">
					Select permissions below and click save to assign permissions to user.
				</p>
				<div className="flex flex-wrap items-start justify-start">
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

EditPermissionForm.propTypes = {
	permissions: PropTypes.arrayOf(PropTypes.object).isRequired,
	user: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		permissions: PropTypes.arrayOf(PropTypes.string),
	}).isRequired,
	closeForm: PropTypes.func
}
