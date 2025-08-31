import { useCallback, useEffect, useState } from 'react'

export const useServerSideTable = ({ meta, refetch, setPageMeta, pageMeta, enabled = true }) => {

	const [pageCount, setPageCount] = useState(0);
	const fetchData = useCallback(({ pageIndex, pageSize, globalFilter }) => {
		setPageMeta({ size: pageSize, page: pageIndex + 1, q: globalFilter });
	}, []);

	useEffect(() => {
		if (typeof window === 'undefined') {
			return;
		}
		window.addEventListener('focus', focusHandler);

		return () => window.removeEventListener('focus', focusHandler);
	}, []);

	useEffect(() => {
		if (!pageMeta?.size || !pageMeta?.page || !getEnabled()) {
			return
		}
		refetch();
	}, [pageMeta, enabled]);

	useEffect(() => {
		if (!meta) {
			return;
		}
		setPageCount(meta.last_page)
	}, [meta])

	function focusHandler() {
		getEnabled() && refetch();
	}

	function getEnabled() {
		if (typeof enabled === 'function') {
			return enabled();
		}

		return enabled;
	}

	return { fetchData, pageCount }
}
