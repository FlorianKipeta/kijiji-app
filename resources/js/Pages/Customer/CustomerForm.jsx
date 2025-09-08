import {router, useForm} from '@inertiajs/react';
import {PrimaryBtn, SecondaryBtn} from '@components/buttons';
import {Input} from '@components/inputs';
import React from 'react'
import {PhoneInput} from '@components/inputs/PhoneInput';

export default function CustomerForm({
                                         customer = null,
                                         submitLabel = "Save",
                                         onSuccess = null,
                                         closeCallback = () => null
                                     }) {

    const {data, setData, reset, post, processing, errors} = useForm({
        name: customer?.name || '',
        phone: customer?.phone || '',
        email: customer?.email || '',
    });


    function handleSubmit(event) {
        event?.preventDefault();
        customer ?
            update()
            :
            create();
    }

    function create() {
        post(route('customers.store'), {
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
        if (!customer) {
            return;
        }

        router.post(route('customers.update', customer.id), {
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
                    <label htmlFor="name">
                        Client Name
                        <span className='text-red-500 text-xs'>*</span>
                    </label>
                    <Input error={Boolean(errors.name)} onChange={e => setData('name', e.target.value)} required
                           id="name" value={data.name}/>
                    <span className="text-red-500 text-sm">{errors.name}</span>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="phone">Phone number</label>
                    <PhoneInput error={Boolean(errors.phone)} onChange={val => setData('phone', val)}
                                value={data.phone}/>
                    <span className="text-red-500 text-sm">{errors.phone}</span>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <Input error={Boolean(errors.email)} onChange={e => setData('email', e.target.value)}
                           id="email" value={data.email}/>

                    <span className="text-red-500 text-sm">{errors.email}</span>
                </div>

                <div className="mt-5 col-span-full flex pt-2 space-x-3 justify-end border-t">
                    <SecondaryBtn type="button" labelName="Cancel" onClick={closeCallback}/>
                    <PrimaryBtn
                        disabled={processing}
                        type="submit"
                        labelName={processing ? 'Processing...' : submitLabel}
                    />
                </div>
            </div>
        </form>
    )
}
