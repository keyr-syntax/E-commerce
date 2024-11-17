const express = require("express");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const dotenv = require("dotenv");
const cookeParser = require("cookie-parser");
const connectDB = require("./config/db.js");
const userRoutes = require("./routes/userRoutes.js");
const categoryRoutes = require("./routes/categoryRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");
const notificationRoutes = require("./routes/notificationRoutes.js");
const fileupload = require("express-fileupload");
const http = require("http");
const socketIOServer = require("socket.io");

dotenv.config();
connectDB();
const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cookeParser());
app.use(express.urlencoded({ extended: true }));
app.use(fileupload());
const io = socketIOServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: "Content-Type, Authorization",
  },
});
app.use(cors("*"));
app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/notification", notificationRoutes);
app.get("/", (req, res) => {
  res.send("Hello, Welcome to Syntax E-commerce!");
});
io.on("connection", (socket) => {
  console.log("socket connected");
  socket.on("disconnect", () => {
    console.log("socket disconnected");
  });
});
app.set("socketio", io);

server.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Server is running on port http://localhost:${PORT}`);
  }
});
