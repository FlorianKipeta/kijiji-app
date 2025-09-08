import {useForm, usePage} from '@inertiajs/react';
import {PrimaryBtn, SecondaryBtn} from '@components/buttons';
import {DropZone} from '@components/inputs';
import React from 'react';
import {DocumentIcon} from "@heroicons/react/24/solid/index.js";
import {toast} from "react-toastify";
import {XMarkIcon} from "@heroicons/react/24/outline";

export default function FileForm({
                                     submitLabel = "Save",
                                     onSuccess = null,
                                     closeCallback = () => null
                                 }) {

    const { data, setData, reset, post, processing } = useForm({
        file: null,
    });

    const errors = usePage().props.errors;

    function handleSubmit(event) {

        event?.preventDefault();

        post(route('files.store'), {
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
            <div>
                {
                    data.file ?
                        <div className="flex relative space-x-2 mt-3 max-w-md rounded-md bg-sky-100 py-3 px-2">
                            <DocumentIcon className="w-7 h-7 text-gray-500" />
                            <div className="flex flex-col">
                                <span className="font-semibold text-sky-800"> {data.file.name} </span>
                                <span className="text-sm">{Math.round(data.file.size / 1024) + 'kb'}</span>
                            </div>
                            <XMarkIcon onClick={() => setData('file', null)} className="w-7 h-7 p-1 cursor-pointer animate-pulse absolute top-0 right-0 mr-3 text-red-600" />
                        </div>
                        :
                        <DropZone
                            message="(Accepted: .pdf, .doc, .docx, .txt files under 5MB)"
                            maxSize={10 * 1024 * 1024} // 5MB
                            maxFiles={1}
                            accept={{
                                'application/pdf': ['.pdf'],
                                'application/msword': ['.doc'],
                                'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
                                'text/plain': ['.txt']
                            }}
                            onDropAccepted={files => setData('file', files[0])}
                            onDropRejected={() =>
                                toast.warning('Please upload a supported file type (PDF, DOC, DOCX, TXT) under 5MB.')
                            }
                        />


                }
                <span className="text-red-500 text-sm">{errors.file}</span>
            </div>
            <div className="mt-5 flex pt-2 space-x-3 justify-end border-t">
                <SecondaryBtn type="button" labelName="Cancel" onClick={closeCallback}/>
                <PrimaryBtn
                    disabled={processing}
                    type="submit"
                    labelName={processing ? 'Processing...' : submitLabel}
                />
            </div>
        </form >
    )
}
