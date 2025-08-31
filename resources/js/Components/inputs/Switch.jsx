import React from 'react';
import { Switch as HeadlessSwitch } from '@headlessui/react';

export const Switch = ({ checked, onChange, label }) => {

	return (
		<HeadlessSwitch
			checked={checked}
			onChange={onChange}
			className={`${checked ? 'bg-sky-900' : 'bg-gray-300'} relative inline-flex flex-shrink-0 h-[38px] w-[74px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
		>
			<span className="sr-only">{label}</span>
			<span
				aria-hidden="true"
				className={`${checked ? 'translate-x-9' : 'translate-x-0'} pointer-events-none inline-block h-[34px] w-[34px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
			/>
		</HeadlessSwitch>
	)
}
