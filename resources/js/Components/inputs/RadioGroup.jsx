import { RadioGroup as Group } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import React from 'react'

export const RadioGroup = ({ value, onChange = () => null, children }) => {
	return (
		<Group value={value} onChange={onChange}>
			{children}
		</Group>
	)
}

RadioGroup.Option = ({ value, label }) => {
	return (
		<Group.Option value={value}>
			{({ checked }) => (
				<div className={`flex items-center shadow-sm mr-3 px-2 py-1 rounded-lg cursor-pointer border-t border-sky-200 text-gray-600 ${checked ? 'bg-sky-200' : 'bg-gray-50'}`}>
					<CheckCircleIcon className={`w-5 h-5 mr-2 ${checked ? 'text-sky-600' : 'text-gray-200'}`} />
					<span className={`${checked ? 'text-sky-800' : 'text-gray-600'}`}>{label}</span>
				</div>
			)}
		</Group.Option>
	)
}
