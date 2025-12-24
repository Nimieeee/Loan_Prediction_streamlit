const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/predict', (req, res) => {
    const inputData = req.body;

    // Call the Python bridge script
    const pythonPath = process.env.PYTHON_PATH || 'python3';
    const pythonProcess = spawn(pythonPath, [path.join(__dirname, 'bridge.py')]);

    let resultData = '';
    let errorData = '';

    // Send input data to python script
    pythonProcess.stdin.write(JSON.stringify(inputData));
    pythonProcess.stdin.end();

    pythonProcess.stdout.on('data', (data) => {
        resultData += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        errorData += data.toString();
    });

    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            console.error('Python process exited with code:', code);
            console.error('Error output:', errorData);
            return res.status(500).json({ error: 'Internal server error', details: errorData });
        }

        try {
            const result = JSON.parse(resultData);
            if (result.error) {
                return res.status(400).json({ error: result.error, details: result.sys_path });
            }
            res.json(result);
        } catch (e) {
            console.error('Failed to parse Python output:', resultData);
            res.status(500).json({ error: 'Failed to parse prediction result' });
        }
    });
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});
