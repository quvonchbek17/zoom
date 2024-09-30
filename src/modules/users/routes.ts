import { Router } from "express";
import { UsersController} from "./users";
import { checkUserEmailDto, checkUserPMRoomDto, createUserAssistantDto, getUserAllAssistantsDto, getUserAllCollabrationDevicesDto, getUserAllMeetingTemplatesDto, getUserAllSchedulersDto, getUserCollabrationDeviceDetailsDto, getUserMeetingTemplateDetailsDto, getUserPermissionsDto, getUserSettingsDto, getUserZAKTokenDto, loginDto, updateUserEmailDto, updateUserPasswordDto, updateUserPresenceStatusDto, updateUserStatusDto, uploadUserPictureDto, uploadVirtualBackgroundDto, validate } from "@middlewares";
import { upload } from "src/config/multer";

const UsersRouter = Router()

UsersRouter
    .get('/settings', validate(getUserSettingsDto, "query"), UsersController.GetUserSettings)
    .get('/user-presence-status', validate(getUserSettingsDto, "query"), UsersController.GetUserPresenceStatus)
    .get('/check-user-pm-room', validate(checkUserPMRoomDto, "query"), UsersController.CheckUserPMRoom)
    .get('/permissions', validate(getUserPermissionsDto, "query"), UsersController.GetUserPermissions)
    .get('/check-email', validate(checkUserEmailDto, "query"), UsersController.CheckUserEmail)
    .get('/user-zak-token', validate(getUserZAKTokenDto, "query"), UsersController.GetUserZAKToken)
    .get('/user-collabration-devices', validate(getUserAllCollabrationDevicesDto, "query"), UsersController.GetUserAllCollabrationDevices)
    .get('/user-collabration-device-details', validate(getUserCollabrationDeviceDetailsDto, "query"), UsersController.GetUserCollabrationDeviceDetail)
    .get('/user-meeting-templates', validate(getUserAllMeetingTemplatesDto, "query"), UsersController.GetUserAllMeetingTemplates)
    .get('/user-schedulers', validate(getUserAllSchedulersDto, "query"), UsersController.GetUserAllSchedulers)


    .post('/create-user-assistant', validate(createUserAssistantDto), UsersController.CreateUserAssistant)
    .post('/upload-profile-picture', validate(uploadUserPictureDto), upload.single("file"), UsersController.UploadUserPicture)
    .post('/upload-virtual-background', validate(uploadVirtualBackgroundDto), upload.single("file"), UsersController.UploadVirtualBackgroundFile)

    .put('/update-user-email', validate(updateUserEmailDto), UsersController.UpdateUserEmail)
    .put('/update-user-password', validate(updateUserPasswordDto), UsersController.UpdateUserPassword)
    .put('/update-user-presence-status', validate(updateUserPresenceStatusDto), UsersController.UpdateUserPresenceStatus)
    .put('/update-user-status', validate(updateUserStatusDto), UsersController.UpdateUserPresenceStatus)

export {UsersRouter}