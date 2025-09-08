import {router, useForm} from '@inertiajs/react';
import {PrimaryBtn, SecondaryBtn} from '@components/buttons';
import {Input} from '@components/inputs';
import React from 'react'

export default function WhatsappAccountForm({
                                                whatsappAccount = null,
                                                submitLabel = "Save",
                                                onSuccess = null,
                                                closeCallback = () => null
                                            }) {

    const {data, setData, reset, post,put, processing, errors} = useForm({
        app_id: whatsappAccount?.app_id || '',
        phone_number_id: whatsappAccount?.phone_number_id || '',
        business_account_id: whatsappAccount?.business_account_id || '',
        access_token: whatsappAccount?.access_token || '',
    });

    function handleSubmit(event) {
        event?.preventDefault();
        whatsappAccount ? update() : create();
    }

    function create() {
        post(route('whatsapp-accounts.store'), {
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
        if (!whatsappAccount) return;

        put(route('whatsapp-accounts.update', whatsappAccount.id), {
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
            <div className="grid grid-cols-1 mt-2 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <label htmlFor="app_id">
                        App ID <span className="text-red-500 text-xs">*</span>
                    </label>
                    <Input
                        id="app_id"
                        value={data.app_id}
                        onChange={e => setData('app_id', e.target.value)}
                        error={Boolean(errors.app_id)}
                        required
                    />
                    <span className="text-red-500 text-sm">{errors.app_id}</span>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="phone_number_id">
                        Phone Number ID <span className="text-red-500 text-xs">*</span>
                    </label>
                    <Input
                        id="phone_number_id"
                        value={data.phone_number_id}
                        onChange={e => setData('phone_number_id', e.target.value)}
                        error={Boolean(errors.phone_number_id)}
                        required
                    />
                    <span className="text-red-500 text-sm">{errors.phone_number_id}</span>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="business_account_id">
                        Business Account ID <span className="text-red-500 text-xs">*</span>
                    </label>
                    <Input
                        id="business_account_id"
                        value={data.business_account_id}
                        onChange={e => setData('business_account_id', e.target.value)}
                        error={Boolean(errors.business_account_id)}
                        required
                    />
                    <span className="text-red-500 text-sm">{errors.business_account_id}</span>
                </div>

                <div className="flex flex-col col-span-2">
                    <label htmlFor="access_token">
                        Access Token <span className="text-red-500 text-xs">*</span>
                    </label>
                    <Input
                        id="access_token"
                        type="text"
                        value={data.access_token}
                        onChange={e => setData('access_token', e.target.value)}
                        error={Boolean(errors.access_token)}
                        required
                    />
                    <span className="text-red-500 text-sm">{errors.access_token}</span>
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
    );
}
