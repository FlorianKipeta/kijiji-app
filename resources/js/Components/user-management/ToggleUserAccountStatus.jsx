import { PrimaryBtn } from '@components/buttons';
import { ConfirmModal } from '@components/modals';
import { router } from '@inertiajs/react'
import React, { useState } from 'react'

export const ToggleUserAccountStatus = ({ user }) => {

	const [showModal, setShowModal] = useState(false);

	function toggleAccountStatus() {
		// @ts-ignore
		router.post(route('users.toggle-account-status', user.id), {}, {
			preserveScroll: true,
			onSuccess: () => {
				setShowModal(false);
			}
		});
	}

	return (
		<>
			<div className="mb-3">
				<h2 className="text-slate-700 text-xl font-semibold">{user.status === 'active' ? 'Suspend Account' : 'Activate Account'}</h2>
				{
					user.status === 'active' ?
						<>
							<p className="text-slate-500 text-sm">Suspend account of <span className="text-indigo-500 font-semibold">{user.first_name} {user.last_name}</span></p>
							<p className="text-slate-500 text-sm">Once account is Suspended, user of account will not be able to login and access system</p>
						</>
						:
						<>
							<span className="text-sm text-red-500 bg-red-100 rounded-full px-2">Suspended Account</span>
							<p className="text-slate-500 text-sm">Activate account of <span className="text-indigo-500 font-semibold">{user.first_name} {user.last_name}</span></p>
							<p className="text-slate-500 text-sm">Once account is Activated, user of account will be able to login and access system</p>
						</>
				}
			</div>
			<div>
				<PrimaryBtn labelName={user.activated ? "Suspend Account" : "Activate Account"} onClick={() => setShowModal(true)} />
			</div>
			<ConfirmModal
				Header={user.activated ? "Suspend User Account" : "Activate User Account"}
				show={showModal}
				setShow={setShowModal}
				primaryActionLabel={user.activated ? "Suspend Account" : "Activate Account"}
				primaryActionCallback={toggleAccountStatus}
				Body=""
			>
				{
					user.activated ?
						<p>
							This user will not be able to login or access account, Click suspend account button below to suspend account.
						</p>
						:
						<p>
							This user will be able to login or access account, Click activate account button below to activate account.
						</p>
				}
			</ConfirmModal>
		</>
	)
}
