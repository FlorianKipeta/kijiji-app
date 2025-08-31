import {router, useForm} from '@inertiajs/react';
import {PrimaryBtn, SecondaryBtn} from '@components/buttons';
import {Input} from '@components/inputs';
import React, {useEffect, useState} from 'react'
import {SearchableSelect} from "@components/inputs/SearchableSelect.jsx";

export const UserForm = ({
                             user = null,
                             roles = null,
                             submitLabel = "Save",
                             canSubmit = false,
                             onSuccess = null,
                             closeCallback = () => null
                         }) => {
    const [role, setRole] = useState(null);

    const {data, setData, reset, post, processing, errors} = useForm({
        name: user?.name || '',
        email: user?.email || '',
        role_id: '',
        image_path: null,
    });

    useEffect(() => setData('role_id', role?.id), [role]);


    function handleSubmit(event) {
        event?.preventDefault();
        user ?
            update()
            :
            create();
    }

    function create() {
        post(route('users.store'), {
            onSuccess: () => {
                reset();
                if (typeof onSuccess === 'function') {
                    onSuccess();
                }
            },
            preserveScroll: true,
            preserveState: true
        });
    }

    function update() {
        if (!user) {
            return;
        }

        router.post(route('users.update', user.id), {
            ...data, _method: 'PUT'
        }, {
            onSuccess: () => {
                reset();
                if (typeof onSuccess === 'function') {
                    onSuccess();
                }
            },
            preserveScroll: true,
            preserveState: true
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 mt-2 md:grid-cols-2 gap-4'>
                <div className="flex flex-col">
                    <label htmlFor="fname">
                        Full Name
                        <span className='text-red-500 text-xs'>*</span>
                    </label>
                    <Input error={Boolean(errors.name)} onChange={e => setData('name', e.target.value)} required
                           id="fname" value={data.name}/>
                    <span className="text-red-500 text-sm">{errors.name}</span>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <Input error={Boolean(errors.email)} onChange={e => setData('email', e.target.value)} id="email"
                           value={data.email}/>
                    <span className="text-red-500 text-sm">{errors.email}</span>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="role">Role</label>
                    <SearchableSelect
                        data={roles}
                        value={role}
                        onChange={val => setRole(val)}
                        placeholder="Select Role"
                        itemNameAccessor={item => `${item.name}`}
                    />
                    <span className="text-red-500 text-sm">{errors.role_id}</span>
                </div>

                <div className="mt-5 col-span-full flex pt-2 space-x-3 justify-end border-t">
                    <SecondaryBtn type="button" labelName="Cancel" onClick={closeCallback}/>
                    <PrimaryBtn
                        disabled={processing || !canSubmit}
                        type="submit"
                        labelName={processing ? 'Processing...' : submitLabel}
                    />
                </div>
            </div>
        </form>
    )
}
