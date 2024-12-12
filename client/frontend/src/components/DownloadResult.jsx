import React from 'react';

const DownloadResult = ({ downloadUrl, error }) => {
    if (error) {
        return <div style={{ color: 'red' }}>Error: {error}</div>;
    }

    if (downloadUrl) {
        return (
            <div>
                <a href={downloadUrl} download style={{ color: 'blue' }}>
                    Click here to download
                </a>
            </div>
        );
    }

    return null;
};

export default DownloadResult;
