import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from './routes/auth.js' 
import userRoute from './routes/user.js'
import doctorRoute from './routes/doctor.js'
import reviewRoute from './routes/review.js'


dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: true,
};

// database connection
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    });
    console.log("mongodb database is connected");
  } catch (err) {
    console.log(" mongodb database is connection is failed");
  }
}

app.get("/", (req, res) => {
  res.send("Api is working");
});

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

//routes

app.use('/api/v1/auth',authRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/doctors',doctorRoute)
app.use('/api/v1/reviews',reviewRoute)

app.listen(port, () => {
    connectDB()
  console.log("server is running on port " + port);
});
