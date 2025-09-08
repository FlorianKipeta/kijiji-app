import {router, useForm} from '@inertiajs/react';
import {PrimaryBtn, SecondaryBtn} from '@components/buttons';
import {Input} from '@components/inputs';
import React from 'react'
import {PhoneInput} from '@components/inputs/PhoneInput';
import {SearchableSelect} from "@components/inputs/SearchableSelect.jsx";
import TextArea from "@components/inputs/TextArea.jsx";

export default function WebsiteForm({
                                         website = null,
                                         submitLabel = "Save",
                                         onSuccess = null,
                                         closeCallback = () => null
                                     }) {

    const {data, setData, reset, post, processing, errors} = useForm({
        name: website?.name || '',
    });


    function handleSubmit(event) {
        event?.preventDefault();
        website ?
            update()
            :
            create();
    }

    function create() {
        post(route('websites.store'), {
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
        if (!website) {
            return;
        }

        router.post(route('websites.update', website.id), {
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
            <div className=''>
                <div className="flex flex-col">
                    <label htmlFor="name">
                        Website URL
                        <span className='text-red-500 text-xs'>*</span>
                    </label>
                    <Input error={Boolean(errors.name)} onChange={e => setData('name', e.target.value)} required
                           id="name" value={data.name}/>
                    <span className="text-red-500 text-sm">{errors.name}</span>
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
