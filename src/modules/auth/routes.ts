import { Router } from "express";
import { AuthController } from "./auth";
import { loginDto, refreshAccessTokenDto, validate } from "@middlewares";

const AuthRouter = Router();

AuthRouter
  .get("/login", validate(loginDto, "query"), AuthController.Login)
  .post("/refresh-access-token", validate(refreshAccessTokenDto), AuthController.RefreshAccessToken)

export { AuthRouter };
