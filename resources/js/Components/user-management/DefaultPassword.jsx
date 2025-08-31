import { PrimaryBtn } from '@components/buttons';
import { Input } from '@components/inputs';
import { useForm } from '@inertiajs/react'
import React from 'react'

export const DefaultPassword = ({ settings, canManageSettings }) => {

	const { data, setData, post, processing } = useForm({
		name: 'Default user password',
		value: settings.filter(item => item.name === 'Default user password')[0].value
	});

	function handleSubmit(event) {
		event.preventDefault();
		post(route('user-settings.store'));
	}

	return (
		<div className='max-w-4xl py-3'>
			<h2 className='font-bold text-xl text-slate-700'>Default password</h2>
			<div className='text-slate-600 flex flex-col'>
				<form onSubmit={handleSubmit}>
					<label>Password that will be assigned to user by system when is first created in systems</label>
					<div className="flex max-w-md flex-col mt-2">
						<Input value={data.value} onChange={e => setData('value', e.target.value)} required />
					</div>
					<div className="mt-3 flex pt-2 space-x-3 justify-end">
						<PrimaryBtn
							disabled={processing || !canManageSettings}
							type="submit"
							labelName={processing ? 'Processing...' : 'Save'}
						/>

					</div>
				</form>

			</div>
		</div>
	)
}
