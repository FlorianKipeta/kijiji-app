import Layout from '@/Layouts/AuthenticatedLayout';
import { PrimaryBtn } from '@components/buttons';
import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import CreateOpenai from '@pages/Openai/CreateOpenai.jsx';

export default function Index({ canUpdate }) {
    const [showAddModal, setShowAddModal] = useState(false);

    const { data: openai, isLoading, refetch } = useQuery(
        'openais',
        getOpenais,
        {
            enabled: false, // query won't automatically run
            keepPreviousData: true,
        }
    );

    return (
        <Layout title="OpenAI List">
            <div className="flex justify-end mb-4">
                {canUpdate && (
                    <PrimaryBtn
                        onClick={() => setShowAddModal(true)}
                        labelName={openai ? 'Update' : 'Add Details'}
                        className="mr-4"
                        Icon={() => <PlusCircleIcon className="h-5 mr-2" />}
                    />
                )}
            </div>

            <div className="card">
                {isLoading ? (
                    <p className="text-sm text-gray-500">Loading...</p>
                ) : openai ? (
                    <>
                        <div className="flex justify-between border-b pb-3 mb-3">
                            <h2 className="text-black font-bold text-lg">{openai.name || 'No Name'}</h2>
                        </div>
                        <span className="text-sm">Configuration details go here</span>
                    </>
                ) : (
                    <p className="text-sm text-gray-500">No OpenAI config available</p>
                )}
            </div>

            <CreateOpenai
                show={showAddModal}
                setShow={setShowAddModal}
                refreshOpenais={refetch}
            />
        </Layout>
    );
}

async function getOpenais() {
    try {
        const response = await axios.get(route('api.openais'));
        return response.data;
    } catch (error) {
        console.error('Failed to fetch Openais:', error);
        return null;
    }
}
