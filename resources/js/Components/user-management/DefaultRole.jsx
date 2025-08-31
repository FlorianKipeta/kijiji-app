import { PrimaryBtn } from '@components/buttons';
import { SearchableSelect } from '@components/inputs/SearchableSelect';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { useForm } from '@inertiajs/react'
import React, { useEffect } from 'react'
import { useState } from 'react';

export const DefaultRoles = ({ settings, canManageSettings, roles }) => {

	const { setData, post, processing } = useForm({
		name: 'Default user roles',
		value: null,
	});

	const [selectedData, setSelectedData] = useState(null);

	function addData(data) {
		if (!selectedData) {
			setSelectedData([data.name]);
			return;
		}

		if (selectedData.some(item => item == data.name)) {
			return;
		}

		setSelectedData([...selectedData, data.name]);
	}

	function removeData(name) {
		if (!name) {
			return;
		}
		let filteredBenefits = selectedData.filter(item => item != name);

		setSelectedData(filteredBenefits);
	}

	function handleSubmit(event) {
		event.preventDefault();
		post(route('user-settings.store'));
	}


	useEffect(() => {

		let data = settings.filter(item => item.name === 'Default user roles')[0];

		if (!data.value || !data.value?.length) {
			return
		}
		setSelectedData(data.value);
	}, []);


	useEffect(() => {
		if (!selectedData) {
			setData('value', null);
			return;
		}
		setData('value', selectedData);
	}, [selectedData])

	return (
		<div className='max-w-4xl py-3'>
			<h2 className='font-bold text-xl text-slate-700'>Default Roles</h2>
			<div className='text-slate-600 flex flex-col'>
				<form onSubmit={handleSubmit}>
					<label>Roles that will be assigned to user by system when is first created in systems</label>
					<div className="flex max-w-md flex-col mt-2">
						<SearchableSelect
							data={roles}
							value={''}
							onChange={val => addData(JSON.parse(val))}
							placeholder='Select role'
							itemNameAccessor={'name'}
							itemValueAccessor={item => JSON.stringify(item)}
						/>
					</div>
					<div className='mt-3'>
						<h3 className='text-slate-700 font-semibold'>Selected roles</h3>
					</div>
					<div className="flex space-x-2 flex-wrap">
						{
							selectedData?.map(item => (
								<div key={item} className='flex mt-2 justify-between flex-nowrap items-center space-x-3'>
									<span>{item}</span>
									<button onClick={() => removeData(item)} className='text-red-400' type='button'>
										<XMarkIcon className='w-5 h-5' />
									</button>
								</div>
							))
						}
						{
							!selectedData && <div className='text-slate-600 mt-2'>No selected role, select roles above.</div>
						}
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
