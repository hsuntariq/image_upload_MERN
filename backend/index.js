const express = require('express');
const connectDB = require('./config/connect');
const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
connectDB()

app.use('/api/user', require('./routes/userRoutes'))


app.listen(3001,()=>console.log('server started on port 3001'))