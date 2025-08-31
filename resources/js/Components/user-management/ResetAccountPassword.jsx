import { PrimaryBtn, SecondaryBtn } from '@components/buttons';
import { CheckBox, Input } from '@components/inputs';
import { useForm } from '@inertiajs/react'
import React, { useEffect, useRef, useState } from 'react'

export const ResetAccountPassword = ({ user }) => {
    const { data, setData, post, errors, processing, reset } = useForm({
        password: '',
        password_confirmation: '',
        request_password_change: true
    });

    const [showForm, setShowForm] = useState(false);

    const passwordInput = useRef(null);
    const passwordConfirmInput = useRef(null);

    function resetPassword(event) {
        event.preventDefault();

        // @ts-ignore
        post(route('users.reset-password', user.id), {
            preserveScroll: true,
            onError: () => passwordInput.current.focus(),
            onSuccess: () => {
                setShowForm(false);
            }
        });
    }

    useEffect(() => {
        if (!showForm) {
            reset();
            return;
        }
        setTimeout(() => passwordInput.current.focus(), 250);
    }, [showForm]);

    return (
        <>
            <div className="mb-3">
                <h2 className="text-slate-700 text-xl font-bold">Reset User Password</h2>
                <p className="text-gray-500 text-sm">Reset password of <span className="text-indigo-500 font-semibold">{user.name}</span></p>
            </div>
            {
                !showForm ?
                    <div>
                        <PrimaryBtn labelName="Reset Account Password" onClick={() => setShowForm(true)} />
                    </div>
                    :
                    <form onSubmit={resetPassword} className="space-y-2 max-w-md">
                        <div className="my-2">
                            <label htmlFor='reset-password'> Password </label>
                            <Input
                                refs={passwordInput}
                                type="password"
                                id="reset-password"
                                value={data.password}
                                required
                                onChange={e => setData('password', e.target.value)}
                            />
                            <span className="text-sm text-red-500">
								{errors.password ? errors.password : null}
							</span>
                        </div>
                        <div className="my-2">
                            <label htmlFor='reset-password-confirm'> Confirm Password </label>
                            <Input
                                refs={passwordConfirmInput}
                                type="password"
                                label="Confirm Password"
                                visible_label
                                id="reset-password-confirm"
                                required
                                value={data.password_confirmation}
                                onChange={e => setData('password_confirmation', e.target.value)}
                            />
                        </div>
                        <div className='mt-2 col-span-full'>
                            <CheckBox label='User must change password.' isChecked={data.request_password_change} />
                        </div>
                        <div className="flex space-x-2 mt-4 py-2">
                            <PrimaryBtn labelName={processing ? 'Resetting' : 'Reset Password'} disabled={processing} />
                            <SecondaryBtn type="button" labelName="Cancel" onClick={() => setShowForm(false)} disabled={processing} />
                        </div>
                    </form>
            }
        </>
    )
}
