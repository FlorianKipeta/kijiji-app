import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Tab as HeadlessTab } from '@headlessui/react';


export const Tabs = ({ children, defaultIndex=0 }) => {
    return (
        <HeadlessTab.Group defaultIndex={defaultIndex}>
            {children}
        </HeadlessTab.Group>
    );
}
Tabs.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string, PropTypes.node
    ])
}


export const TabList = ({ children }) => {
    return (
        <HeadlessTab.List className="w-full overflow-auto flex space-x-4 rounded-t-lg items-center justify-start" >
            {children}
        </HeadlessTab.List>
    )
}

TabList.tabsRole = 'TabList';
TabList.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string, PropTypes.node
    ])
}


export const Tab = ({ children }) => {
    return (
        <HeadlessTab className={({ selected }) => `px-4 py-4 cursor-pointer font-bold whitespace-nowrap w-full text-white
            ${selected ?
                'border-b-2 border-white rounded-t-lg bg-opacity-60'
                :
                'text-white'}`
        }>
            {children}
        </HeadlessTab>
    );
}

Tab.tabsRole = 'Tab';
Tab.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string, PropTypes.node
    ])
}

export const TabPanels = ({ children }) => {
    return (
        <HeadlessTab.Panels className="m-3" >
            {children}
        </HeadlessTab.Panels>
    )
}

TabPanels.tabsRole = 'TabPanel';
TabPanels.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string, PropTypes.node
    ])
}


export const TabPanel = ({ children }) => {
    return (
        <HeadlessTab.Panel >
            {children}
        </HeadlessTab.Panel>
    )
}

TabPanel.tabsRole = 'TabPanel';
TabPanel.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string, PropTypes.node
    ])
}
