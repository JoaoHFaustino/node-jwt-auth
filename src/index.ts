import express, { json } from 'express';
import { generateToken, authenticateToken } from './middlewares/auth';

const app = express();
const port = 3000;

app.use(json());

app.get('/', (req, res) => {
  res.send('Hello World!!');
});

app.post('/generate-token', (req, res) => {
    const { username } = req.body;
    const user = { id: 1, username };
    const token = generateToken(user);
  
    res.json({ token });
  });
app.get('/protected', authenticateToken, (req, res) => {
    res.send('This is a protected route');
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
