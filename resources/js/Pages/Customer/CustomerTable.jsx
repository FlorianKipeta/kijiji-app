import {PencilSquareIcon, TrashIcon} from '@heroicons/react/24/outline';
import {Link, router} from '@inertiajs/react';
import {DangerBadge, PrimaryBadge} from '@components/badges';
import {ConfirmModal} from '@components/modals';
import React, {useMemo, useState} from 'react'
import {EyeIcon} from "@heroicons/react/24/solid/index.js";
import {ServerSideTable} from "@components/table/ServerSideTable.jsx";
import EditCustomer from "@pages/Customer/EditCustomer.jsx";

export const CustomerTable = ({
                                  fetchData,
                                  pageCount,
                                  customers,
                                  loading,
                                  refetch,
                                  canEdit,
                                  canDelete
                              }) => {

    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [customer, setCustomer] = useState(null);

    const columns = useMemo(() => [

        {
            Header: 'Client Name',
            accessor: 'name',
            Cell: ({value, row}) => {
                return (
                    <div className="flex items-center gap-x-3">
                        <img src={row.original.image_path} loading="lazy" alt={''}
                             className={`w-8 aspect-square bg-slate-500 rounded-full`}/>
                        <div className="flex flex-col items-start flex-1">
                            <span className="font-semibold">{value}</span>
                        </div>
                    </div>
                )
            }
        },
        {
            Header: 'Email',
            accessor: 'email',
        },
        {
            Header: 'Phone',
            accessor: 'phone',
        },
        {
            Header: 'Address',
            accessor: 'address',
        },
        {
            Header: 'Action',
            id: 'customer-actions',
            Cell: ({row}) => {
                return (
                    <div>
                        {/*<Link href={route('customers.show', row.original.id)}>*/}
                        {/*    <PrimaryBadge>*/}
                        {/*        <EyeIcon className='w-4 mr-1.5'/>*/}
                        {/*    </PrimaryBadge>*/}
                        {/*</Link>*/}
                        {
                            canEdit &&
                            <button onClick={() => showModal(row.original, 'edit')}>
                                <PrimaryBadge>
                                    <PencilSquareIcon className='w-4 mr-1.5'/>
                                </PrimaryBadge>
                            </button>
                        }
                        {
                            canDelete &&
                            <button onClick={() => showModal(row.original, 'delete')}>
                                <DangerBadge>
                                    <TrashIcon className='w-4'/>
                                </DangerBadge>
                            </button>
                        }
                    </div>
                )
            }
        }
    ], []);

    const data = useMemo(() => customers || [], [customers]);

    function showModal(_customer, actionType) {
        setCustomer(_customer);
        switch (actionType) {
            case 'edit':
                setShowEditModal(true);
                break;
            case 'delete':
                setShowDeleteModal(true);
                break;
        }
    }

    function handleCustomerDelete() {
        if (!customer) {
            return;
        }
        router.delete(route('customers.destroy', customer?.id), {
            onSuccess: () => {
                setShowDeleteModal(true);
                refetch();
            }
        });
    }


    return (
        <div>

            <ServerSideTable fetchData={fetchData} totalPages={pageCount} data={data} columns={columns}
                             loading={loading}/>

            <EditCustomer show={showEditModal} setShow={setShowEditModal} customer={customer} refreshTable={refetch}/>

            <ConfirmModal
                show={showDeleteModal}
                secondaryActionCallback={() => setShowDeleteModal(false)}
                Header={'Delete ' + customer?.name + ' from customers list'}
                Body={'This action will delete this customer with all data including messages, notes etc, this is irreversible action.'}
                primaryActionCallback={handleCustomerDelete}
            />

        </div>
    )
}
