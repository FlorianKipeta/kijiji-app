import Layout from '@/Layouts/AuthenticatedLayout';
import {FileTable} from '@pages/Project/File/FileTable';
import {PrimaryBtn, SecondaryBtn} from '@components/buttons'
import axios from 'axios';
import React, {useEffect, useState} from 'react'
import {useQuery} from 'react-query';
import {DatePicker} from "@components/inputs/DatePicker.jsx";
import dayjs from "dayjs";
import {useServerSideTable} from "@/hooks/serverside-table.js";
import {PlusCircleIcon} from "@heroicons/react/24/solid/index.js";
import CreateFile from "@pages/Project/File/CreateFile.jsx";

export default function File({canCreate, canDelete, project}) {
    const [showAddModal, setShowAddModal] = useState(false);
    const [pageMeta, setPageMeta] = useState({size: 0, page: 0, q: null}); // for serverside table


    const {data: files, isLoading, refetch} = useQuery(
        ['files',project.slug],
        () => getFiles({pageSize: pageMeta?.size, page: pageMeta?.page, query: pageMeta.q, project:project}),
        {
            enabled: false,
            keepPreviousData: true
        }
    );

    const {fetchData, pageCount} = useServerSideTable({meta: files?.meta, refetch, pageMeta, setPageMeta});

    return (
        <div className="card bg-white shadow-lg rounded-xl p-6 mb-6 border border-gray-200">
            <div className='flex justify-end mb-4'>
                {
                    canCreate &&
                    <PrimaryBtn onClick={() => setShowAddModal(true)}
                            labelName='New' className="mr-4" Icon={() => <PlusCircleIcon className="h-5 mr-2"/>} />
                }
            </div>

            <FileTable
                refetch={refetch}
                fetchData={fetchData}
                files={files?.data || []}
                pageCount={pageCount}
                loading={isLoading}
                canDelete={canDelete}
            />

            <CreateFile show={showAddModal} setShow={setShowAddModal} refreshFiles={refetch} project={project} />
        </div>
    )
}

const getFiles = async ({pageSize, page, query, project}) => {
    let response = await axios.get(route('api.files', {
        project:project.slug,
        paginate: true,
        page: page,
        page_size: pageSize,
        q: query
    }));
    return response.data;
}
