export default function ApplicationLogo({ className }) {
    return (
        <div className="flex justify-center my-1 items-center">
            <img src="/images/logo_black.png" className={"h-20 " + className} />
        </div>
    );
}
