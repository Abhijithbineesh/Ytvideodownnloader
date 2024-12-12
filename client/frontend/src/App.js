import React, { useState } from 'react';
import DownloaderForm from './components/DownloaderForm';
import DownloadResult from './components/DownloadResult';
import Loader from './components/Loader';
import axios from 'axios';

const App = () => {
    const [downloadUrl, setDownloadUrl] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFormSubmit = async ({ url, format }) => {
        setLoading(true);
        setError(null);
        setDownloadUrl(null);

        if (!url || !format) {
            setError('Please provide a valid YouTube URL and select a format.');
            setLoading(false);
            return;
        }

        try {
            // Send POST request to the backend
            const response = await axios.post(
                'http://localhost:5000/api/download', // Adjusted endpoint to match your backend
                { url, format },
                { responseType: 'blob' }
            );

            // Create a downloadable link from the response blob
            const blob = new Blob([response.data], { type: format === 'audio' ? 'audio/mpeg' : 'video/mp4' });
            const downloadLink = URL.createObjectURL(blob);
            setDownloadUrl(downloadLink);
        } catch (err) {
            console.error(err);
            if (err.response?.status === 400) {
                setError('Invalid YouTube URL. Please check and try again.');
            } else {
                setError('An unexpected error occurred. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            maxWidth: '600px',
            margin: '0 auto',
            padding: '20px',
            textAlign: 'center',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9'
        }}>
            <h1 style={{ marginBottom: '20px' }}>YouTube Video Downloader</h1>
            <DownloaderForm onSubmit={handleFormSubmit} />
            {loading && <Loader />}
            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
            <DownloadResult downloadUrl={downloadUrl} />
        </div>
    );
};

export default App;
