import React, { useEffect, useMemo, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { ConfirmModal } from '@components/modals';
import { Table } from '@components/table';
import { DangerBadge, PrimaryBadge } from '@components/badges';
import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid';


export const RolesTable = ({ roles }) => {

	const pageProps = usePage().props;

	const columns = useMemo(() => [
		{
			Header: 'Name',
			accessor: 'name',
		},
		{
			Header: 'Permissions',
			accessor: row => row.name === 'Super Admin' ? 'All' : row.permissionsAssigned,
		},
		{
			Header: 'Action',
			accessor: 'id',
			Cell: ({ value, row }) => {
				if (!value) {
					return ''
				}
				return (
					<div className="">
						{
							pageProps.canEditRoles &&
							<Link href={route('roles.edit', value)}>
								<PrimaryBadge>
									<PencilIcon className="w-3 h-3 mr-1" />
									<span className="text-sm">edit </span>
								</PrimaryBadge>
							</Link>
						}
						{
							pageProps.canDeleteRoles &&
							<button onClick={() => setRoleToDelete(row.original)}>
								<DangerBadge>
									<TrashIcon className="w-3 h-3 mx-1 my-1" />
								</DangerBadge>
							</button>
						}
					</div>
				);
			}
		},

	], []);

	const data = useMemo(() => roles, [roles]);

	const [roleToDelete, setRoleToDelete] = useState(null);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	function deleteRole() {
		if (!roleToDelete) {
			return;
		}

		router.delete(route('roles.destroy', roleToDelete.id),
			{
				preserveScroll: true,
				preserveState: true,
				onSuccess: () => {
					setShowDeleteModal(false);
				}
			}
		);
	}

	useEffect(() => {
		if (!roleToDelete) {
			return;
		}
		setShowDeleteModal(true);
	}, [roleToDelete]);

	useEffect(() => {
		if (showDeleteModal) {
			return;
		}
		setRoleToDelete(null);
	}, [showDeleteModal]);


	return (
		<div>
			<Table data={data} columns={columns} />
			<ConfirmModal
				show={showDeleteModal}
				setShow={setShowDeleteModal}
				primaryActionLabel="Cancel"
				Header="Confirmation"
				Body={`Delete ${roleToDelete?.name} Role`}
				primaryActionCallback={() => setShowDeleteModal(false)}
				secondaryActionLabel="Ok"
				secondaryActionCallback={deleteRole}
			/>
		</div>
	)
}
