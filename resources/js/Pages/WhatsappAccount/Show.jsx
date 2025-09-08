import Layout from '@/Layouts/AuthenticatedLayout';
import React, {useState} from 'react'
import StarRating from "@components/StarRatings.jsx";
import EditWhatsappAccount from "@pages/WhatsappAccount/EditWhatsappAccount.jsx";
import {PrimaryBadge} from "@components/badges/index.jsx";

export default function Show({whatsappAccount, canAssign}) {

    const [showEditModal, setShowEditModal] = useState(false);


    return (
        <Layout title={whatsappAccount?.name}>
            <div className="grid grid-cols-2 gap-4 h-full">
                <div className="">
                    <div style={{height: 'calc(100vh - 130px)'}}>
                        <div className="card mb-4">
                            <div className="flex border-b pb-4">
                                <h2 className="text-black font-bold flex-1">{whatsappAccount?.name} - Profile</h2>
                                <button onClick={() => setShowEditModal(true)}>
                                    <PrimaryBadge>Edit</PrimaryBadge>
                                </button>
                            </div>
                            <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                                <dt className="text-sm font-medium text-gray-500">Name</dt>
                                <dd className="mt-1 text-sm text-gray-800 sm:mt-0 sm:col-span-2">{whatsappAccount?.name}</dd>
                            </div>
                            <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                                <dd className="mt-1 text-sm text-gray-800 sm:mt-0 sm:col-span-2">{whatsappAccount?.phone}</dd>
                            </div>
                        </div>



                        {
                            showEditModal &&
                            <EditWhatsappAccount show={showEditModal} setShow={setShowEditModal} whatsappAccount={whatsappAccount} refreshTable={() => setShowEditModal(false)}/>
                        }
                    </div>

                </div>
                <div>

                </div>

            </div>

        </Layout>
    )
}
