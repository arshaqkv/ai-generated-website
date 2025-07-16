import express from "express";
import "dotenv/config";
import cors from "cors";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["POST"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Test api is running");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
