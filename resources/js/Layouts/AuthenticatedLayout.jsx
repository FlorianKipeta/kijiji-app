
import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { Head } from '@inertiajs/react';
import Sidebar from './sidebar/Sidebar';
import Topbar from './Partials/Topbar';
import { QuickAction } from './Partials/QuickAction';
import { SessionMessage } from './Partials/SessionMessage';
import { NotificationProvider } from '@/context/notification';

const Layout = ({ children = null, title = null }) => {

    SessionMessage();

    return (
        <NotificationProvider>
            <div className="flex h-screen bg-opacity-80 text-gray-600">
                {/** @ts-ignore */}
                <Head>
                    <title>{title ? `${title}` : 'Admin Panel'}</title>
                    <meta name="description" content="Admin Pages" />
                </Head>

                <Sidebar />

                <div className="flex-1 flex flex-col overflow-hidden">
                    <Topbar />

                    <main className="flex-1 overflow-x-hidden overflow-y-auto ">
                        <QuickAction />
                        <div className="container relative mx-auto px-6 py-6">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </NotificationProvider>
    )
}

export default Layout

Layout.propTypes = {
    title: PropTypes.string,
    // children: PropTypes.node
}
