import Link from 'next/link'
import React from 'react';
import "./mobile-bottom-menu.scss";

const MobileMottomMenu = () => {
    return (
        <div className='mobile-bottome-menu'>
            <Link href="">
                <span className='icon'>
                    <svg
                        data-encore-id="icon"
                        role="img"
                        aria-hidden="true"
                        className="e-9960-icon e-9960-baseline"
                        viewBox="0 0 24 24"
                    >
                        <path d="M13.5 1.515a3 3 0 0 0-3 0L3 5.845a2 2 0 0 0-1 1.732V21a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7.577a2 2 0 0 0-1-1.732z" />
                    </svg>

                </span>
                <span className="text">
                    Home
                </span>
            </Link>
            <Link href="">
                <span className='icon'>
                    <svg
                        data-encore-id="icon"
                        role="img"
                        aria-hidden="true"
                        className="e-9960-icon e-9960-baseline"
                        viewBox="0 0 24 24"
                    >
                        <path d="M10.533 1.27893C5.35215 1.27893 1.12598 5.41887 1.12598 10.5579C1.12598 15.697 5.35215 19.8369 10.533 19.8369C12.767 19.8369 14.8235 19.0671 16.4402 17.7794L20.7929 22.132C21.1834 22.5226 21.8166 22.5226 22.2071 22.132C22.5976 21.7415 22.5976 21.1083 22.2071 20.7178L17.8634 16.3741C19.1616 14.7849 19.94 12.7634 19.94 10.5579C19.94 5.41887 15.7138 1.27893 10.533 1.27893ZM3.12598 10.5579C3.12598 6.55226 6.42768 3.27893 10.533 3.27893C14.6383 3.27893 17.94 6.55226 17.94 10.5579C17.94 14.5636 14.6383 17.8369 10.533 17.8369C6.42768 17.8369 3.12598 14.5636 3.12598 10.5579Z" />
                    </svg>
                </span>
                <span className="text">
                    Search
                </span>
            </Link>
            <Link href="">
                <span className='icon'>
                    <svg
                        data-encore-id="icon"
                        role="img"
                        aria-hidden="true"
                        className="e-9960-icon e-9960-baseline"
                        viewBox="0 0 24 24"
                    >
                        <path d="M14.5 2.134a1 1 0 0 1 1 0l6 3.464a1 1 0 0 1 .5.866V21a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V3a1 1 0 0 1 .5-.866M16 4.732V20h4V7.041zM3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1m6 0a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1" />
                    </svg>
                </span>
                <span className="text">
                    Your Library
                </span>
            </Link>
            <Link href="">
                <span className='icon'>
                    <svg
                        data-encore-id="icon"
                        role="img"
                        aria-hidden="true"
                        className="e-9960-icon e-9960-baseline"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12.438 1.009C6.368.769 1.251 5.494 1.008 11.565c-.24 6.07 4.485 11.186 10.556 11.426 6.07.242 11.185-4.484 11.427-10.554S18.507 1.251 12.438 1.009m4.644 16.114a.657.657 0 0 1-.897.246 13.2 13.2 0 0 0-4.71-1.602 13.2 13.2 0 0 0-4.968.242.658.658 0 0 1-.31-1.278 14.5 14.5 0 0 1 5.46-.265c1.837.257 3.579.851 5.177 1.76.315.178.425.58.246.896zm1.445-2.887a.853.853 0 0 1-1.158.344 16.2 16.2 0 0 0-5.475-1.797 16.2 16.2 0 0 0-5.758.219.855.855 0 0 1-1.018-.65.85.85 0 0 1 .65-1.018 17.9 17.9 0 0 1 6.362-.241 17.9 17.9 0 0 1 6.049 1.985c.415.224.57.743.344 1.158zm1.602-3.255a1.05 1.05 0 0 1-1.418.448 19.7 19.7 0 0 0-6.341-2.025 19.6 19.6 0 0 0-6.655.199 1.05 1.05 0 1 1-.417-2.06 21.7 21.7 0 0 1 7.364-.22 21.7 21.7 0 0 1 7.019 2.24c.515.268.715.903.448 1.418" />
                    </svg>
                </span>
                <span className="text">
                    Other Site
                </span>
            </Link>
        </div>
    )
}

export default MobileMottomMenu