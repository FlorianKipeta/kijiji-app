import Layout from '@/Layouts/AuthenticatedLayout';
import { PrimaryBtn } from '@components/buttons';
import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import CreateOpenai from '@pages/Openai/CreateOpenai.jsx';
import EditOpenai from "@pages/Openai/EditOpenai.jsx";

export default function Index({ canUpdate }) {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showFullInstructions, setShowFullInstructions] = useState(false);

    const { data: openai, isLoading, refetch } = useQuery(
        'openais',
        getOpenais,
        { keepPreviousData: true }
    );

    return (
        <Layout title="OpenAI Configuration">
            <div className="flex justify-end mb-6">
                {canUpdate && (
                    <PrimaryBtn
                        onClick={() => setShowAddModal(true)}
                        labelName={
                            openai?.id ? `Update (${openai.id})` : 'Create'
                        }
                        className="flex items-center gap-2 px-4 py-2"
                        Icon={() => <PlusCircleIcon className="h-5 w-5" />}
                    />
                )}

            </div>

            <div className="bg-white shadow-lg rounded-xl p-6 space-y-6">
                {isLoading ? (
                    <p className="text-gray-500 text-center">Loading...</p>
                ) : openai && Object.keys(openai).length > 0 ? (
                    <>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4">
                            <h2 className="text-2xl font-bold text-gray-800">
                                {openai?.model || 'No Model'}
                            </h2>
                            <span className="text-sm text-gray-500 mt-2 md:mt-0">
        Vector Store:{' '}
                                <span className="font-medium text-gray-700">
          {openai?.vector_store || 'N/A'}
        </span>
      </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                                <p className="text-gray-600 font-semibold">Temperature</p>
                                <p className="text-gray-800 text-lg font-medium">
                                    {openai?.temperature ?? 'N/A'}
                                </p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg shadow-sm">
                                <p className="text-gray-600 font-semibold">Max Tokens</p>
                                <p className="text-gray-800 text-lg font-medium">
                                    {openai?.max_tokens ?? 'N/A'}
                                </p>
                            </div>
                        </div>

                        <div className="mt-4">
                            <p className="text-gray-600 font-semibold mb-2">Instructions</p>
                            <div className="bg-gray-50 p-4 rounded-lg max-h-64 overflow-y-auto whitespace-pre-wrap shadow-inner">
                                {openai?.instructions
                                    ? showFullInstructions
                                        ? openai.instructions
                                        : `${openai.instructions.substring(0, 300)}${
                                            openai.instructions.length > 300 ? '...' : ''
                                        }`
                                    : 'No instructions provided.'}
                            </div>
                            {openai?.instructions && openai.instructions.length > 300 && (
                                <button
                                    className="mt-2 text-blue-600 text-sm hover:text-blue-800 font-medium underline transition-colors"
                                    onClick={() => setShowFullInstructions(!showFullInstructions)}
                                >
                                    {showFullInstructions ? 'Show Less' : 'Show More'}
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-gray-700 text-sm">
                            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                                <p className="font-medium text-gray-600">Created At</p>
                                <p>
                                    {openai?.created_at
                                        ? new Date(openai.created_at).toLocaleString()
                                        : 'N/A'}
                                </p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                                <p className="font-medium text-gray-600">Updated At</p>
                                <p>
                                    {openai?.updated_at
                                        ? new Date(openai.updated_at).toLocaleString()
                                        : 'N/A'}
                                </p>
                            </div>
                        </div>
                    </>
                ) : (
                    <p className="text-gray-500 text-center py-10">
                        No OpenAI configuration available
                    </p>
                )}

            </div>

            {openai && Object.keys(openai).length > 0 ? (
                <EditOpenai
                    show={showAddModal}
                    setShow={setShowAddModal}
                    refreshOpenais={refetch}
                    openai={openai}
                />
            ) : (
                <CreateOpenai
                    show={showAddModal}
                    setShow={setShowAddModal}
                    refreshOpenais={refetch}
                />
            )}

        </Layout>
    );
}

async function getOpenais() {
    try {
        const response = await axios.get(route('api.openai'));
        return response.data?.data || response.data;
    } catch (error) {
        console.error('Failed to fetch OpenAI config:', error);
        return null;
    }
}
