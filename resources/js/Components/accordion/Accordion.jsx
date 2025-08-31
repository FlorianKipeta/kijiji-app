import { Disclosure, Transition } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import React from 'react'

const Accordion = ({ defaultOpen = false, children }) => {
	return (
		<Disclosure defaultOpen={defaultOpen}>
			{children}
		</Disclosure>
	)
}

Accordion.Button = ({ children, open = false }) => {
	return (
		<Disclosure.Button className="flex justify-between w-full px-6 py-2 font-bold text-left text-sky-900 bg-sky-100 rounded hover:bg-sky-200 shadow-sm mb-2 focus:outline-none focus-visible:ring focus-visible:ring-sky-500 focus-visible:ring-opacity-75">
			<div>
				{children}
			</div>
			<ChevronRightIcon
				className={`${open ? 'transform rotate-90' : ''
					} w-5 h-5 text-sky-500`}
			/>
		</Disclosure.Button>
	)
}

Accordion.Panel = ({ children }) => {
	return (
		<Transition
			enter="transition duration-300 ease-linear"
			enterFrom="transform scale-y-50 opacity-10"
			enterTo="transform scale-y-100 opacity-100"
			leave="transition duration-100 ease-linear"
			leaveFrom="transform scale-y-100 opacity-100"
			leaveTo="transform scale-y-50 opacity-0"
		>
			<Disclosure.Panel className="p-2">
				{children}
			</Disclosure.Panel>
		</Transition>
	)
}

export default Accordion
