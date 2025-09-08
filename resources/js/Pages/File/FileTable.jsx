import {PencilSquareIcon, TrashIcon} from '@heroicons/react/24/outline';
import {Link, router} from '@inertiajs/react';
import {DangerBadge, PrimaryBadge} from '@components/badges';
import {ConfirmModal} from '@components/modals';
import React, {useMemo, useState} from 'react'
import {EyeIcon} from "@heroicons/react/24/solid/index.js";
import {ServerSideTable} from "@components/table/ServerSideTable.jsx";

export const FileTable = ({
                              fetchData,
                              pageCount,
                              files,
                              loading,
                              refetch,
                              canDelete
                          }) => {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [file, setFile] = useState(null);

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
            accessor: 'file_id',
        },
        {
            Header: 'Action',
            id: 'file-actions',
            Cell: ({row}) => {
                return (
                    <div>
                        {/*<Link href={route('files.show', row.original.slug)}>*/}
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

    const data = useMemo(() => files || [], [files]);

    function showModal(_file, actionType) {
        setFile(_file);
        switch (actionType) {
            case 'delete':
                setShowDeleteModal(true);
                break;
        }
    }

    function handleFileDelete() {
        if (!file) {
            return;
        }
        router.delete(route('files.destroy', file?.id), {
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
                Header={'Delete ' + file?.name + ' from files list'}
                Body={'This action will delete this file with all data including messages, notes etc, this is irreversible action.'}
                primaryActionCallback={handleFileDelete}
            />

        </div>
    )
}
