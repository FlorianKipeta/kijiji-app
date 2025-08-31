import React from "react";
import {
    Bars3Icon,
    ChartPieIcon,
    Cog8ToothIcon,
    UserGroupIcon, UsersIcon
} from "@heroicons/react/24/solid";


export const routes = [
    {
        name: 'Dashboard',
        url: route('dashboard'),
        Icon: () => (<ChartPieIcon className="w-5 h-5 text-sky-200"/>),
        permission: 'canViewDashboard',
    },
    // {
    //     name: 'Tenders',
    //     Icon: () => (<Bars3Icon className="w-5 h-5 text-sky-200"/>),
    //     routes: [
    //         {name: 'Tenders', url: route('tenders.index'), permission: 'canViewTenders'},
    //         {name: 'Customers', url: route('customers.index'), permission: 'canViewCustomers'},
    //         {name: 'Notifications', url: route('notifications.settings'), permission: 'canViewNotificationSettings'},
    //     ]
    // },
    // {
    //     name: 'Whatsapp',
    //     Icon: () => (<Bars3Icon className="w-5 h-5 text-sky-200"/>),
    //     routes: [
    //         {name: 'Chats', url: route('chats'), permission: 'canViewGroups'},
    //         {name: 'QR Codes', url: route('qr-codes.index'), permission: 'canViewQrCodes'},
    //         {name: 'Keywords', url: route('keywords.index'), permission: 'canViewKeywords'},
    //         {name: 'Templates', url: route('templates.index'), permission: 'canViewTemplates'},
    //         {name: 'Broadcasting', url: route('groups.index'), permission: 'canViewGroups'},
    //         {name: 'Message Scheduling', url: route('groups.index'), permission: 'canViewGroups'},
    //     ]
    // },
    {
        name: 'Administration',
        Icon: () => (<UserGroupIcon className="w-5 h-5 text-sky-200"/>),
        routes: [
            {name: 'Users accounts', url: route('users.index'), permission: 'canViewUsers'},
            {name: 'Roles', url: route('roles.index'), permission: 'canViewRoles'},
        ]
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
