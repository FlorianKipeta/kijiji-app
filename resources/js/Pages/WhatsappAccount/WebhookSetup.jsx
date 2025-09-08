import { useState } from "react";
import {CheckIcon, ClipboardIcon} from "@heroicons/react/24/outline";

export default function WebhookSetup() {

    const webhookUrl = "https://uat.kijijiai.com/webhook";
    const webhookPassword = "2cd6f936b05db9d3e8746ce66556214d6d3adcc11bdbed78c81c3e89681ae770";

    const [copied, setCopied] = useState("");

    const handleCopy = async (text, label) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(label);
            setTimeout(() => setCopied(""), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            <div className="col-span-1 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between border-b pb-4 mb-4">
                    <h2 className="text-2xl font-extrabold text-gray-800">Webhook Setup</h2>
                    <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white">
                        🔗
                    </div>
                </div>

                <p className="text-gray-600 text-sm mb-6">
                    Use the following webhook credentials to integrate with your Facebook app.
                </p>

                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Webhook URL</label>
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            readOnly
                            value={webhookUrl}
                            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-50"
                        />
                        <button
                            onClick={() => handleCopy(webhookUrl, "URL")}
                            className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        >
                            {copied === "URL" ? <CheckIcon className="w-4 h-4" /> : <ClipboardIcon className="w-4 h-4" />}
                            {copied === "URL" ? "Copied!" : "Copy"}
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Webhook Password</label>
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            readOnly
                            value={webhookPassword}
                            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-50"
                        />
                        <button
                            onClick={() => handleCopy(webhookPassword, "Password")}
                            className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        >
                            {copied === "Password" ? <CheckIcon className="w-4 h-4" /> : <ClipboardIcon className="w-4 h-4" />}
                            {copied === "Password" ? "Copied!" : "Copy"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
