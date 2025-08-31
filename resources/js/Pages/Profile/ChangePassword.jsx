import React from 'react'
import Layout from "@/Layouts/AuthenticatedLayout.jsx";
import UpdatePasswordForm from "@/Pages/Profile/Partials/UpdatePasswordForm.jsx";

export default function ChangePassword() {
    return (
        <Layout>
            <UpdatePasswordForm />
        </Layout>
    )
}
