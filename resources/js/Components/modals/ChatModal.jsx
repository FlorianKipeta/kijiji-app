import React from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

export default function ChatModal({
                                  isOpen,
                                  closeModal,
                                  children,
                                  title = 'Modal Title',
                                  primaryBtnLabel = 'Ok',
                                  secondaryBtnLabel = 'Close',
                                  primaryBtnCallback = null,
                                  secondaryBtnCallback = null,
                                  showPrimaryBtn = true,
                                  size = "sm",
                                  showActionButtons = true,
                                  shouldCloseOnInternalEvents = true
                              }) {

    function secondaryBtnAction() {
        if (typeof secondaryBtnCallback !== 'function') {
            closeModal();
            return;
        }

        secondaryBtnCallback();
    }

    function primaryBtnAction() {
        if (typeof primaryBtnCallback !== 'function') {
            return;
        }

        primaryBtnCallback();

        // closeModal();
    }

    function sizeClass() {

        if (size === 'md') {
            return 'max-w-2xl';
        }

        if (size === 'lg') {
            return 'max-w-4xl';
        }

        if (size === 'xl') {
            return 'max-w-6xl';
        }

        return 'max-w-xl';
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    // className="fixed inset-0 z-40 overflow-y-auto"
                    className="fixed inset-x-0 bottom-0 z-40 overflow-y-auto"
                    onClose={shouldCloseOnInternalEvents ? closeModal : () => null}
                >
                    <div className="min-h-screen text-right">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed bg-gray-800 bg-opacity-40 inset-0" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-bottom"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div
                                className={'inline-block w-full p-6 my-0 text-left transition-all transform bg-gray-100 shadow-xl ' + sizeClass()}>
                                {
                                    Boolean(title) &&
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg border-b pb-2 border-gray-300 mb-3 font-bold leading-6 text-gray-600"
                                    >
                                        {title}
                                    </Dialog.Title>
                                }
                                <div className="mt-2">
                                    {children}
                                </div>

                                {
                                    showActionButtons &&
                                    <div className="mt-2 flex border-t border-gray-300 pt-3 space-x-3 justify-end">
                                        <button
                                            type="button"
                                            onClick={secondaryBtnAction}
                                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        >
                                            {secondaryBtnLabel}
                                        </button>
                                        {
                                            showPrimaryBtn && <button
                                                type="button"
                                                onClick={primaryBtnAction}
                                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-200 bg-blue-600 border border-transparent rounded-md hover:bg-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                            >
                                                {primaryBtnLabel}
                                            </button>
                                        }
                                    </div>
                                }
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
