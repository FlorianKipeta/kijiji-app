import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@inertiajs/react';
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Transition } from '@headlessui/react';

const Menu = ({ name, url = "#", routes = null, Icon = null }) => {

    const [isOpen, setIsOpen] = useState(false);

    const activeClass = "bg-sky-500 bg-opacity-25 text-gray-100 border-gray-100 border-l-2";

    const inactiveClass = "text-gray-200 hover:bg-sky-500 hover:bg-opacity-25 hover:text-gray-100";

    if (Array.isArray(routes) && routes.length) {
        return (
            <li>
                <div onClick={() => setIsOpen(!isOpen)} className={`flex cursor-pointer items-center duration-100 mt-1 py-1.5 px-2 justify-between ${isOpen ? activeClass : inactiveClass}`}>
                    <div className="flex">
                        {Icon ? <Icon /> : null}
                        <span className="mx-3">{name}</span>
                    </div>

                    {
                        isOpen ?
                            <ChevronDownIcon className="h-5 w-5" />
                            :
                            <ChevronRightIcon className="h-5 w-5" />
                    }

                </div>
                {/* <ul className={`ml-4 text-sm space-y-3 transition transform bg-gray-700 bg-opacity-20 rounded ${isOpen ? "py-4 opacity-100 ease-out duration-300 max-h-full" : "ease-in duration-75 opacity-0 max-h-0"}`}> */}

                <Transition
                    as={"ul"}
                    show={isOpen}
                    enter="transition ease-linear duration-200"
                    enterFrom="transform opacity-0 scale-50 rotate-3"
                    enterTo="transform opacity-100 scale-100 rotate-0"
                    leave="transition ease-linear duration-100"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                    className="shadow-inner bg-gray-800 bg-opacity-40 rounded p-1.5 text-sm"
                >
                    {routes.map((route, index) => {
                        return <Menu key={index} {...route} />
                    })}
                </Transition>
            </li>

        );
    }



    return (
        <li>
            <Link href={url} className={`flex items-center duration-150 mt-1.5 py-1.5 px-2 ${isOpen ? activeClass : inactiveClass}`}>
                {Icon ? <Icon /> : null}
                <span className="mx-3">{name}</span>
            </Link>
        </li>
    );
}

Menu.propTypes = {
    name: PropTypes.string,
    url: PropTypes.string,
    routes: PropTypes.array,
}

export default Menu
