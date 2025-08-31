import React from "react";
import PropTypes from "prop-types";
import { Dialog } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Modal from "./Modal";

export const ConfirmModal = ({
                                 show = false,
                                 setShow = () => {},
                                 Icon = (
                                     <span className="bg-red-100 rounded-full p-2 flex items-center justify-center">
            <ExclamationTriangleIcon className="w-6 h-6 text-red-500" />
        </span>
                                 ),
                                 Header = null,
                                 Body = null,
                                 secondaryActionLabel = "Cancel",
                                 primaryActionLabel = "Ok",
                                 primaryActionCallback = () => {},
                                 secondaryActionCallback = null,
                                 children,
                             }) => {
    return (
        <Modal
            title=""
            isOpen={show}
            closeModal={() => setShow(false)}
            showActionButtons={false}
        >
            <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center sm:mx-0 sm:h-10 sm:w-10">
                        {Icon}
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        {Header && (
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-semibold leading-6 text-gray-900"
                            >
                                {Header}
                            </Dialog.Title>
                        )}
                        <div className="mt-2 text-sm text-gray-600">
                            {Body}
                            {children}
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                    type="button"
                    onClick={primaryActionCallback}
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                >
                    {primaryActionLabel}
                </button>
                <button
                    type="button"
                    onClick={() => {
                        if (typeof secondaryActionCallback === "function") {
                            secondaryActionCallback();
                        } else {
                            setShow(false);
                        }
                    }}
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                    {secondaryActionLabel}
                </button>
            </div>
        </Modal>
    );
};

ConfirmModal.propTypes = {
    show: PropTypes.bool.isRequired,
    setShow: PropTypes.func,
    Icon: PropTypes.element,
    Header: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    Body: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    secondaryActionLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    primaryActionLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    primaryActionCallback: PropTypes.func,
    secondaryActionCallback: PropTypes.func,
    children: PropTypes.node, // ✅ accepts multiple children, not just one
};
