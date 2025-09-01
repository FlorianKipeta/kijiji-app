import {PencilSquareIcon, TrashIcon} from '@heroicons/react/24/outline';
import {Link, router} from '@inertiajs/react';
import {DangerBadge, PrimaryBadge} from '@components/badges';
import {ConfirmModal} from '@components/modals';
import React, {useMemo, useState} from 'react'
import {EyeIcon} from "@heroicons/react/24/solid/index.js";
import {ServerSideTable} from "@components/table/ServerSideTable.jsx";
import EditProject from "@pages/Project/EditProject.jsx";

export const ProjectTable = ({
                                  fetchData,
                                  pageCount,
                                  projects,
                                  loading,
                                  refetch,
                                  canEdit,
                                  canDelete
                              }) => {

    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [project, setProject] = useState(null);

    const columns = useMemo(() => [

        {
            Header: 'Project Name',
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
            Header: 'Purpose',
            accessor: 'purpose',
        },
        {
            Header: 'Model',
            accessor: 'model',
        },
        {
            Header: 'Instructions',
            accessor: 'instructions',
            Cell: ({value}) => {
                return (
                    <span className="text-wrap">{value}</span>
                )
            }
        },
        {
            Header: 'Action',
            id: 'project-actions',
            Cell: ({row}) => {
                return (
                    <div>
                        {/*<Link href={route('projects.show', row.original.id)}>*/}
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

    const data = useMemo(() => projects || [], [projects]);

    function showModal(_project, actionType) {
        setProject(_project);
        switch (actionType) {
            case 'edit':
                setShowEditModal(true);
                break;
            case 'delete':
                setShowDeleteModal(true);
                break;
        }
    }

    function handleProjectDelete() {
        if (!project) {
            return;
        }
        router.delete(route('projects.destroy', project?.id), {
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

            <EditProject show={showEditModal} setShow={setShowEditModal} project={project} refreshTable={refetch}/>

            <ConfirmModal
                show={showDeleteModal}
                secondaryActionCallback={() => setShowDeleteModal(false)}
                Header={'Delete ' + project?.name + ' from projects list'}
                Body={'This action will delete this project with all data including messages, notes etc, this is irreversible action.'}
                primaryActionCallback={handleProjectDelete}
            />

        </div>
    )
}
