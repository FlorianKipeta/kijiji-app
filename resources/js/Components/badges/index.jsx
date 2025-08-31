import React from 'react';

export const PrimaryBadge = ({ children }) => {
	return (
		<span className="text-slate-500 shadow-sm inline-flex items-center mx-0.5 border border-slate-100 font-semibold hover:text-slate-700 bg-slate-100 px-1.5 rounded-md hover:border hover:border-slate-300 cursor-pointer">
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
