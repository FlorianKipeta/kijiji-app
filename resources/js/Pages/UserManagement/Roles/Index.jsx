import React from 'react';
import { Link } from '@inertiajs/react';
import { PrimaryBtn } from '@components/buttons';
import Layout from '@/Layouts/AuthenticatedLayout';
import {RolesTable} from "@components/user-management/RolesTable.jsx";


function Roles({ roles, canCreateRoles }) {

	return (
		<Layout title="Roles">
			<div className="card">
				<div className="flex justify-end mb-3">
					{
						canCreateRoles &&
						<Link href={route('roles.create')}>
							<PrimaryBtn
								labelName="Add New Role"
							/>
						</Link>
					}
				</div>
				<RolesTable roles={roles} />
			</div>
		</Layout>
	)
}


export default Roles;
