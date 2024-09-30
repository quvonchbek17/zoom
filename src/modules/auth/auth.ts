import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "@errors";
import axios from "axios";
import * as qs from "qs";
import dotenv from "dotenv"
dotenv.config()

export class AuthController {
  static async Login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { code } = req.query;

      // Zoom OAuth 2.0 token olish uchun so'rov
      const response = await axios.post(
        "https://zoom.us/oauth/token",
        qs.stringify({
          grant_type: "authorization_code",
          code: code,
          redirect_uri: process.env.ZOOM_REDIRECT_URI,
        }),
        {
          headers: {
            Authorization: `Basic ${Buffer.from(
              `${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`
            ).toString("base64")}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      res.status(200).send({
        success: true,
        message: "Token muvaffaqiyatli olindi",
        data: response.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.response?.status || 500));
    }
  }

  static async RefreshAccessToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { refresh_token } = req.body;

      const response = await axios.post(
        "https://zoom.us/oauth/token",
        qs.stringify({
          grant_type: "refresh_token",
          refresh_token: refresh_token,
        }),
        {
          headers: {
            Authorization: `Basic ${Buffer.from(
              `${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`
            ).toString("base64")}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      res.status(200).json({
        success: true,
        message: "Access token muvaffaqiyatli yangilandi",
        data: response.data,
      });
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      next(new ErrorHandler(error.response?.data?.message || error.message, error.response?.status || 500));
    }
  }
}
