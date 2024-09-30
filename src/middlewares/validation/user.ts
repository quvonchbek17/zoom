import Joi from "joi";

export const checkUserEmailDto = Joi.object().keys({
    email: Joi.string().required()
});

export const checkUserPMRoomDto = Joi.object().keys({
    vanity_name: Joi.string().required()
});


export const getUserSettingsDto = Joi.object().keys({
    userId: Joi.string().required()
});

export const getUserPermissionsDto = Joi.object().keys({
    userId: Joi.string().required()
});

export const GetUserPresenceStatusDto = Joi.object().keys({
    userId: Joi.string().required()
});

export const getUserZAKTokenDto = Joi.object().keys({
    userId: Joi.string().required()
});

export const getUserAllCollabrationDevicesDto = Joi.object().keys({
    userId: Joi.string().required()
});

export const getUserCollabrationDeviceDetailsDto = Joi.object().keys({
    userId: Joi.string().required(),
    device_id: Joi.string().required(),
});

export const getUserAllMeetingTemplatesDto = Joi.object().keys({
    userId: Joi.string().required()
});

export const getUserMeetingTemplateDetailsDto = Joi.object().keys({
    userId: Joi.string().required(),
    meetingTemplateId: Joi.string().required(),
});

export const getUserAllAssistantsDto = Joi.object().keys({
    userId: Joi.string().required()
});

export const getUserAllSchedulersDto = Joi.object().keys({
    userId: Joi.string().required()
});

export const createUserAssistantDto = Joi.object().keys({
    userId: Joi.string().required()
});

export const uploadUserPictureDto = Joi.object().keys({
    userId: Joi.string().optional(),
    file: Joi.any().optional(),
});

export const uploadVirtualBackgroundDto = Joi.object().keys({
    userId: Joi.string().optional(),
    file: Joi.any().optional(),
});

export const updateUserEmailDto = Joi.object().keys({
    userId: Joi.string().required(),
    email: Joi.string().required(),
});

export const updateUserPasswordDto = Joi.object().keys({
    userId: Joi.string().required(),
    password: Joi.string().required(),
});

export const updateUserPresenceStatusDto = Joi.object().keys({
    userId: Joi.string().required(),
    status: Joi.string().valid("Away", "Available", "In_Calendar_Event", "Presenting", "In_A_Zoom_Meeting", "On_A_Call", "Out_of_Office", "Busy").required(),
    duration: Joi.number().min(1).max(1440).required(),
});

export const updateUserStatusDto = Joi.object().keys({
    userId: Joi.string().required(),
    status: Joi.string().valid("activate", "deactivate", "clock_in", "clock_out").required()
});
