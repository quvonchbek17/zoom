import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "@middlewares";
import router from "./routes";
import path from "path";
dotenv.config();

const app: Application = express();

//// cors
app.use(cors({ origin: "*" }));

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src", "views"))

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "src", "public")))

app.use("/api/v1",router);

app.get('/', (req: Request, res: Response) => {
  const clientId = process.env.ZOOM_CLIENT_ID;
  const redirectUri = encodeURIComponent(process.env.ZOOM_REDIRECT_URI!); // URI ni to'g'ri formatlash

  const authUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;

  res.redirect(authUrl); // Foydalanuvchini Zoom OAuth login sahifasiga yo'naltirish
});
app.use(errorHandler);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(port);
});
