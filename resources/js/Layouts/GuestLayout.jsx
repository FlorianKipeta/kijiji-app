import ApplicationLogo from "@components/ApplicationLogo";

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-slate-800 via-slate-900 to-gray-800">
            {/* Left column (Image + Branding) */}
            <div className="hidden lg:flex w-1/2 items-center justify-center p-12">
                <div className="text-center text-white max-w-md">
                    <ApplicationLogo className="mx-auto mb-6 w-24 h-24" />
                    <h1 className="text-4xl font-extrabold mb-4">Welcome to Kijiji</h1>
                    <p className="text-lg text-slate-200">
                        Manage your account, connect, and explore all features with ease.
                    </p>
                    {/*<img*/}
                    {/*    src="/images/login-illustration.svg"*/}
                    {/*    alt="Login Illustration"*/}
                    {/*    className="mt-10 max-w-sm mx-auto drop-shadow-xl"*/}
                    {/*/>*/}
                </div>
            </div>

            {/* Right column (Form area with card) */}
            <div className="flex w-full lg:w-1/2 items-center justify-center px-6 sm:px-12 lg:px-20">
                <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10">
                    {children}
                </div>
            </div>
        </div>
    );
}
