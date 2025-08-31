import ApplicationLogo from '@components/ApplicationLogo';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center px-2 sm:px-0 sm:pt-0 bg-sky-100">
            <div className='w-full relative sm:max-w-md z-10 shadow-md overflow-hidden rounded-lg bg-sky-800'>
                <div className="w-full relative px-6 py-4 md:py-10 md:px-8">
                    <div className='pb-4 lg:pb-6 w-full'>
                        <ApplicationLogo className="!text-blue-100" />
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
