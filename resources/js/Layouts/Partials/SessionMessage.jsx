// @ts-nocheck
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export const SessionMessage = () => {
    // @ts-ignore
    const { flash } = usePage().props;

    useEffect(() => {

        if (flash?.message) {
            toast.info(<div dangerouslySetInnerHTML={{ __html: flash?.message }} />);
        }

        if (flash?.success) {
            toast.success(<div dangerouslySetInnerHTML={{ __html: flash?.success }} />);
        }

    }, [flash]);
}