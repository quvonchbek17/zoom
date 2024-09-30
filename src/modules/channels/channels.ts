import { Request, Response, NextFunction } from "express";
import { zoomBuilder } from "@config";
import { ErrorHandler } from "@errors";

class ChannelsController {
  static async GetAllChannels(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.access_token as string;
      const zoom = zoomBuilder(token);

      const { userId, page_size, next_page_token } = req.query;

      const response = await zoom.get(`/chat/users/${userId}/channels`, {
        params: {
          page_size: page_size || 10,
          next_page_token,
        },
      });

      res.status(200).json({
        success: true,
        message: "Chat channels retrieved successfully",
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

  static async GetChannelById(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.access_token as string;
      const zoom = zoomBuilder(token);

      const { userId, channelId } = req.query;

      const response = await zoom.get(`/chat/users/${userId}/channels/${channelId}`);

      res.status(200).json({
        success: true,
        message: "Chat channel retrieved successfully",
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

  static async GetAllChannelMembers(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.access_token as string;
      const zoom = zoomBuilder(token);

      const { channelId } = req.params;

      const response = await zoom.get(`/chat/channels/${channelId}/members`);

      res.status(200).json({
        success: true,
        message: "Channel member groups retrieved successfully",
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

  static async CreateChannel(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.access_token as string;
      const zoom = zoomBuilder(token);

      const { userId, name, type, members, channel_settings } = req.body;

      const response = await zoom.post(`/chat/users/${userId}/channels`, {
        name,
        type,
        members,
        channel_settings,
      });

      res.status(201).json({
        success: true,
        message: "Channel created successfully",
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

  static async JoinChannel(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.access_token as string;
      const zoom = zoomBuilder(token);

      const { channelId } = req.body;

      const response = await zoom.post(`/chat/channels/${channelId}/members/me`)

      res.status(200).json({
        success: true,
        message: "Joined the channel successfully",
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

  static async InviteMembersToChannel(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.access_token as string;
      const { channelId, members } = req.body;

      const zoom = zoomBuilder(token);

      const response = await zoom.post(`/chat/channels/${channelId}/members`, { members });

      res.status(200).json({
        success: true,
        message: "Members invited successfully",
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


  static async UpdateChannel(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.access_token as string;
      const zoom = zoomBuilder(token);

      const { channelId, name, type, members, channel_settings } = req.body;
      const response = await zoom.patch(`/chat/channels/${channelId}`, {
        name,
        type,
        members,
        channel_settings,
      });

      res.status(200).json({
        success: true,
        message: "Channel updated successfully",
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


  static async PerformChannelOperations(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.access_token as string;
      const zoom = zoomBuilder(token);

      const { method, channel_ids } = req.body;
      const response = await zoom.patch(`/chat/channels/events`, {
        method,
        channel_ids,
      });

      res.status(200).json({
        success: true,
        message: "Channel operation performed successfully",
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

export { ChannelsController };
