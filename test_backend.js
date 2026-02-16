
async function testBackend() {
    try {
        console.log("Testing Health...");
        const health = await fetch('http://localhost:5001/api/health');
        console.log("Health Status:", health.status);

        console.log("Testing CORS (OPTIONS)...");
        const optionsRes = await fetch('http://localhost:5001/api/ai/analyze-ecg-async', {
            method: 'OPTIONS',
            headers: {
                'Origin': 'http://localhost:3000',
                'Access-Control-Request-Method': 'POST'
            }
        });
        console.log("OPTIONS Status:", optionsRes.status);
        console.log("Access-Control-Allow-Origin:", optionsRes.headers.get('access-control-allow-origin'));
        console.log("Access-Control-Allow-Methods:", optionsRes.headers.get('access-control-allow-methods'));

        console.log("Testing ECG Analysis (POST)...");
        const res = await fetch('http://localhost:5001/api/ai/analyze-ecg-async', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ecgData: "SAMPLE_KAGGLE_ID", samplingRate: 500 })
        });
        console.log("ECG Status:", res.status);
        if (res.ok) {
            const json = await res.json();
            console.log("ECG Result Success");
        } else {
            const errorText = await res.text();
            console.log("ECG Error:", errorText);
        }

    } catch (err) {
        console.error("Test Failed:", err);
    }
}

testBackend();
