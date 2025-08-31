import { PrimaryBadge } from '@components/badges';
import { Table } from '@components/table';
import { BoltIcon } from '@heroicons/react/20/solid';
import { Link } from '@inertiajs/react';
import axios from 'axios'
import React, { useMemo } from 'react'

export const UsersTable = ({ canEdit, users }) => {

	// const { data: users, isLoading, error } = useQuery('users', getUsers)

	const columns = useMemo(() => [
		{
			Header: 'Name',
			accessor: 'name',
			Cell: ({ value, row }) => {
				return <a href="" className="flex items-center space-x-4 focus:outline-none focus:bg-indigo-200 focus:ring-indigo-500 focus:ring-opacity-60 hover:underline hover:text-indigo-500">
					<img src={row.original.profile_photo_url} loading="lazy" alt={'Avatar'} className={`w-10 h-10 rounded-full ring-1 ring-offset-2  ring-sky-400`} />
					<div className="flex flex-col items-start flex-1">
						<span className="font-semibold">{value}</span>
					</div>
				</a>
			}
		},
		{
			Header: 'Roles',
			accessor: row => !row.roles ? '--' : <div className="whitespace-pre-wrap">{row.roles.join(', ')}</div>
		},
		{
			Header: 'Email',
			accessor: 'email',
		},
		{
			Header: 'Actions',
			accessor: 'id',
			Cell: ({ value }) => {
				return canEdit ?
					<Link href={route('users.edit', value)}>
						<PrimaryBadge>
							<BoltIcon className="w-3 h-3 mr-1" />
							<span className="text-sm">manage</span>
						</PrimaryBadge>
					</Link> : null
			}
		}
	], []);

	const data = useMemo(() => users ?? [], [users]);

	return (
		<div>
			<Table data={data} columns={columns}  />
		</div>
	)
}


async function getUsers() {
	let response = await axios.get(route('api.users'));

	return response.data;
}
