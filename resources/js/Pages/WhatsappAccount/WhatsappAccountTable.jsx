import {PencilSquareIcon, TrashIcon} from '@heroicons/react/24/outline';
import {Link, router} from '@inertiajs/react';
import {DangerBadge, PrimaryBadge} from '@components/badges';
import {ConfirmModal} from '@components/modals';
import React, {useMemo, useState} from 'react'
import {EyeIcon} from "@heroicons/react/24/solid/index.js";
import {ServerSideTable} from "@components/table/ServerSideTable.jsx";
import EditWhatsappAccount from "@pages/WhatsappAccount/EditWhatsappAccount.jsx";

export const WhatsappAccountTable = ({
                                  fetchData,
                                  pageCount,
                                  whatsappAccounts,
                                  loading,
                                  refetch,
                                  canEdit,
                                  canDelete
                              }) => {

    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [whatsappAccount, setWhatsappAccount] = useState(null);

    const columns = useMemo(() => [
        {
            Header: 'App ID',
            accessor: 'app_id',
            Cell: ({ value }) => (
                <span className="font-semibold">{value}</span>
            )
        },
        {
            Header: 'Phone Number ID',
            accessor: 'phone_number_id',
        },
        {
            Header: 'Business Account ID',
            accessor: 'business_account_id',
        },
        {
            Header: 'Access Token',
            accessor: 'access_token',
            Cell: ({ value }) => (
                <span className="truncate max-w-[200px] block">{value}</span>
            )
        },
        {
            Header: 'Action',
            id: 'whatsappAccount-actions',
            Cell: ({ row }) => (
                <div className="flex gap-2">
                    {canEdit && (
                        <button onClick={() => showModal(row.original, 'edit')}>
                            <PrimaryBadge>
                                <PencilSquareIcon className="w-4 mr-1.5" />
                            </PrimaryBadge>
                        </button>
                    )}
                    {canDelete && (
                        <button onClick={() => showModal(row.original, 'delete')}>
                            <DangerBadge>
                                <TrashIcon className="w-4" />
                            </DangerBadge>
                        </button>
                    )}
                </div>
            )
        }
    ], []);

    const data = useMemo(() => whatsappAccounts || [], [whatsappAccounts]);

    function showModal(_whatsappAccount, actionType) {
        setWhatsappAccount(_whatsappAccount);
        switch (actionType) {
            case 'edit':
                setShowEditModal(true);
                break;
            case 'delete':
                setShowDeleteModal(true);
                break;
        }
    }

    function handleWhatsappAccountDelete() {
        if (!whatsappAccount) {
            return;
        }
        router.delete(route('whatsappAccounts.destroy', whatsappAccount?.id), {
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

            <EditWhatsappAccount show={showEditModal} setShow={setShowEditModal} whatsappAccount={whatsappAccount} refreshTable={refetch}/>

            <ConfirmModal
                show={showDeleteModal}
                secondaryActionCallback={() => setShowDeleteModal(false)}
                Header={'Delete ' + whatsappAccount?.name + ' from whatsappAccounts list'}
                Body={'This action will delete this whatsappAccount with all data including messages, notes etc, this is irreversible action.'}
                primaryActionCallback={handleWhatsappAccountDelete}
            />

        </div>
    )
}
