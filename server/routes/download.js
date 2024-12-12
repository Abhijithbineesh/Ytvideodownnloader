const express = require('express');
const ytdl = require('@distube/ytdl-core');

const router = express.Router();

router.post('/download', async (req, res) => {
    const { url, format } = req.body;

    // Validate YouTube URL
    if (!ytdl.validateURL(url)) {
        return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    try {
        // Get video info
        const info = await ytdl.getInfo(url);
        const title = info.videoDetails.title.replace(/[<>:"/\\|?*]+/g, ''); // sanitize filename

        // Set headers for download
        res.header('Content-Disposition', `attachment; filename="${title}.${format === 'audio' ? 'mp3' : 'mp4'}"`);

        if (format === 'audio') {
            // Audio download
            res.header('Content-Type', 'audio/mpeg');
            ytdl(url, { filter: 'audioonly', quality: 'highestaudio' }).pipe(res);
        } else {
            // Video download
            res.header('Content-Type', 'video/mp4');
            ytdl(url, { quality: 'highestvideo' }).pipe(res);
        }
    } catch (error) {
        console.error('Download error:', error);
        res.status(500).json({ error: 'Error processing download request', message: error.message });
    }
});

module.exports = router;
