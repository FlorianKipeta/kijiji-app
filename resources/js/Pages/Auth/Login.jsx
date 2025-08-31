import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@components/InputError";
import TextInput from "@components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import SecondaryButton from "@components/SecondaryButton";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-500 text-center">
                    {status}
                </div>
            )}

            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Welcome Back 👋
            </h2>

            <form onSubmit={submit} className="space-y-5">
                {/* Email */}
                <div>
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full rounded-lg border-gray-300 focus:border-slate-500 focus:ring-slate-500 placeholder-gray-400"
                        autoComplete="username"
                        placeholder="Email address"
                        isFocused={true}
                        onChange={(e) => setData("email", e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* Password */}
                <div>
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full rounded-lg border-gray-300 focus:border-slate-500 focus:ring-slate-500 placeholder-gray-400"
                        autoComplete="current-password"
                        placeholder="Password"
                        onChange={(e) => setData("password", e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="text-sm text-slate-600 hover:underline"
                        >
                            Forgot password?
                        </Link>
                    )}

                    <SecondaryButton
                        type="submit"
                        className="px-6 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition"
                        disabled={processing}
                    >
                        Log in
                    </SecondaryButton>
                </div>

                {/* Sign Up link */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Don’t have an account?{" "}
                    {/*<Link*/}
                    {/*    href={route("register")}*/}
                    {/*    className="text-slate-600 font-medium hover:underline"*/}
                    {/*>*/}
                        Sign up
                    {/*</Link>*/}
                </p>
            </form>
        </GuestLayout>
    );
}
