import '../css/app.css';
import './bootstrap';

import {createRoot} from 'react-dom/client';
import {createInertiaApp} from '@inertiajs/react';
import {resolvePageComponent} from 'laravel-vite-plugin/inertia-helpers';
import {QueryClient, QueryClientProvider} from 'react-query';
import {LayoutProvider} from './Layouts/Partials/provider';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const appName = import.meta.env.VITE_APP_NAME || 'ENHANCE';


const queryClient = new QueryClient();

const contextClass = {
    success: "bg-sky-200 text-sky-800 border-sky-300",
    error: "bg-red-200 text-red-800 border-red-300",
    info: "bg-gray-200 text-gray-800 border-gray-300",
    warning: "bg-yellow-200 text-yellow-800 border-yellow-400",
    default: "bg-indigo-200 text-indigo-800 border-indigo-400",
    dark: "bg-gray-800 text-gray-200 border-gray-800 ",
};


createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({el, App, props}) {
        const root = createRoot(el);

        root.render(
            <QueryClientProvider client={queryClient}>
                <LayoutProvider>
                    <App {...props} />

                    <ToastContainer
                        toastClassName={({type}) => contextClass[type || "default"] +
                            " bg-opacity-80 border-l-8 relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
                        }
                        bodyClassName={() => "text-sm flex-1 flex items-center p-3"}
                        position="top-right"
                        autoClose={5000}/>
                </LayoutProvider>
            </QueryClientProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
