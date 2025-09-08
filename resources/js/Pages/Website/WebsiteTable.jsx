import {PencilSquareIcon, TrashIcon} from '@heroicons/react/24/outline';
import {Link, router} from '@inertiajs/react';
import {DangerBadge, PrimaryBadge} from '@components/badges';
import {ConfirmModal} from '@components/modals';
import React, {useMemo, useState} from 'react'
import {EyeIcon} from "@heroicons/react/24/solid/index.js";
import {ServerSideTable} from "@components/table/ServerSideTable.jsx";

export const WebsiteTable = ({
                              fetchData,
                              pageCount,
                              websites,
                              loading,
                              refetch,
                              canDelete
                          }) => {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [website, setWebsite] = useState(null);

    const columns = useMemo(() => [
        {
            Header: 'Name',
            accessor: 'name',
        },
        {
            Header: 'Size',
            accessor: 'size',
            Cell: ({value}) => {
                return (value / 1024).toFixed(2) + ' KB';
            }
        },
        {
            Header: 'OpenAI ID',
            accessor: 'website_id',
        },
        {
            Header: 'Action',
            id: 'website-actions',
            Cell: ({row}) => {
                return (
                    <div>
                        {/*<Link href={route('websites.show', row.original.slug)}>*/}
                        {/*    <PrimaryBadge>*/}
                        {/*        <EyeIcon className='w-4 mr-1.5'/>*/}
                        {/*    </PrimaryBadge>*/}
                        {/*</Link>*/}
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

    const data = useMemo(() => websites || [], [websites]);

    function showModal(_website, actionType) {
        setWebsite(_website);
        switch (actionType) {
            case 'delete':
                setShowDeleteModal(true);
                break;
        }
    }

    function handleWebsiteDelete() {
        if (!website) {
            return;
        }
        router.delete(route('websites.destroy', website?.id), {
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


            <ConfirmModal
                show={showDeleteModal}
                secondaryActionCallback={() => setShowDeleteModal(false)}
                Header={'Delete ' + website?.name + ' from websites list'}
                Body={'This action will delete this website with all data including messages, notes etc, this is irreversible action.'}
                primaryActionCallback={handleWebsiteDelete}
            />

        </div>
    )
}
