
// Native fetch in Node.js

async function testConnection() {
    try {
        console.log("Testing connection to http://localhost:5001/api/health...");
        const healthRes = await fetch('http://localhost:5001/api/health');
        if (healthRes.ok) {
            console.log("Health Check: SUCCESS");
            const data = await healthRes.json();
            console.log(data);
        } else {
            console.log("Health Check: FAILED", healthRes.status, healthRes.statusText);
        }
    } catch (error) {
        console.error("Health Check Error:", error.message);
    }
}

testConnection();
