'use client';

export default function Background({ children }) {
    return (
        <div className="bg-top bg-no-repeat bg-cover" style={{ backgroundImage: `url(/images/bg-banner.png)` }}>
            {children}
        </div>
    );
}
