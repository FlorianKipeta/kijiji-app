import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from "react";

export default function Dashboard({project}) {

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="card col-span-1">
                    <div className="flex justify-between border-b pb-3 mb-3">
                        <h2 className="text-black font-bold text-lg">{project.name}</h2>
                    </div>
                    <span className="text-sm">{project.purpose}</span>
                </div>

                {

                }

                <div className="col-span-2">

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
