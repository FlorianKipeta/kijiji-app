import React, { Fragment } from 'react'
import { Menu, Transition } from "@headlessui/react";
import { CogIcon, Bars3CenterLeftIcon } from '@heroicons/react/20/solid';
import { BellIcon, EnvelopeOpenIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, usePage } from '@inertiajs/react';
import { useLayoutContext } from './provider';
import { PageMenu } from './PageMenu';
import { useNotificationContext } from '@/context/notification';
import { Input } from '@components/inputs';

const Topbar = () => {

    /** @type {Object} */
    const user = usePage().props.auth.user;

    const { setShowSidebar, showSidebar } = useLayoutContext();

    const { notifications, markAllAsRead, markAsRead, totalNotifications } = useNotificationContext();

    return (

        <header className="flex justify-between items-center py-3 px-6 bg-sky-50" >
            <div className="flex items-center">
                <button onClick={() => setShowSidebar(!showSidebar)} className="text-gray-500 focus:outline-none" >
                    <Bars3CenterLeftIcon className="h-6 w-6 text-gray-600" />
                </button>

                <PageMenu />

            </div>

            <div className="flex items-center py-1">
                <Menu as="div" className="relative">
                    <Menu.Button className="flex relative mx-4 text-gray-600 focus:outline-none">
                        <span className="sr-only">Open notifications</span>
                        <BellIcon className="h-6 w-6 text-gray-600 mr-4" />
                        {
                            totalNotifications > 0 &&
                            <span className='absolute text-sm px-1 bg-red-500/20 rounded-full text-red-700 -top-2 font-bold right-3'>{totalNotifications}</span>
                        }
                    </Menu.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute lg:w-[30rem] right-0 mt-2 py-4 px-3 w-48 bg-gray-50 rounded-md shadow-xl z-20" >
                            <div className='px-1 flex justify-between md:px-2 border-b'>
                                <h1 className='font-bold text-blue-800 text-xl mb-2'>Notifications</h1>
                                <div>
                                </div>
                            </div>
                            {
                                totalNotifications > 0 ?
                                    <div className='flex flex-col justify-start space-y-4'>
                                        {
                                            notifications?.map(notification => (
                                                <div key={notification.id} className='flex justify-between items-start px-4 md:px-6 py-2 rounded-lg bg-gray-200/30 mt-0.5'>
                                                    <div className='flex-1 relative'>
                                                        <h2 className='font-bold text-gray-700 mb-1'>
                                                            {notification.data.title}
                                                        </h2>
                                                        <p className='text-gray-700'>
                                                            {notification.data.message}
                                                        </p>
                                                        <p className='text-sm text-gray-500 mt-1'>
                                                            {notification.fromNow}
                                                        </p>
                                                        {
                                                            notification.data.url &&
                                                            <Link onClick={() => markAsRead(notification.id)} className='absolute h-full w-full inset-0' as='a' href={notification.data.url}></Link>
                                                        }
                                                    </div>
                                                    <button onClick={() => markAsRead(notification.id)}>
                                                        <XMarkIcon className='w-6 h-6 text-gray-500 ml-2 hover:text-red-500' />
                                                    </button>
                                                </div>
                                            ))
                                        }
                                        <button className='text-gray-600 px-4 md:px-6 hover:text-blue-800 flex justify-center' onClick={markAllAsRead}>
                                            <EnvelopeOpenIcon className='w-5 h-5 mr-1' />
                                            <span>Mark all as read </span>
                                        </button>
                                    </div> :
                                    <div className='flex items-center mt-2 justify-center'>
                                        No new notification
                                    </div>
                            }
                        </Menu.Items>
                    </Transition>

                </Menu>

                <Menu as="div" className="relative">
                    <Menu.Button className="max-w-xs bg-opacity-50 flex items-center text-sm md:pr-3">
                        <span className="sr-only">Open user menu</span>
                        <img className="h-8 w-8 rounded-full md:mr-2" src={'https://placehold.co/400'} alt="" />
                        <span className="text-blue-800 overflow-ellipsis max-w-0 md:max-w-[100px] lg:max-w-[200px] overflow-hidden whitespace-nowrap font-semibold"> {user.name} </span>
                    </Menu.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20" >
                            <Link href={route('profile.edit')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100">
                                Profile
                            </Link>
                            <Link href={route('logout')} method="post" as="button" className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-blue-100">
                                Log  out
                            </Link>
                        </Menu.Items>
                    </Transition>

                </Menu>
            </div>
        </header >
    )
}

export default Topbar
