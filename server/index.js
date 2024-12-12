const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const downloadRoute = require('./routes/download');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api', downloadRoute);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
