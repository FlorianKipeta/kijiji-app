import React from 'react';

export const PrimaryBadge = ({ children }) => {
	return (
		<span className="text-sky-500 shadow-sm inline-flex items-center mx-0.5 border border-sky-100 font-semibold hover:text-sky-700 bg-sky-100 px-1.5 rounded-md hover:border hover:border-sky-300 cursor-pointer">
			{children}
		</span>
	)
}

export const SecondaryBadge = ({ children }) => {
	return (
		<span className="text-indigo-500 shadow-sm inline-flex items-center mx-0.5 border border-indigo-100 font-semibold hover:text-indigo-700 bg-indigo-100 px-1.5 rounded-md hover:border hover:border-indigo-300 cursor-pointer">
			{children}
		</span>
	)
}

export const DangerBadge = ({ children }) => {
	return (
		<span className="text-red-500 shadow-sm inline-flex items-center mx-0.5 border border-red-100 font-semibold hover:text-red-700 bg-red-100 px-1.5 rounded-md hover:border hover:border-red-300 cursor-pointer">
			{children}
		</span>
	)
}
