import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "@errors";
import { zoomBuilder } from "@config";
import * as qs from "qs";

export class MeetingsController {
  static async GetAllMeetings(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.access_token as string;
      let zoom = zoomBuilder(token);
      let { userId, type, page_size, page_number, from, to, timezone } =
        req.query;

      let query = qs.stringify({
        type,
        page_size,
        page_number,
        from,
        to,
        timezone,
      });

      let user = userId || "me";

      let response = await zoom.get(`/users/${user}/meetings?${query}`);

      res.status(200).json({
        success: true,
        message: "Meetinglar",
        data: response.data,
      });
    } catch (error: any) {
      next(
        new ErrorHandler(
          error.response?.data?.message || error.message,
          error.status
        )
      );
    }
  }

  static async GetMeetingById(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.access_token as string;
      let zoom = zoomBuilder(token);
      let { meetingId, occurrence_id, show_previous_occurrences } = req.query;

      let query = qs.stringify({
        occurrence_id,
        show_previous_occurrences,
      });

      let response = await zoom.get(`/meetings/${meetingId}?${query}`);

      res.status(200).json({
        success: true,
        message: "Meetinglar haqida batafsil ma'lumot",
        data: response.data,
      });
    } catch (error: any) {
      next(
        new ErrorHandler(
          error.response?.data?.message || error.message,
          error.status
        )
      );
    }
  }

  static async GetAllMeetingRegistrants(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const token = req.headers.access_token as string;
      let zoom = zoomBuilder(token);
      let {
        meetingId,
        occurrence_id,
        status,
        page_size,
        page_number,
        next_page_token,
      } = req.query;

      let query = qs.stringify({
        occurrence_id,
        status,
        page_size,
        page_number,
        next_page_token,
      });

      let response = await zoom.get(
        `/meetings/${meetingId}/registrants?${query}`
      );

      res.status(200).json({
        success: true,
        message: "Meeting registrants",
        data: response.data,
      });
    } catch (error: any) {
      next(
        new ErrorHandler(
          error.response?.data?.message || error.message,
          error.status
        )
      );
    }
  }

  static async GetAllMeetingTempalates(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const token = req.headers.access_token as string;
      let zoom = zoomBuilder(token);
      let { userId } = req.query;

      let response = await zoom.get(`/users/${userId}/meeting_templates`);

      res.status(200).json({
        success: true,
        message: "Meeting templates",
        data: response.data,
      });
    } catch (error: any) {
      next(
        new ErrorHandler(
          error.response?.data?.message || error.message,
          error.status
        )
      );
    }
  }

  static async GetAllMeetingPastMeetings(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const token = req.headers.access_token as string;
      let zoom = zoomBuilder(token);
      let { meetingId } = req.query;

      let response = await zoom.get(`/past_meetings/${meetingId}/instances`);

      res.status(200).json({
        success: true,
        message: "O'tkazib yuborilgan meetinglar",
        data: response.data,
      });
    } catch (error: any) {
      next(
        new ErrorHandler(
          error.response?.data?.message || error.message,
          error.status
        )
      );
    }
  }

  static async GetMeetingAllQA(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const token = req.headers.access_token as string;
      let zoom = zoomBuilder(token);
      let { meetingId } = req.query;

      let response = await zoom.get(`/past_meetings/${meetingId}/qa`);

      res.status(200).json({
        success: true,
        message: "query & answers",
        data: response.data,
      });
    } catch (error: any) {
      next(
        new ErrorHandler(
          error.response?.data?.message || error.message,
          error.status
        )
      );
    }
  }

  static async GetMeetingRegistrantQuestions(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const token = req.headers.access_token as string;
      let zoom = zoomBuilder(token);
      let { meetingId } = req.query;

      let response = await zoom.get(
        `/meetings/${meetingId}/registrants/questions`
      );

      res.status(200).json({
        success: true,
        message: "Registrant questions",
        data: response.data,
      });
    } catch (error: any) {
      next(
        new ErrorHandler(
          error.response?.data?.message || error.message,
          error.status
        )
      );
    }
  }

  static async GetUpcomingMeetings(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const token = req.headers.access_token as string;
      let zoom = zoomBuilder(token);
      let { userId } = req.query;

      let user = userId || "me";
      let response = await zoom.get(`/users/${user}/upcoming_meetings`);

      res.status(200).json({
        success: true,
        message: "Upcoming meetings",
        data: response.data,
      });
    } catch (error: any) {
      next(
        new ErrorHandler(
          error.response?.data?.message || error.message,
          error.status
        )
      );
    }
  }

  static async CreateMeeting(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.access_token as string;
      const zoom = zoomBuilder(token);
      const { userId, ...body } = req.body;

      let response = await zoom.post(`/users/${userId}/meetings`, body);

      res.status(200).json({
        success: true,
        message: "Meeting yaratildi",
        data: response.data,
      });
    } catch (error: any) {
      next(
        new ErrorHandler(
          error.response?.data?.message || error.message,
          error.response?.status || error.status
        )
      );
    }
  }

  static async CreateTemplateFromMeeting(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const token = req.headers.access_token as string;
      const zoom = zoomBuilder(token);
      const { userId, ...body } = req.body;

      let response = await zoom.post(
        `/users/${userId}/meeting_templates`,
        body
      );

      res.status(200).json({
        success: true,
        message: "Meeting template created successfully",
        data: response.data,
      });
    } catch (error: any) {
      next(
        new ErrorHandler(
          error.response?.data?.message || error.message,
          error.response?.status || 500
        )
      );
    }
  }

  static async CreateMeetingInviteLinks(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const token = req.headers.access_token as string;
      const zoom = zoomBuilder(token);
      const { meetingId, ...body } = req.body;

      let response = await zoom.post(
        `/meetings/${meetingId}/invite_links`,
        body
      );

      res.status(200).json({
        success: true,
        message: "Meeting invite links created successfully",
        data: response.data,
      });
    } catch (error: any) {
      next(
        new ErrorHandler(
          error.response?.data?.message || error.message,
          error.response?.status || 500
        )
      );
    }
  }

  static async UpdateMeetingStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const token = req.headers.access_token as string;
      const zoom = zoomBuilder(token);
      const { meetingId, ...body } = req.body;

      let response = await zoom.put(`/meetings/${meetingId}/status`, body);

      res.status(200).json({
        success: true,
        message: "Meeting status updated successfully",
        data: response.data,
      });
    } catch (error: any) {
      next(
        new ErrorHandler(
          error.response?.data?.message || error.message,
          error.response?.status || error.status
        )
      );
    }
  }

  static async UpdateMeeting(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.access_token as string;
      const zoom = zoomBuilder(token);
      const { meetingId, ...body } = req.body;

      let response = await zoom.patch(`/meetings/${meetingId}`, body);

      res.status(200).json({
        success: true,
        message: "Meeting updated successfully",
        data: response.data,
      });
    } catch (error: any) {
      next(
        new ErrorHandler(
          error.response?.data?.message || error.message,
          error.response?.status || 500
        )
      );
    }
  }

  static async DeleteMeeting(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.access_token as string; // OAuth token
      const zoom = zoomBuilder(token);
      const { meetingId, occurrence_id, cancel_meeting_reminder, schedule_for_reminder } = req.body;

      const response = await zoom.delete(`/meetings/${meetingId}`, {
        params: {
          occurrence_id,
          cancel_meeting_reminder,
          schedule_for_reminder,
        },
      });

      res.status(200).json({
        success: true,
        message: `Meeting with ID ${meetingId} deleted successfully`,
        data: response.data,
      });
    } catch (error: any) {
      next(
        new ErrorHandler(
          error.response?.data?.message || error.message,
          error.response?.status || 500
        )
      );
    }
  }

}
