import React from 'react';
import { ResetAccountPassword } from './ResetAccountPassword';
import { ToggleUserAccountStatus } from './ToggleUserAccountStatus';

export const UserAccount = ({ user }) => {
	return (
		<div className=" flex flex-col divide-y divide-slate-200 gap-y-4">

			{/* Reset password */}
			<div>
				<ResetAccountPassword user={user} />
			</div>

			{/* Suspend account*/}
			{/* <div className='py-3'>
				<ToggleUserAccountStatus user={user} />
			</div> */}
		</div>

	)
}
