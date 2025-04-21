const express = require("express");
const cors = require("cors");
const passport = require("passport");

require("dotenv").config();
const authRoutes = require("./routes/auth");

const app = express();
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const classroomRoutes = require("./routes/api/classrooms");

app.use("/api/classrooms", classroomRoutes);