const express = require('express');
const connectDB = require('./src/config/db');
const dotenv = require('dotenv');
const userRoutes = require('./src/routes/users.routes')
const productRoutes = require('./src/routes/products.routes')
const cors = require('cors');

// const seedProducts = require('./src/seed/seedProducts');
dotenv.config();

const app = express();

const corsOptions = {
    origin: '*',
    credential: true
}


app.use(cors(corsOptions))

app.use(express.json());

app.use('/user', userRoutes);
app.use('/product', productRoutes);

// Trigger seeding from route (for dev only)
// app.get('/seed-products', async (req, res) => {
//     await seedProducts();
//     res.send('Products seeded');
// });

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

