import { router, useForm } from '@inertiajs/react';
import { PrimaryBtn, SecondaryBtn } from '@components/buttons';
import { Input } from '@components/inputs';
import React from 'react';
import TextArea from '@components/inputs/TextArea.jsx';
import {SearchableSelect} from "@components/inputs/SearchableSelect.jsx";

export default function OpenaiForm({
                                       openai = null,
                                       submitLabel = 'Save',
                                       onSuccess = null,
                                       closeCallback = () => null,
                                   }) {
    const { data, setData, reset, post, processing, errors } = useForm({
        model: openai?.model || '',
        instructions: openai?.instructions || '',
        temperature: openai?.temperature || 0,
        max_tokens: openai?.max_tokens || 25,
        key: openai?.key || '',
    });

    function handleSubmit(event) {
        event?.preventDefault();
        openai ? update() : create();
    }

    function create() {
        post(route('openai.store'), {
            onSuccess: () => {
                reset();
                if (typeof onSuccess === 'function') onSuccess();
            },
            preserveScroll: true,
            preserveState: true,
        });
    }

    function update() {
        if (!openai) return;

        router.post(
            route('openai.update', openai.id),
            { ...data, _method: 'PUT' },
            {
                onSuccess: () => {
                    reset();
                    if (typeof onSuccess === 'function') onSuccess();
                },
                preserveScroll: true,
                preserveState: true,
            }
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 mt-2 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <label htmlFor="model">Model</label>
                    <SearchableSelect
                        data={[
                            'gpt-5',
                            'gpt-5-mini',
                            'gpt-5-nano',
                            'gpt-5-chat',
                            'gpt-4',
                            'gpt-4-32k',
                            'gpt-4-turbo',
                            'gpt-4.1',
                            'gpt-4.1-mini',
                            'gpt-4.1-nano',
                            'o1',
                            'o1-mini',
                            'o3',
                            'o3-mini',
                            'o3-pro',
                            'o4-mini',
                        ]}
                        value={data.model}
                        onChange={(val) => setData("model", val)}
                    />
                    <span className="text-red-500 text-sm">{errors.model}</span>
                </div>
                <div className="flex flex-col col-span-2">
                    <label htmlFor="key">API Key</label>
                    <Input
                        // type="number"
                        error={Boolean(errors.key)}
                        onChange={(e) => setData('key', e.target.value)}
                        id="key"
                        value={data.key}
                    />
                    <span className="text-red-500 text-sm">{errors.key}</span>
                </div>

                <div className="flex flex-col col-span-2">
                    <label htmlFor="instructions">Instructions</label>
                    <TextArea
                        id="instructions"
                        name="instructions"
                        value={data.instructions}
                        rows={3}
                        onChange={(e) => setData('instructions', e.target.value)}
                    />
                    <span className="text-red-500 text-sm">{errors.instructions}</span>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="temperature">Temperature</label>
                    <Input
                        // type="number"
                        error={Boolean(errors.temperature)}
                        onChange={(e) => setData('temperature', e.target.value)}
                        id="temperature"
                        value={data.temperature}
                    />
                    <span className="text-red-500 text-sm">{errors.temperature}</span>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="max_tokens">Max Tokens</label>
                    <Input
                        type="number"
                        error={Boolean(errors.max_tokens)}
                        onChange={(e) => setData('max_tokens', e.target.value)}
                        id="max_tokens"
                        value={data.max_tokens}
                    />
                    <span className="text-red-500 text-sm">{errors.max_tokens}</span>
                </div>

                <div className="mt-5 col-span-full flex pt-2 space-x-3 justify-end border-t">
                    <SecondaryBtn type="button" labelName="Cancel" onClick={closeCallback} />
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
