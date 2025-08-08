const express = require('express')
const app = express()
const cors = require("cors")
const cookieParser = require("cookie-parser")
const fileupload = require("express-fileupload")

require("dotenv").config();

const PORT = process.env.PORT || 5000

// CORS configuration - MUST be first
app.use(cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: [
        'Content-Type', 
        'Authorization', 
        'X-Requested-With',
        'Accept',
        'Origin',
        'Cache-Control',
        'X-File-Name'
    ],
    exposedHeaders: ['Authorization'],
    optionsSuccessStatus: 200,
    preflightContinue: false
}));

// Enhanced preflight handling
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin, Cache-Control, X-File-Name');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});

// Middleware order is important
app.use(express.json());
app.use(cookieParser());

// File upload configuration
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: 5 * 1024 * 1024 },
    createParentPath: true
}));

// Routes
const Courseroute = require("./routes/Courseroute")
const Userroute = require("./routes/Userroute")
const Profileroute = require("./routes/Profileroute")
const Paymentroute = require("./routes/Paymentroute")

app.use("/api/v1/auth", Userroute)
app.use("/api/v1/profile", Profileroute)
app.use("/api/v1/course", Courseroute)
app.use("/api/v1/payment", Paymentroute)

// DB connection
const dbconnection = require("./config/dbconeection")
dbconnection();

// Cloudinary connect
const connectcloudinary = require("./config/cloudinary")
connectcloudinary.cloudinaryConnect();

// Server start
app.listen(PORT, () => {
    console.log("app is running at port ", PORT);
})

// Dummy request
app.get("/ping", (req, res) => {
    res.send("pong")
})