import Layout from '@/Layouts/AuthenticatedLayout';
import {ProjectTable} from '@pages/Project/ProjectTable';
import {PrimaryBtn, SecondaryBtn} from '@components/buttons'
import Modal from '@components/modals/Modal';
import axios from 'axios';
import React, {useEffect, useState} from 'react'
import {useQuery} from 'react-query';
import {AsyncSelect, Select} from "@components/inputs/index.jsx";
import {DatePicker} from "@components/inputs/DatePicker.jsx";
import dayjs from "dayjs";
import {SearchableSelect} from "@components/inputs/SearchableSelect.jsx";
import {useServerSideTable} from "@/hooks/serverside-table.js";
import {PlusCircleIcon} from "@heroicons/react/24/solid/index.js";
import CreateProject from "@pages/Project/CreateProject.jsx";

export default function Index({canCreate, canEdit, canDelete, canAddProjectToGroups}) {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showStaffAssignmentModal, setShowStaffAssignmentModal] = useState(false);
    const [pageMeta, setPageMeta] = useState({size: 0, page: 0, q: null}); // for serverside table

    const [filters, setFilters] = useState({
        refetch: false
    });

    const {data: projects, isLoading, refetch} = useQuery(
        ['projects', filters],
        () => getProjects({pageSize: pageMeta?.size, page: pageMeta?.page, query: pageMeta.q, ...filters}),
        {
            enabled: false,
            keepPreviousData: true
        }
    );

    const {fetchData, pageCount} = useServerSideTable({meta: projects?.meta, refetch, pageMeta, setPageMeta});

    function applyFilter(filters) {
        setFilters({refetch: true, ...filters});
    }

    useEffect(() => {
        if (filters.refetch) {
            refetch()
        }
    }, [filters])
    return (
        <Layout title='Project List'>
            <div className='flex justify-end mb-4'>
                {
                    canCreate &&
                    <PrimaryBtn onClick={() => setShowAddModal(true)}
                            labelName='New' className="mr-4" Icon={() => <PlusCircleIcon className="h-5 mr-2"/>} />
                }
            </div>

            <Filters onApplyFilter={applyFilter} defaults={filters}/>

            <ProjectTable
                refetch={refetch}
                fetchData={fetchData}
                projects={projects?.data || []}
                pageCount={pageCount}
                loading={isLoading}
                canEdit={canEdit}
                canDelete={canDelete}
            />

            <CreateProject show={showAddModal} setShow={setShowAddModal} refreshProjects={refetch} />
        </Layout>
    )
}

function Filters({onApplyFilter, defaults}) {
    const [startDate, setStartDate] = useState(defaults?.startDate ? dayjs(defaults.startDate).toDate() : null);
    const [endDate, setEndDate] = useState(defaults?.endDate ? dayjs(defaults.endDate).toDate() : null);

    function applyFilter() {
        onApplyFilter({
            startDate: startDate ? dayjs(startDate).format('YYYY-MM-DD') : null,
            endDate: endDate ? dayjs(endDate).format('YYYY-MM-DD') : null
        });
    }

    function resetFilter() {
        setStartDate(null);
        setEndDate(null);
    }

    return (
        <div className='flex flex-wrap card mb-6 items-end border-gray-300 gap-3'>

            <div className="flex flex-col">
                <span className="text-gray-600 text-sm">Registered From</span>
                <DatePicker
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    selected={startDate} onChange={date => setStartDate(date)}
                />
            </div>
            <div className="flex flex-col">
                <span className="text-gray-600 text-sm">Registered To</span>
                <DatePicker
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    selected={endDate} onChange={date => setEndDate(date)}
                />
            </div>
            <div className='flex gap-3 mb-1'>
                <SecondaryBtn onClick={resetFilter} labelName='Reset'/>
                <PrimaryBtn onClick={applyFilter} labelName='Apply'/>
            </div>

        </div>
    )

}

const getProjects = async ({pageSize, page, query, ...filters}) => {
    let response = await axios.get(route('api.projects', {
        paginate: true,
        page: page,
        page_size: pageSize,
        q: query,
        ...filters
    }));
    return response.data;
}
