import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { Input } from '.';

export const Select = ({ children, value, onChange }) => {

	return (
		<Listbox value={value} onChange={onChange}>
			<div className="relative">
				{children}
			</div>
		</Listbox>
	)
}

Select.Button = ({ label, error = false }) => {
	return (
		<Listbox.Button className={`relative my-1 appearance-none block w-full px-2 py-1 border ${error ? ' border-red-300' : ' border-gray-300'} placeholder-gray-500 text-gray-700 rounded-md focus:outline-none focus:ring-blue-400 focus:border-blue-400 focus:z-10  bg-white pl-3 pr-10 text-left cursor-default`}>
			<span className="block truncate">
				{label}
			</span>
			<span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
				<ChevronUpDownIcon className="w-5 h-5 text-gray-300/90" aria-hidden="true" />
			</span>
		</Listbox.Button>
	)
}


Select.Options = ({ children, searchable = false, query = null, setQuery = null }) => {

	function handleSpace(event) {

		if (event.code === 'Enter') {
			event.preventDefault();
		}

		if (event.code === "Space" || event.code === 'Enter') {
			event.stopPropagation();
		}
	}

	return (
		<Transition
			as={Fragment}
			leave="transition ease-in duration-100"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
		>
			<div className="absolute z-10 w-full pt-1 pb-2 mt-0.5 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
				<Listbox.Options>
					{
						searchable &&
						<Listbox.Option disabled value='' onKeyPress={handleSpace} onKeyUp={handleSpace} onKeyDown={handleSpace} className='mx-2 z-20 sticky -mt-1 mb-3 inset-0'>
							<Input onKeyUp={handleSpace} onKeyPress={handleSpace} onKeyDown={handleSpace} value={query || ''} onChange={e => setQuery(e.target.value)} placeholder='search' />
						</Listbox.Option>
					}
					{children}
				</Listbox.Options>
			</div>
		</Transition>
	)
}


Select.Option = ({ value, name }) => {
	return (
		<Listbox.Option
			className={({ active }) =>
				`${active ? 'text-slate-900 bg-slate-100' : 'text-gray-900'} cursor-default select-none relative py-2 pl-10 pr-4`
			}
			value={value}
		>
			{({ selected, active }) => (
				<>
					<span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`} >
						{name}
					</span>
					{selected ? (
						<span className={`${active ? 'text-slate-600' : 'text-slate-600'} absolute inset-y-0 left-0 flex items-center pl-3`} >
							<CheckIcon className="w-5 h-5" aria-hidden="true" />
						</span>
					) : null}
				</>
			)}
		</Listbox.Option>
	)
}

Select.propTypes = {

}
