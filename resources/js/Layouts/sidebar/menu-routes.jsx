import React from "react";
import {
    ChartPieIcon,
    Squares2X2Icon,
    UsersIcon,
    UserGroupIcon,
    ChatBubbleLeftRightIcon,
    ChatBubbleOvalLeftIcon,
    PuzzlePieceIcon,
    SparklesIcon,
    FolderIcon,
    DocumentTextIcon,
    GlobeAltIcon,
    ShieldCheckIcon,
} from '@heroicons/react/24/outline';


export const routes = [
    {
        name: 'Dashboard',
        url: route('dashboard'),
        Icon: () => <ChartPieIcon className="w-5 h-5 text-slate-200" />,
        permission: 'canViewDashboard',
    },
    // {
    //     name: 'Projects',
    //     url: route('projects.index'),
    //     Icon: () => <Squares2X2Icon className="w-5 h-5 text-slate-200" />,
    //     permission: 'canViewProjects',
    // },
    {
        name: 'Contacts',
        Icon: () => <UsersIcon className="w-5 h-5 text-slate-200" />,
        routes: [
            {
                name: 'Customers',
                url: route('dashboard'),
                permission: 'canViewDashboard',
                Icon: () => <UserGroupIcon className="w-5 h-5 text-slate-200" />,
            },
            {
                name: 'Conversations',
                url: route('dashboard'),
                permission: 'canViewDashboard',
                Icon: () => <ChatBubbleLeftRightIcon className="w-5 h-5 text-slate-200" />,
            },
        ],
    },
    {
        name: 'Integrations',
        Icon: () => <PuzzlePieceIcon className="w-5 h-5 text-slate-200" />,
        routes: [
            {
                name: 'WhatsApp',
                url: route('whatsapp-accounts.index'),
                permission: 'canViewWhatsappAccounts',
                Icon: () => <ChatBubbleOvalLeftIcon className="w-5 h-5 text-slate-200" />,
            },
            {
                name: 'OpenAI',
                url: route('openai.index'),
                permission: 'canViewOpenai',
                Icon: () => <SparklesIcon className="w-5 h-5 text-slate-200" />,
            },
        ],
    },
    {
        name: 'Data Sources',
        Icon: () => <FolderIcon className="w-5 h-5 text-slate-200" />,
        routes: [
            {
                name: 'Files',
                url: route('dashboard'),
                permission: 'canViewDashboard',
                Icon: () => <DocumentTextIcon className="w-5 h-5 text-slate-200" />,
            },
            {
                name: 'Documents',
                url: route('dashboard'),
                permission: 'canViewDashboard',
                Icon: () => <DocumentTextIcon className="w-5 h-5 text-slate-200" />,
            },
            {
                name: 'Website',
                url: route('dashboard'),
                permission: 'canViewDashboard',
                Icon: () => <GlobeAltIcon className="w-5 h-5 text-slate-200" />,
            },
            {
                name: 'Knowledge Base',
                url: route('dashboard'),
                permission: 'canViewDashboard',
                Icon: () => <ChatBubbleLeftRightIcon className="w-5 h-5 text-slate-200" />,
            },
        ],
    },
    {
        name: 'Administration',
        Icon: () => <ShieldCheckIcon className="w-5 h-5 text-slate-200" />,
        routes: [
            {
                name: 'User Accounts',
                url: route('users.index'),
                permission: 'canViewUsers',
                Icon: () => <UsersIcon className="w-5 h-5 text-slate-200" />,
            },
            {
                name: 'Roles',
                url: route('roles.index'),
                permission: 'canViewRoles',
                Icon: () => <UserGroupIcon className="w-5 h-5 text-slate-200" />,
            },
        ],
    },
];

/**
 *
 * @param {Object.<string, boolean>} permissions
 * @returns array
 */
export function accessibleRoutes(permissions) {

    /**
     * @param {Object} route -route object
     * @param {string} route.permission
     * @returns
     */
    function isAccessible(route) {

        if (typeof route.permission === 'undefined') {
            return true;
        }

        return Boolean(permissions[route.permission]);
    }

    function reduceRoutes(routes, route) {

        // route has no sub routes
        if (!Array.isArray(route.routes)) {
            //@ts-ignore
            isAccessible(route) && routes.push(route);
            return routes;
        }


        // @ts-ignore
        let accessibleRoutes = route.routes.reduce(reduceRoutes, []);

        if (!accessibleRoutes || !accessibleRoutes.length) {
            return routes;
        }

        route.routes = accessibleRoutes;

        routes.push(route);

        return routes;
    }

    return routes.reduce(reduceRoutes, []);
}
