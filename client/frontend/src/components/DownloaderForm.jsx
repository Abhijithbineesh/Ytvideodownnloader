import React, { useState } from 'react';

const DownloaderForm = ({ onSubmit }) => {
    const [url, setUrl] = useState('');
    const [format, setFormat] = useState('video');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ url, format });
    };

    return (
        <form onSubmit={handleSubmit} style={{ margin: '20px' }}>
            <div>
                <label>
                    YouTube URL:
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter YouTube link"
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Format:
                    <select value={format} onChange={(e) => setFormat(e.target.value)}>
                        <option value="video">MP4</option>
                        <option value="audio">MP3</option>
                    </select>
                </label>
            </div>
            <button type="submit" style={{ marginTop: '10px' }}>Download</button>
        </form>
    );
};

export default DownloaderForm;
