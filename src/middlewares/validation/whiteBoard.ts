import Joi from "joi";

export const getAllWhiteboardsDto = Joi.object({
  search_key: Joi.string().optional(),
  user_id: Joi.string().optional(),
  date_filter_type: Joi.string()
    .valid("created_date", "modified_date")
    .default("modified_date")
    .optional(),
  from: Joi.string().isoDate().optional(),
  to: Joi.string().isoDate().optional(),
  page_size: Joi.number().integer().min(1).max(50).default(10).optional(),
  next_page_token: Joi.string().optional(),
});

export const getAllWhiteboardSessionsDto = Joi.object({
  from: Joi.string().isoDate().optional(),
  to: Joi.string().isoDate().optional(),
  page_size: Joi.number().integer().min(1).max(300).default(30).optional(),
  next_page_token: Joi.string().optional(),
});

export const getWhiteboardSessionByIdDto = Joi.object({
  sessionId: Joi.string().required(),
  page_size: Joi.number().integer().min(1).max(300).default(30).optional(),
  next_page_token: Joi.string().optional(),
});

export const downloadWhiteBoardExportDto = Joi.object({
  taskId: Joi.string().required()
});


export const createWhiteBoardDto = Joi.object({
    name: Joi.string().required()
});

export const getWhiteBoardByIdDto = Joi.object({
  whiteboardId: Joi.string().required()
});

export const getWhiteBoardExportGenerationStatusDto = Joi.object({
  taskId: Joi.string().required()
});

export const updateWhiteboardDto = Joi.object({
  whiteboardId: Joi.string().required(),
  name: Joi.string().min(1).max(255).required(),
  locked: Joi.boolean().default(false),
});

export const updateWhiteboardShareSettingsDto = Joi.object({
  whiteboardId: Joi.string().required(),
  share_link_setting: Joi.object({
    share_scope: Joi.number()
      .valid(0, 1, 2, 3)
      .required(),
    share_role: Joi.number()
      .valid(2, 3, 4)
      .when('share_scope', { is: Joi.valid(1, 2), then: Joi.required() }),
  }).required(),
});

export const deleteWhiteboardDto = Joi.object({
  whiteboardId: Joi.string().required(),
});