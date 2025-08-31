import React from 'react'
import ImportedPhoneInput from 'react-phone-number-input'
import { isPossiblePhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

export const PhoneInput = ({ value, onChange, error = false, className = '', onBlur = () => null }) => {
	return (
		<div>
			{/* @ts-ignore */}
			<ImportedPhoneInput
				className={`appearance-none block my-1 pl-2 w-full border ${error ? 'border-red-300' : 'border-gray-300'} placeholder-gray-500 text-gray-700 rounded-md focus:outline-none focus:ring-blue-400 focus:border-blue-400 focus:z-10 ${className}`}
				defaultCountry={'TZ'}
				value={value}
				onBlur={onBlur}
				onChange={onChange} />
			{
				value && !isPossiblePhoneNumber(value) && <span className='error-label'>invalid number</span>
			}
		</div>
	)
}
