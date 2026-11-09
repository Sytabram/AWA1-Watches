import express from 'express';
import { readFileSync } from 'node:fs';

const watches = JSON.parse(readFileSync(new URL('./data/watches.json', import.meta.url)));
const app = express();

app.get('/api/watches', (_req, res) => res.json(watches));
app.listen(3001, () => console.log('API sur http://localhost:3001/api/watches'));