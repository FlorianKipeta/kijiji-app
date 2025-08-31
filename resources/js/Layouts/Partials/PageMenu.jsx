import {Link, usePage} from '@inertiajs/react';
import React, {useMemo} from 'react'
import { useLayoutContext } from './provider'
import {accessibleRoutes} from "@/Layouts/sidebar/menu-routes.jsx";
import Menu from "@/Layouts/sidebar/Menu.jsx";

export const PageMenu = () => {

	const { pageLinks: links } = useLayoutContext();
    const { menuPermissions } = usePage().props;
    const routes = useMemo(() => accessibleRoutes(menuPermissions), [menuPermissions]);

	return (
		<nav className="flex space-x-3 mx-3 font-semibold">
			{links.map((link, index) => (
				<Link href={link.url} key={`page-link-${index}`} className={`px-2 py-1 cursor-pointer text-gray-700 rounded-lg ${link.active ? 'bg-gray-200 bg-opacity-60' : ''}`}>{link.name}</Link>
			))}

            {/*<Link href={route('dashboard')} className={`px-2 py-1 cursor-pointer text-slate-700 rounded-lg ${route('dashboard') === window.location.href ? 'bg-slate-200 bg-opacity-60' : ''}`}>Dashboard</Link>*/}
            {/*<Link href={route('chat')} className={`px-2 py-1 cursor-pointer text-slate-700 rounded-lg ${route('chat') === window.location.href ? 'bg-slate-200 bg-opacity-60' : ''}`}>Conversations</Link>*/}
            {/*<Link*/}
            {/*    href={route('groups.index')}*/}
            {/*    className={`px-2 py-1 cursor-pointer text-slate-700 rounded-lg ${['groups.index', 'groups.show'].includes(route().current()) ? 'bg-slate-200 bg-opacity-60' : ''}`}>*/}
            {/*    Groups*/}
            {/*</Link>*/}

		</nav>
	)
}
