
const express=require("express");
const mongoose=require("mongoose");
require("dotenv").config();
const cors=require("cors");
const routes=require("./routes/TodoRoute");



const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Test route
app.get("/", (req, res) => {
    res.send("Hi, the server is running!");
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.error("MongoDB connection error:", err));


app.use("/api",routes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
