import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Load .env from parent directory
const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, '../.env') });

const API_KEY = process.env.VITE_GEMINI_API_KEY;

if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
    console.error('Error: Invalid API Key in .env');
    process.exit(1);
}

console.log('Testing API Key:', API_KEY.substring(0, 10) + '...');

async function listModels() {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
        const data = await response.json();
        
        if (data.error) {
            console.error('API Error:', data.error);
            return;
        }

        if (!data.models) {
            console.log('No models found. Response:', data);
            return;
        }

        console.log('\nAvailable Models:');
        data.models.forEach(model => {
            if (model.supportedGenerationMethods.includes('generateContent')) {
                console.log(`- ${model.name.replace('models/', '')}`);
            }
        });
    } catch (error) {
        console.error('Network Error:', error.message);
    }
}

listModels();
