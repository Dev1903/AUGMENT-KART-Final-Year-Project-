//index.js
import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import Connection from './db.js';
import categoryRoutes from './routes/Category.js'
import productRoutes from './routes/Products.js'
import userRoutes from './routes/User.js'

const app = express()
const PORT = 8000;

app.use(cors());
app.use(bodyParser.json({ extended : true }))
app.use(bodyParser.urlencoded({ extended : true }))
Connection()

app.use('/category', categoryRoutes)
app.use('/products', productRoutes)
app.use('/user', productRoutes)
app.use('/images/category-logo', express.static('images/category-logo'))
app.use('/images/product-images', express.static('images/product-images'))

app.listen(PORT, () => console.log(`Server Running On Port Number ${PORT}`))