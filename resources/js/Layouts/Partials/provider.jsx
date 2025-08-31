import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const LAYOUT_STORE_KEY = 'LAYOUT_STATE_STORE';

const storeLayaoutStatus = (value) => {
	localStorage.setItem(LAYOUT_STORE_KEY, JSON.stringify(value))
}

const getLayoutStatus = () => JSON.parse(localStorage.getItem(LAYOUT_STORE_KEY))

const LayoutContext = createContext(null);

export const LayoutProvider = ({ children }) => {

	const initialSidebarStatus = useMemo(() => {
		if (typeof window === 'undefined') {
			return false;
		}

		if (window.innerWidth <= 1023) {
			return false;
		}
		return getLayoutStatus()?.showSidebar ?? true;
	}, [])

	const [showSidebar, setShowSidebar] = useState(initialSidebarStatus);

	const [pageLinks, setPageLinks] = useState([]);

	const [breadCumb, setBreadCumb] = useState(null);

	const [quickAction, setQuickAction] = useState(null);

	function updatePageLinks(links = []) {
		if (!Array.isArray(links)) {
			throw `Links must be array but ${typeof links} is given`;
		}
		setPageLinks(links)
	}

	useEffect(() => {
		storeLayaoutStatus({ showSidebar });
	}, [showSidebar]);

	return (
		<LayoutContext.Provider value={{ showSidebar, setShowSidebar, pageLinks, updatePageLinks, breadCumb, quickAction, setQuickAction, setBreadCumb }}>
			{children}
		</LayoutContext.Provider>
	)
}


export const useLayoutContext = () => useContext(LayoutContext);