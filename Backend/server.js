const express = require('express');
const connectDB = require('./src/config/db');
const dotenv = require('dotenv');
const userRoutes = require('./src/routes/users.routes')
dotenv.config();

const app = express();

app.use(express.json());

app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.send('Server is running');
});

const PORT = process.env.PORT || 3000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => { console.log(err) });

