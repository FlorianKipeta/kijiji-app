import Layout from '@/Layouts/AuthenticatedLayout';
import React, {useState} from 'react'
import StarRating from "@components/StarRatings.jsx";
import EditProject from "@pages/Project/EditProject.jsx";
import {PrimaryBadge} from "@components/badges/index.jsx";

export default function Show({project, canAssign}) {

    const [showEditModal, setShowEditModal] = useState(false);


    return (
        <Layout title={project?.name}>
            <div className="grid grid-cols-2 gap-4 h-full">
                <div className="">
                    <div style={{height: 'calc(100vh - 130px)'}}>
                        <div className="card bg-white shadow-lg rounded-xl p-6 mb-6 border border-gray-200">
                            <div className="flex items-center justify-between border-b pb-4 mb-4">
                                <h2 className="text-lg font-bold text-gray-900">{project?.name}</h2>
                                <button
                                    onClick={() => setShowEditModal(true)}
                                    className="px-3 py-1.5 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                >
                                    Edit
                                </button>
                            </div>

                            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Name</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{project?.name}</dd>
                                </div>

                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Model</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{project?.model}</dd>
                                </div>

                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Creator</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{project?.creator?.name}</dd>
                                </div>

                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Vector Store</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{project?.vector_store}</dd>
                                </div>


                                <div className="col-span-2">
                                    <dt className="text-sm font-medium text-gray-500">Purpose</dt>
                                    <dd className="mt-1 text-sm text-gray-900 border-l-4 pl-2 border-slate-900">{project?.purpose}</dd>
                                </div>
                            </dl>
                        </div>

                        {
                            showEditModal &&
                            <EditProject show={showEditModal} setShow={setShowEditModal} project={project} refreshTable={() => setShowEditModal(false)}/>
                        }
                    </div>

                </div>
                <div>

                </div>

            </div>

        </Layout>
    )
}
