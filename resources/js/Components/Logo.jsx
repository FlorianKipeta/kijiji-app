// @ts-ignore
import logo from '@/assets/logo_black.png';
// @ts-ignore
import React from 'react'

export const Logo = ({ className = '', useBlue = false }) => {
	return (
		<div className="flex justify-start my-1 items-center">
            <img src={useBlue ? logo_blue : logo} className={"h-14 " + className} />
		</div>
	)
}
