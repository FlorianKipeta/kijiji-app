import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from "react";

export default function Dashboard() {

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
                        <h2 className="text-black font-bold text-lg">Summary</h2>
                    </div>

                    <dl className="space-y-2">
                        {summaryData.map((item) => (
                            <div
                                key={item.label}
                                className="flex items-center justify-between bg-gray-50 rounded-lg shadow-sm px-4 py-3 sm:px-6 sm:py-4 hover:bg-gray-100 transition"
                            >
                                <dt className="text-sm font-medium text-gray-500">{item.label}</dt>
                                <dd className="text-lg font-semibold text-gray-900">{item.value}</dd>
                            </div>


                        ))}
                    </dl>
                </div>

                <div className="col-span-2">
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
