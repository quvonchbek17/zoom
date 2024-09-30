import { Request, Response, NextFunction } from "express";
import { zoomBuilder } from "@config";
import { ErrorHandler } from "@errors";
import * as qs from "qs"

class WhiteboardsController {
  static async GetAllWhiteboards(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const token = req.headers.access_token as string;
      const zoom = zoomBuilder(token);

      const {
        search_key,
        user_id,
        date_filter_type,
        from,
        to,
        page_size,
        next_page_token,
      } = req.query;

      const response = await zoom.get(`/whiteboards`, {
        params: {
          search_key,
          user_id,
          date_filter_type,
          from,
          to,
          page_size,
          next_page_token,
        },
      });

      res.status(200).json({
        success: true,
        message: "Whiteboards retrieved successfully",
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

  static async GetAllWhiteboardSessions(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const token = req.headers.access_token as string;
      const zoom = zoomBuilder(token);

      const {
        from,
        to,
        page_size,
        next_page_token,
      } = req.query;


      const response = await zoom.get(`/whiteboards/sessions`, {
        params: {
          from,
          to,
          page_size,
          next_page_token,
        },
      });

      res.status(200).json({
        success: true,
        message: "Whiteboard sessions retrieved successfully",
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


  static async GetWhiteboardExportGenerationStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const token = req.headers.access_token as string;
      const zoom = zoomBuilder(token);

      const { taskId } = req.query;


      const response = await zoom.get(`/whiteboards/export/task/${taskId}/status`);

      res.status(200).json({
        success: true,
        message: "Whiteboard sessions retrieved successfully",
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

  static async GetWhiteboardSessionById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const token = req.headers.access_token as string;
      const zoom = zoomBuilder(token);

      const {
        sessionId,
        page_size,
        next_page_token,
      } = req.query;

      const response = await zoom.get(`/whiteboards/sessions/${sessionId}`, {
        params: {
          page_size,
          next_page_token,
        },
      });

      res.status(200).json({
        success: true,
        message: "Whiteboard session retrieved successfully",
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

  static async DownloadWhiteboardExport(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const token = req.headers.access_token as string;
      const zoom = zoomBuilder(token);

      const { taskId } = req.query;

      const response = await zoom.get(`/whiteboards/export/task/${taskId}`, {
        responseType: 'stream',
      });

      const contentType = response.headers['content-type'] || 'application/octet-stream';
      const contentDisposition = response.headers['content-disposition'] || `attachment; filename=${taskId}.zip`;
      const contentLength = response.headers['content-length'];

      res.setHeader('Content-Type', contentType);
      res.setHeader('Content-Disposition', contentDisposition);
      if (contentLength) {
        res.setHeader('Content-Length', contentLength);
      }

      response.data.pipe(res);

    } catch (error: any) {
      next(
        new ErrorHandler(
          error.response?.data?.message || error.message,
          error.response?.status || 500
        )
      );
    }
  }

  static async GetWhiteboardById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const token = req.headers.access_token as string;
      const zoom = zoomBuilder(token);

      const { whiteboardId } = req.query;

      const response = await zoom.get(`/whiteboards/${whiteboardId}`);

      res.status(200).json({
        success: true,
        message: "Whiteboard retrieved successfully",
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

  static async CreateWhiteBoard(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const token = req.headers.access_token as string;
      const zoom = zoomBuilder(token);

      const { name } = req.body;

      const response = await zoom.post(`/whiteboards`, { name });

      res.status(200).json({
        success: true,
        message: "Create Whiteboard",
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


  static async CreateWhiteboardsExport(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const token = req.headers.access_token as string;
      const zoom = zoomBuilder(token);

      const { whiteboard_ids } = req.body;

      const response = await zoom.post(`/whiteboards/export`, {
        whiteboard_ids,
      });

      res.status(200).json({
        success: true,
        message: "Whiteboard export initiated successfully",
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

  static async UpdateWhiteboard(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const token = req.headers.access_token as string;
      const zoom = zoomBuilder(token);

      const { whiteboardId, name, locked } = req.body;

      const response = await zoom.put(`/whiteboards/${whiteboardId}`, {
        name,
        locked,
      });

      res.status(200).json({
        success: true,
        message: "Whiteboard metadata updated successfully",
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

  static async UpdateWhiteboardShareSettings(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const token = req.headers.access_token as string;
      const zoom = zoomBuilder(token);

      const { whiteboardId, share_link_setting } = req.body;

      const response = await zoom.patch(`/whiteboards/${whiteboardId}/share_setting`, {
        share_link_setting,
      });

      res.status(200).json({
        success: true,
        message: "Whiteboard share settings updated successfully",
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

  static async DeleteWhiteboard(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const token = req.headers.access_token as string;
      const zoom = zoomBuilder(token);

      const { whiteboardId } = req.body;

      await zoom.delete(`/whiteboards/${whiteboardId}`);

      res.status(200).json({
        success: true,
        message: "Whiteboard deleted successfully",
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

export { WhiteboardsController };
