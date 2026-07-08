import { useEffect, useState } from 'react';

export function FlashToast({ success, error }: { success?: string | null; error?: string | null }) {
    const [visible, setVisible] = useState(true);
    const message = success || error;

    useEffect(() => {
        setVisible(true);

        if (!message) {
            return;
        }

        const timer = window.setTimeout(() => setVisible(false), 3500);

        return () => window.clearTimeout(timer);
    }, [message]);

    if (!message || !visible) {
        return null;
    }

    const tone = success ? 'border-emerald-300 bg-emerald-50 text-emerald-900' : 'border-rose-300 bg-rose-50 text-rose-900';

    return (
        <div className="fixed right-5 top-5 z-50 max-w-sm">
            <div className={`rounded-2xl border px-4 py-3 shadow-lg ${tone}`}>
                <p className="text-sm font-medium">{message}</p>
            </div>
        </div>
    );
}
