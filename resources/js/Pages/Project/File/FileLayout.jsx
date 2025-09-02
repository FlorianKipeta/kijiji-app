import { Link } from '@inertiajs/react';
import React, { useMemo } from 'react';

export default function FileLayout({ children, project }) {
    const routes = useMemo(() => [
        {
            url: route('projects.show', project.slug),
            current: route().current('projects.show', project.slug),
            name: 'Files',
            canView: true,
        },
        {
            url: route('dashboard'),
            current: route().current('dashboard'),
            name: 'Web Links',
            canView: true,
        },
        {
            url: route('dashboard'),
            current: route().current('dashboard'),
            name: 'Texts',
            canView: true,
        },
    ], []);

    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex space-x-2 border-b mb-6">
                {routes.map((route, index) =>
                    !route.canView ? null : (
                        <Link key={index} href={route.url}>
                            <div
                                className={`
                                    px-6 py-3 rounded-t-lg cursor-pointer transition
                                    ${route.current
                                    ? 'font-semibold bg-sky-100 text-sky-900 border-b-4 border-sky-900 shadow-sm'
                                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}
                                `}
                            >
                                {route.name}
                            </div>
                        </Link>
                    )
                )}
            </div>
            <div className="p-4 bg-gray-50 rounded-b-lg min-h-[300px]">
                {children}
            </div>
        </div>
    );
}
