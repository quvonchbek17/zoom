import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { ErrorHandler } from "@errors";
import { zoomBuilder } from "@config";
import * as qs from "qs"
import * as fs from "fs"
import path from "path";
import FormData from "form-data"

export class UsersController {

  static async GetUserByIdOrMe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.access_token as string;

      let { userId } = req.query


      res.status(200).json({
        success: true,
        message: "Account details fetched successfully",
        // data: response.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.response?.data?.message || error.message, error.status));
    }
  }


  static async GetUserSettings(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let zoom = zoomBuilder(token)

      let { userId } = req.query

      let user = userId || "me"
      let response = await zoom.get(`/users/${user}/settings`)

      res.status(200).json({
        success: true,
        message: "User settinglari olindi",
        data: response.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.response?.data?.message || error.message, error.status));
    }
  }

  static async GetUserPermissions(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let zoom = zoomBuilder(token)
      let { userId } = req.query

      let user = userId || "me"
      let response = await zoom.get(`/users/${user}/permissions`)

      res.status(200).json({
        success: true,
        message: "User permissionlari olindi",
        data: response.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.response?.data?.message || error.message, error.status));
    }
  }

  static async CheckUserEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let zoom = zoomBuilder(token)
      let { email } = req.query


      let query = qs.stringify({email})

      const response = await zoom.get(`/users/email?${query}`)

      res.status(200).json({
        success: true,
        message: "Email ro'yhatdan o'tgan yoki yo'qligi tekshirildi",
        data: response.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.response?.data?.message || error.message, error.status));
    }
  }

  static async CheckUserPMRoom(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let zoom = zoomBuilder(token)

      const { vanity_name } = req.query;

      let query = qs.stringify({
        vanity_name
      })

      const response = await zoom.get(`/users/vanity_name?${query}`);

      res.status(200).json({
        success: true,
        message: "Personal meeting bor yoki yo'qligi tekshirildi",
        data: response.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.response?.data?.message || error.message, error.status));
    }
  }

  static async GetUserPresenceStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let zoom = zoomBuilder(token)
      let { userId } = req.query

      let user = userId || "me"
      let response = await zoom.get(`/users/${user}/presence_status`)

      res.status(200).json({
        success: true,
        message: "User mavjudlik holati haqida ma'lumot",
        data: response.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.response?.data?.message || error.message, error.status));
    }
  }

  static async GetUserZAKToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let zoom = zoomBuilder(token)
      let { userId } = req.query

      let user = userId || "me"
      let response = await zoom.get(`/users/${user}/token`, {
        params: {
          type: "zak", // ZAK tokenni olish uchun 'type=zak' qo'shiladi
        },
      })



      res.status(200).json({
        success: true,
        message: "User ZAK tokeni",
        data: response.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.response?.data?.message || error.message, error.status));
    }
  }

  static async GetUserAllCollabrationDevices(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let zoom = zoomBuilder(token)
      let { userId } = req.query

      let user = userId || "me"
      let response = await zoom.get(`/users/${user}/collaboration_devices`)

      res.status(200).json({
        success: true,
        message: "User collabration devicelari",
        data: response.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.response?.data?.message || error.message, error.status));
    }
  }

  static async GetUserCollabrationDeviceDetail(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let zoom = zoomBuilder(token)
      let { userId, device_id } = req.query

      let user = userId || "me"
      let response = await zoom.get(`/users/${user}/collaboration_devices/${device_id}`)

      res.status(200).json({
        success: true,
        message: "User collabration haqida batafsil",
        data: response.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.response?.data?.message || error.message, error.status));
    }
  }

  static async GetUserAllMeetingTemplates(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let zoom = zoomBuilder(token)
      let { userId } = req.query

      let user = userId || "me"
      let response = await zoom.get(`/users/${user}/meeting_templates`)

      res.status(200).json({
        success: true,
        message: "User meeting templatelari",
        data: response.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.response?.data?.message || error.message, error.status));
    }
  }

  // zoom permissionlari to'g'ri kelmayapti
  // static async GetUserMeetingTemplateDetails(req: Request, res: Response, next: NextFunction): Promise<void> {
  //   try {
  //     const token = req.headers.access_token as string;
  //     let zoom = zoomBuilder(token)
  //     let { userId, meetingTemplateId } = req.query

  //     console.log(meetingTemplateId);


  //     let user = userId || "me"
  //     let response = await zoom.get(`/users/${user}/meeting_templates/${meetingTemplateId}`)

  //     res.status(200).json({
  //       success: true,
  //       message: "User meeting template detallari",
  //       data: response.data,
  //     });
  //   } catch (error: any) {
  //     next(new ErrorHandler(error.response?.data?.message || error.message, error.status));
  //   }
  // }

  static async GetUserAllAssistants(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let zoom = zoomBuilder(token)
      let { userId } = req.query

      let user = userId || "me"
      let response = await zoom.get(`/users/${user}/assistants`)

      res.status(200).json({
        success: true,
        message: "User assistants",
        data: response.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.response?.data?.message || error.message, error.status));
    }
  }

  static async GetUserAllSchedulers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let zoom = zoomBuilder(token)
      let { userId } = req.query

      let user = userId || "me"
      let response = await zoom.get(`/users/${user}/schedulers`)

      res.status(200).json({
        success: true,
        message: "User schedulers",
        data: response.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.response?.data?.message || error.message, error.status));
    }
  }


  static async CreateUserAssistant(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let zoom = zoomBuilder(token)
      let { userId } = req.body

      let response = await zoom.post(`/users/${userId}/assistants`)

      res.status(200).json({
        success: true,
        message: "User assistant qo'shildi",
        data: response.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.response?.data?.message || error.message, error.status));
    }
  }

  static async UploadUserPicture(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const { userId } = req.body;

      const file = req.file as Express.Multer.File;

      let filePath = path.join(process.cwd(), "uploads", file.fieldname)

      const formData = new FormData();
      formData.append('pic_file', fs.createReadStream(filePath), {
        filename: file.originalname,
        contentType: file.mimetype,
      });


      const response = await axios.post(
        `https://zoom.us/v2/users/${userId}/picture`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            ...formData.getHeaders(),
          },
        }
      );

      res.status(200).json({
        success: true,
        message: "Profil rasmi muvaffaqiyatli yangilandi",
        data: response.data,
      });
      fs.readFileSync(filePath)
    } catch (error: any) {
      console.error(error);
      next(new ErrorHandler(error.response?.data?.message || error.message, error.response?.status || 500));
    }
  }

  static async UploadVirtualBackgroundFile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const { userId } = req.body;

      const file = req.file as Express.Multer.File;

      let filePath = path.join(process.cwd(), "uploads", file.fieldname)

      const formData = new FormData();
      formData.append('file', fs.createReadStream(filePath), {
        filename: file.originalname,
        contentType: file.mimetype,
      });


      const response = await axios.post(
        `https://zoom.us/v2/users/${userId}/settings/virtual_backgrounds`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            ...formData.getHeaders(),
          },
        }
      );

      res.status(200).json({
        success: true,
        message: "Profil rasmi muvaffaqiyatli yangilandi",
        data: response.data,
      });

      fs.readFileSync(filePath)
    } catch (error: any) {
      console.error(error);
      next(new ErrorHandler(error.response?.data?.message || error.message, error.response?.status || 500));
    }
  }

  static async UpdateUserEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let zoom = zoomBuilder(token)
      let { userId, email } = req.body

      let response = await zoom.put(`/users/${userId}/email`, {
        email
      })

      res.status(200).json({
        success: true,
        message: "User email yangilandi",
        data: response.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.response?.data?.message || error.message, error.status));
    }
  }

  static async UpdateUserPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let zoom = zoomBuilder(token)
      let { userId, password } = req.body

      let response = await zoom.put(`/users/${userId}/password`, {
        password
      })

      res.status(200).json({
        success: true,
        message: "User paroli yangilandi",
        data: response.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.response?.data?.message || error.message, error.status));
    }
  }

  static async UpdateUserPresenceStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let zoom = zoomBuilder(token)
      let { userId, status, duration } = req.body

      let response = await zoom.put(`/users/${userId}/presence_status`, {
        status,
        duration: duration || 20
      })

      res.status(200).json({
        success: true,
        message: "User holati yangilandi",
        data: response.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.response?.data?.message || error.message, error.status));
    }
  }

  static async UpdateUserStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let zoom = zoomBuilder(token)
      let { userId, action } = req.body

      let response = await zoom.put(`/users/${userId}/status`, {
        action
      })

      res.status(200).json({
        success: true,
        message: "User holati yangilandi",
        data: response.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.response?.data?.message || error.message, error.status));
    }
  }
}
