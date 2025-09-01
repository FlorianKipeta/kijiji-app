import {router, useForm} from '@inertiajs/react';
import {PrimaryBtn, SecondaryBtn} from '@components/buttons';
import {Input} from '@components/inputs';
import React from 'react';
import TextArea from "@components/inputs/TextArea.jsx";
import {SearchableSelect} from "@components/inputs/SearchableSelect.jsx";

export default function ProjectForm({
                                        project = null,
                                        submitLabel = "Save",
                                        onSuccess = null,
                                        closeCallback = () => null
                                    }) {

    const {data, setData, reset, post, processing, errors} = useForm({
        name: project?.name || '',
        purpose: project?.purpose || '',
        model: project?.model || '',
    });

    function handleSubmit(event) {
        event?.preventDefault();
        project ? update() : create();
    }

    function create() {
        post(route('projects.store'), {
            onSuccess: () => {
                reset();
                if (typeof onSuccess === 'function') onSuccess();
            },
            preserveScroll: true,
            preserveState: true
        });
    }

    function update() {
        if (!project) return;

        router.post(route('projects.update', project.id), {
            ...data, _method: 'PUT'
        }, {
            onSuccess: () => {
                reset();
                if (typeof onSuccess === 'function') onSuccess();
            },
            preserveScroll: true,
            preserveState: true
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 mt-2 gap-4'>

                <div className="flex flex-col">
                    <label htmlFor="name">
                        Project Name
                        <span className='text-red-500 text-xs'>*</span>
                    </label>
                    <Input
                        error={Boolean(errors.name)}
                        onChange={e => setData('name', e.target.value)}
                        required
                        id="name"
                        value={data.name}
                    />
                    <span className="text-red-500 text-sm">{errors.name}</span>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="purpose">Purpose</label>
                    <TextArea
                        id="purpose"
                        name="purpose"
                        value={data.purpose}
                        rows={3}
                        onChange={e => setData('purpose', e.target.value)}
                        required
                    />
                    <span className="text-red-500 text-sm">{errors.purpose}</span>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="model">Model</label>
                    <SearchableSelect
                        data={['GPT-4']}
                        value={data.model}
                        onChange={(val) => setData("model", val)}
                    />
                    <span className="text-red-500 text-sm">{errors.model}</span>
                </div>

                <div className="mt-5 flex pt-2 space-x-3 justify-end border-t">
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
