import React, { useState } from 'react';
import { SparklesIcon, XMarkIcon } from '@heroicons/react/24/outline';

export const OpenaiDetailsModal = ({ openai }) => {
    const [isOpen, setIsOpen] = useState(true);

    if (!openai) return null;

    return (
        <div className="flex flex-col items-start">
            {/* Trigger button */}
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700"
            >
                <SparklesIcon className="w-5 h-5" />
                View OpenAI Details
            </button>

            {/* Modal overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
                        {/* Close button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                        >
                            <XMarkIcon className="w-5 h-5" />
                        </button>

                        <h2 className="text-xl font-bold mb-4">OpenAI Configuration</h2>

                        <div className="space-y-3 text-gray-700">
                            <div><strong>Model:</strong> {openai.model}</div>
                            <div><strong>Instructions:</strong> {openai.instructions}</div>
                            <div><strong>Vector Store:</strong> {openai.vector_store}</div>
                            <div><strong>Temperature:</strong> {openai.temperature}</div>
                            <div><strong>Max Tokens:</strong> {openai.max_tokens}</div>
                            <div><strong>Key:</strong> ********</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
