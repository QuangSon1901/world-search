'use client';

export default function Button({ label, onClick, disable, outline, small, icon }) {
    return (
        <button
            disabled={disable}
            onClick={onClick}
            className={`relative
                select-none
                disabled:opacity-70
                disabled:cursor-not-allowed
                rounded-xl
                transition
                w-max
                px-6 py-4
                cursor-pointer
                border
                ${outline ? 'border-text-primary' : 'border-transparent'}
            `}
        >
            {label}
        </button>
    );
}
