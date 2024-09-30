import Joi from "joi";

export const getAllChannelsDto = Joi.object({
  userId: Joi.string().required(),
  page_size: Joi.number().integer().min(1).max(1000).optional().default(10),
  next_page_token: Joi.string().optional(),
});

export const getChannelByIdDto = Joi.object({
  userId: Joi.string().required(),
  channelId: Joi.string().required(),
});

export const getAllChannelMembersDto = Joi.object({
  channelId: Joi.string().required(),
});

export const createChannelDto = Joi.object({
  userId: Joi.string().required(),
  name: Joi.string().max(128).required(),
  type: Joi.number().valid(1, 2, 3, 4).required(),
  members: Joi.array()
    .items(
      Joi.object({
        email: Joi.string().email().required(),
      })
    )
    .max(20)
    .required(),
  channel_settings: Joi.object({
    add_member_permissions: Joi.number().valid(1, 2).default(1),
    new_members_can_see_previous_messages_files: Joi.boolean().default(true),
    posting_permissions: Joi.number().valid(1, 2, 3).default(1),
    mention_all_permissions: Joi.number().valid(1, 2, 3).default(1),
  }).required(),
});

export const joinChannelDto = Joi.object({
  channelId: Joi.string().required(),
});

export const inviteMembersToChannelDto = Joi.object({
  channelId: Joi.string().required(),
  members: Joi.array()
    .items(
      Joi.object({
        email: Joi.string().email().required(),
      })
    )
    .max(5)
    .required(),
});

export const updateChannelDto = Joi.object({
  channelId: Joi.string().required(),
  name: Joi.string().optional(),
  type: Joi.number().valid(1, 2, 3, 4).optional(),
  members: Joi.array()
    .items(
      Joi.object({
        email: Joi.string().email().required(),
      })
    )
    .optional(),
  channel_settings: Joi.object({
    add_member_permissions: Joi.number().valid(1, 2).optional(),
    new_members_can_see_previous_messages_files: Joi.boolean().optional(),
    posting_permissions: Joi.number().valid(1, 2, 3).optional(),
    mention_all_permissions: Joi.number().valid(1, 2, 3).optional(),
  }).optional(),
});

export const performChannelOperationsDto = Joi.object({
  method: Joi.string().valid("archive", "unarchive").required(),
  channel_ids: Joi.array()
    .items(Joi.string())
    .min(1)
    .max(10)
    .required()
});
