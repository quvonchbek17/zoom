import Joi from "joi";

export const getAllMeetingsDto = Joi.object().keys({
  userId: Joi.string().required(),
  type: Joi.string()
    .valid(
      "scheduled",
      "live",
      "upcoming",
      "upcoming_meetings",
      "previous_meetings"
    )
    .optional(),
  page_size: Joi.number().optional(),
  page_number: Joi.number().optional(),
  from: Joi.string().optional(),
  to: Joi.string().optional(),
  timezone: Joi.string().optional(),
});

export const getMeetingByIdDto = Joi.object().keys({
  meetingId: Joi.number().required(),
  occurrence_id: Joi.number().optional(),
  show_previous_occurrences: Joi.boolean().optional(),
});

export const getAllRegistrantsDto = Joi.object().keys({
  meetingId: Joi.number().required(),
  occurrence_id: Joi.number().optional(),
  status: Joi.string().valid("pending", "approved", "denied").optional(),
  page_size: Joi.number().optional(),
  page_number: Joi.number().optional(),
  next_page_token: Joi.string().optional(),
});

export const getAllTemplatesDto = Joi.object().keys({
  userId: Joi.string().required(),
});

export const getAllPastMeetingInstances = Joi.object().keys({
  meetingId: Joi.string().required(),
});

export const getAllMeetingQADto = Joi.object().keys({
  meetingId: Joi.string().required(),
});

export const getAllRegistrantsQuestionsDto = Joi.object().keys({
  meetingId: Joi.string().required(),
});

export const getUpcomingMeetingsDto = Joi.object().keys({
  userId: Joi.string().required(),
});

export const createMeetingDto = Joi.object({
  userId: Joi.string().required(),
  topic: Joi.string().required(),
  type: Joi.number().integer().min(1).max(3).required(),
  start_time: Joi.date().iso().optional(),
  duration: Joi.number().integer().optional(),
  schedule_for: Joi.string().optional(),
  timezone: Joi.string().optional(),
  password: Joi.string().optional(),
  agenda: Joi.string().optional(),
  recurrence: Joi.object({
    type: Joi.number().integer().min(1).max(3).optional(),
    repeat_interval: Joi.number().integer().optional(),
    weekly_days: Joi.string().optional(),
    monthly_day: Joi.number().integer().optional(),
    monthly_week: Joi.number().integer().optional(),
    monthly_week_day: Joi.number().integer().optional(),
    end_times: Joi.number().integer().optional(),
    end_date_time: Joi.date().iso().optional(),
  }).optional(),
  settings: Joi.object({
    host_video: Joi.boolean().optional(),
    participant_video: Joi.boolean().optional(),
    cn_meeting: Joi.boolean().optional(),
    in_meeting: Joi.boolean().optional(),
    join_before_host: Joi.boolean().optional(),
    mute_upon_entry: Joi.boolean().optional(),
    watermark: Joi.boolean().optional(),
    use_pmi: Joi.boolean().optional(),
    approval_type: Joi.number().integer().min(0).max(2).optional(),
    registration_type: Joi.number().integer().min(1).max(3).optional(),
    audio: Joi.string().valid("both", "telephony", "voip").optional(),
    auto_recording: Joi.string().valid("local", "cloud", "none").optional(),
    alternative_hosts: Joi.string().optional(),
    waiting_room: Joi.boolean().optional(),
  }).optional(),
});

export const createTemplateFromMeetingDto = Joi.object({
  userId: Joi.string().required(),
  meeting_id: Joi.number().required(),
  name: Joi.string().required(),
  save_recurrence: Joi.boolean().default(false),
  overwrite: Joi.boolean().default(false),
});

export const createMeetingInviteLinksDto = Joi.object({
  meetingId: Joi.number().required(),
  attendees: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().max(64).required(),
        ttl: Joi.number().min(0).max(7776000).default(7200),
      })
    )
    .min(1)
    .max(500)
    .required(),
});

export const updateMeetingStatusDto = Joi.object({
  meetingId: Joi.number().required(),
  action: Joi.string().valid("end", "recover").required(),
});

export const updateMeetingDto = Joi.object({
  meetingId: Joi.number().required(),
  topic: Joi.string().optional(),
  type: Joi.number().valid(1, 2, 3, 8).optional(),
  start_time: Joi.date().optional(),
  duration: Joi.number().optional(),
  password: Joi.string().optional(),
  agenda: Joi.string().optional(),
  recurrence: Joi.object({
    type: Joi.number().valid(1, 2, 3).optional(),
    repeat_interval: Joi.number().optional(),
    weekly_days: Joi.string().optional(),
    monthly_day: Joi.number().optional(),
    end_date_time: Joi.date().optional(),
  }).optional(),
  settings: Joi.object({
    host_video: Joi.boolean().optional(),
    participant_video: Joi.boolean().optional(),
    join_before_host: Joi.boolean().optional(),
    mute_upon_entry: Joi.boolean().optional(),
    auto_recording: Joi.string().valid("local", "cloud", "none").optional(),
  }).optional(),
});

export const inMeetingControlDto = Joi.object({
  meetingId: Joi.number().required(),
  method: Joi.string()
    .valid(
      "recording.start",
      "recording.stop",
      "recording.pause",
      "recording.resume",
      "participant.invite",
      "participant.invite.callout",
      "participant.invite.room_system_callout"
    )
    .required(),
  invitee_name: Joi.when("method", {
    is: "participant.invite.callout",
    then: Joi.string().required().label("invitee_name is required for callout"),
    otherwise: Joi.forbidden(),
  }),
  params: Joi.object({
    contacts: Joi.array()
      .items(
        Joi.object({
          email: Joi.string().email().optional(),
          id: Joi.string().optional(),
        })
      )
      .optional(),
    invite_options: Joi.object({
      require_greeting: Joi.boolean().optional(),
      require_pressing_one: Joi.boolean().optional(),
      call_type: Joi.string().valid("h323", "sip").optional(),
      device_ip: Joi.string().optional(),
    }).optional(),
    h323_headers: Joi.object({
      from_display_name: Joi.string().max(64).optional(),
      to_display_name: Joi.string().max(64).optional(),
    }).optional(),
    sip_headers: Joi.object({
      from_display_name: Joi.string().max(64).optional(),
      to_display_name: Joi.string().max(64).optional(),
      from_uri: Joi.string().max(256).optional(),
    }).optional(),
    additional_headers: Joi.array()
      .items(
        Joi.object({
          key: Joi.string().max(32).optional(),
          value: Joi.string().max(256).optional(),
        })
      )
      .optional(),
  }).optional(),
});

export const deleteMeetingDto = Joi.object({
  meetingId: Joi.number().required(),
  occurrence_id: Joi.string().optional(),
  cancel_meeting_reminder: Joi.boolean().optional(),
  schedule_for_reminder: Joi.boolean().optional()
});


