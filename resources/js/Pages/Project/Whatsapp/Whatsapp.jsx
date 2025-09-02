import {PrimaryBtn} from '@components/buttons';
import React, {useEffect} from 'react';
import {ChatBubbleBottomCenterIcon} from "@heroicons/react/16/solid/index.js";
import {useForm, usePage} from "@inertiajs/react";

export default function Whatsapp({canCreate, project}) {

    const {data, setData, reset, post, processing} = useForm({
        values: null,
        code: ''
    });

    const errors = usePage().props.errors;

    function handleSubmit(event) {

        event?.preventDefault();

        post(route('projects.whatsapp.store', project.slug), {
            onSuccess: () => {
                reset();
            },
            preserveScroll: true,
            preserveState: true
        });
    }

    // Load FB SDK once
    useEffect(() => {
        if (!window.FB) {
            const script = document.createElement("script");
            script.id = "facebook-jssdk";
            script.src = "https://connect.facebook.net/en_US/sdk.js";
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);

            window.fbAsyncInit = function () {
                FB.init({
                    appId: '9300050306677103',
                    autoLogAppEvents: true,
                    xfbml: true,
                    version: 'v23.0',
                });
                console.log("✅ Facebook SDK Initialized");
            };
        }
    }, []);

    const fbLoginCallback = (response) => {
        if (response.authResponse) {
            const code = response.authResponse.code;
            setData("code", response);
            // Send this code to your backend to exchange for access token
        }
        console.log("FB Login Response:", response);
    };

    const launchWhatsAppSignup = () => {
        if (window.FB) {
            FB.login(fbLoginCallback, {
                config_id: '1089125803333184', // WhatsApp Embedded Signup config
                response_type: 'code',
                override_default_response_type: true,
                extras: {version: "v3"},
            });
        } else {
            console.warn("FB SDK not loaded yet");
        }
    };

    // Optional: handle messages from WhatsApp Embedded Signup
    useEffect(() => {
        const handleMessage = (event) => {
            if (event.origin !== "https://www.facebook.com" && event.origin !== "https://web.facebook.com") {
                return;
            }
            try {
                const outputData = JSON.parse(event.data);
                if (outputData.type === 'WA_EMBEDDED_SIGNUP') {
                    if (outputData.event === 'FINISH') {
                        post(route('projects.whatsapp.store', project.slug), {
                            values: outputData.data,
                            code: data.code,
                            preserveScroll: true,
                            preserveState: true
                        });

                        console.log("✅Again Finished", {
                            values: outputData.data,
                            code: data.code,
                            preserveScroll: true,
                            preserveState: true
                        });
                        console.log("✅ Finished", outputData.data);
                    } else if (outputData.event === 'CANCEL') {
                        console.warn("⚠️ Cancel at", outputData.data.current_step);
                    } else if (outputData.event === 'ERROR') {
                        console.error("❌ Error:", outputData.data.error_message);
                    }
                }
            } catch {
                console.log('Non-JSON message:', event.data);
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    return (
        <div className="card bg-white shadow-lg rounded-xl p-6 mb-6 border border-gray-200">
            <div className="flex items-center justify-between border-b">
                <h2 className="text-lg font-bold text-gray-900">WhatsApp Account</h2>
                <div className='flex justify-end mb-4'>
                    {canCreate &&
                        <PrimaryBtn
                            labelName='Connect'
                            className="mr-4"
                            Icon={() => <ChatBubbleBottomCenterIcon className="h-5 mr-2"/>}
                            onClick={launchWhatsAppSignup} // ⬅️ like your HTML button
                        />
                    }
                </div>
            </div>
        </div>
    );
}
