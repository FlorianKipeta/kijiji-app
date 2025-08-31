import { ChevronRightIcon } from '@heroicons/react/20/solid';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLayoutContext } from './provider'
import { Link } from '@inertiajs/react';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';

export const QuickAction = () => {

	const { breadCumb, quickAction } = useLayoutContext();

	function showQuickAction() {
		return breadCumb || quickAction;
	}

	if (!showQuickAction()) {
		return null;
	}

	return (
		<div className="w-full flex justify-end md:justify-between space-x-2 mt-1 max-w-screen-2xl mx-auto py-2 px-4 items-center">
			<button className="flex space-x-0.5 px-1 items-center hover:bg-gray-100 hover:rounded-md">
				{/* <ul className="flex items-center overflow-ellipsis">
					{
						Array.isArray(breadCumb) &&
						breadCumb.map((item, index, array) => {
							if (index < array.length - 1) {
								return (
									<li key={`breadcumb-${index}`} className="flex items-center justify-center mr-2">
										<Link href={item.url} className="whitespace-nowrap mr-2 font-bold text-gray-800">
											{item.name}
										</Link>
										<ChevronRightIcon className="w-4 h-4 text-gray-500" />
									</li>
								)
							}

							return (
								<li key={`breadcumb-${index}`} className="flex text-gray-600 items-center justify-center mr-2">
									<span className="whitespace-nowrap mr-2">
										{item.name}
									</span>
								</li>
							)
						})
					}
				</ul> */}
				<ChevronLeftIcon className='w-5' />
				<span className='text-sm pr-0.5'>back</span>
			</button>
			<div>
				{quickAction}
			</div>
		</div>
	)
}

export const useQuickAction = ({ action = null, breadCumb = null }) => {

	const { setQuickAction, setBreadCumb } = useLayoutContext();

	useEffect(() => {
		setQuickAction(action);
		setBreadCumb(breadCumb);
		return () => {
			setQuickAction(null);
			setBreadCumb(null)
		};
	}, []);

}

useQuickAction.propTypes = {
	action: PropTypes.element,
	breadCumb: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string,
		url: PropTypes.string
	}))
}
