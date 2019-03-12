import http from 'http';
import app from './app';

const PORT = 3001;
const server = http.createServer(app);
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});