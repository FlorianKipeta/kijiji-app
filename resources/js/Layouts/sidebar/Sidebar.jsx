import React, { useMemo } from 'react';
import Menu from './Menu';
import { usePage } from '@inertiajs/react';
import { accessibleRoutes } from './menu-routes';
import { useLayoutContext } from '../Partials/provider';
import { Logo } from '@components/Logo';


/**
 * @typedef InertiaPageProps
 * @type {object}
 * @property {Object.<string, boolean>} menuPermissions - permissions.
 */


const Sidebar = () => {

    /** @type {InertiaPageProps} */
        //@ts-ignore
    const { menuPermissions } = usePage().props;

    const routes = useMemo(() => accessibleRoutes(menuPermissions), [menuPermissions]);

    const { showSidebar, setShowSidebar } = useLayoutContext();

    return (
        <div className="flex print:hidden">
            <div
                onClick={() => setShowSidebar(false)}
                className={`${showSidebar ? 'block' : 'hidden'} fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden`}>

            </div>

            <div className={`${showSidebar ? 'translate-x-0 ease-out w-60 ' : '-translate-x-full ease-in w-0'} fixed z-30 inset-y-0 left-0 transition duration-300 transform bg-gradient-to-br from-sky-800 to-gray-800 via-sky-900 overflow-y-auto lg:static lg:inset-0 scrollbar-hide pb-6`}>
                <div className="flex items-center px-0.5 py-2 shadow border-b border-sky-700">
                    <div className="flex items-center mx-auto">
                        <Logo className="px-2 h-[5rem]" />
                    </div>
                </div>

                <nav className="mt-4 px-2 lg:px-3">
                    <ul>
                        {routes.map((route, index) => {
                            return <Menu key={index} {...route} />
                        })}
                    </ul>
                </nav>
            </div>
        </div>

    )
}

export default Sidebar
