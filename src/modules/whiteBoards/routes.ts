import { Router } from "express";
import { WhiteboardsController } from "./whiteBoards";
import { createWhiteBoardDto, deleteWhiteboardDto, downloadWhiteBoardExportDto, getAllWhiteboardsDto, getAllWhiteboardSessionsDto, getWhiteBoardByIdDto, getWhiteBoardExportGenerationStatusDto, getWhiteboardSessionByIdDto, updateWhiteboardDto, updateWhiteboardShareSettingsDto, validate } from "@middlewares";

const WhiteBoardsRouter = Router()

WhiteBoardsRouter
    .get('/all', validate(getAllWhiteboardsDto, "query"),WhiteboardsController.GetAllWhiteboards)
    .get('/all-sessions', validate(getAllWhiteboardSessionsDto, "query"),WhiteboardsController.GetAllWhiteboardSessions)
    .get('/session-by-id', validate(getWhiteboardSessionByIdDto, "query"),WhiteboardsController.GetWhiteboardSessionById)
    .get('/get-by-id', validate(getWhiteBoardByIdDto, "query"),WhiteboardsController.GetWhiteboardById)
    .get('/whiteboard-export-generation-status', validate(getWhiteBoardExportGenerationStatusDto, "query"),WhiteboardsController.GetWhiteboardExportGenerationStatus)
    .get('/download', validate(downloadWhiteBoardExportDto, "query"), WhiteboardsController.DownloadWhiteboardExport)
    .post('/create', validate(createWhiteBoardDto),WhiteboardsController.CreateWhiteBoard)
    .post('/create-whiteboard-export',WhiteboardsController.CreateWhiteboardsExport)
    .put('/update', validate(updateWhiteboardDto),WhiteboardsController.UpdateWhiteboard)
    .patch('/update-whiteboard-share-settings', validate(updateWhiteboardShareSettingsDto), WhiteboardsController.UpdateWhiteboardShareSettings)
    .delete('/delete', validate(deleteWhiteboardDto), WhiteboardsController.DeleteWhiteboard)

export { WhiteBoardsRouter }