import React, { Fragment } from 'react';
import { Combobox as HeadlessCombobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon, XMarkIcon } from '@heroicons/react/24/outline';

export const Combobox = ({ children, value, by = undefined, onChange, nullable = false, multiple = false }) => {

	return (
		// @ts-ignore
		<HeadlessCombobox by={by} value={value} onChange={onChange} nullable={nullable} multiple={multiple}>
			<div className="relative">
				{children}
			</div>
		</HeadlessCombobox>
	)
}

Combobox.Input = ({ placeholder, label = null, value, setQuery, error = false, multiple = false, getItemNameForMultipleValue = val => val, removeValueInMultple = i => i }) => {
	return (
		<div>
			{/* <HeadlessCombobox.Label className={'text-xs text-gray-500'}>Label</HeadlessCombobox.Label> */}
			<div className={`relative my-1 appearance-none block w-full px-2 py-1 border ${error ? ' border-red-300' : ' border-gray-300'} placeholder-gray-500 text-gray-700 rounded-md focus:outline-none focus:ring-indigo-400 focus:border-indigo-400 focus:z-10  bg-white pl-3 pr-10 text-left cursor-default`}>
				{
					multiple ?
						<div className='gap-1 flex flex-col items-start justify-start'>
							{value?.length > 0 && (
								<ul className='flex flex-wrap gap-1'>
									{value.map((val, index) => (
										<li className='bg-sky-200/70 text-sky-800 rounded-lg px-2 text-sm flex gap-1' key={JSON.stringify(val)}>
											{getItemNameForMultipleValue(val)}
											<XMarkIcon className='w-3 hover:text-red-600' onClick={() => removeValueInMultple(index)} />
										</li>
									))}
								</ul>
							)}
							<HeadlessCombobox.Input
								placeholder={placeholder}
								className="w-full border-none focus:ring-0 p-0 text-gray-900"
								onChange={(event) => setQuery(event.target.value)}
							/>
						</div>
						:
						<div className='gap-1 flex items-center'>
							{
								label !== null &&
								<span className='text-sky-800 text-sm md:whitespace-nowrap'> {label} </span>
							}
							<HeadlessCombobox.Input
								placeholder={placeholder}
								className="w-full border-none focus:ring-0 p-0 text-gray-900"
								displayValue={() => value}
								onChange={(event) => setQuery(event.target.value)}
							/>
						</div>
				}
				<HeadlessCombobox.Button className='absolute inset-y-0 right-0 flex items-center px-2'>
					<ChevronUpDownIcon className="w-5 h-5 text-gray-300/90" aria-hidden="true" />
				</HeadlessCombobox.Button>
			</div>
		</div>
	);
}

Combobox.Input.displayName = 'Input';

Combobox.Options = ({ children }) => {

	return (
		<Transition
			as={Fragment}
			leave="transition ease-in duration-100"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
		>
			<div className="absolute z-10 w-full pt-1 pb-2 mt-0.5 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
				<HeadlessCombobox.Options>
					{children}
				</HeadlessCombobox.Options>
			</div>
		</Transition>
	)
}

Combobox.Options.displayName = 'Options';

Combobox.Option = ({ value, name }) => {
	return (
		<HeadlessCombobox.Option
			className={({ active }) =>
				`${active ? 'text-sky-900 bg-sky-100' : 'text-gray-900'} cursor-default select-none relative py-2 pl-10 pr-4`
			}
			value={value}
		>
			{({ selected, active }) => (
				<>
					<span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`} >
						{name}
					</span>
					{selected ? (
						<span className={`${active ? 'text-sky-600' : 'text-sky-600'} absolute inset-y-0 left-0 flex items-center pl-3`} >
							<CheckIcon className="w-5 h-5" aria-hidden="true" />
						</span>
					) : null}
				</>
			)}
		</HeadlessCombobox.Option>
	)
}

Combobox.Option.displayName = 'Option';

Combobox.propTypes = {

}
