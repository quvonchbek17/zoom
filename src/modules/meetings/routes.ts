import { Router } from "express";
import { MeetingsController} from "./meetings";
import { createMeetingDto, createMeetingInviteLinksDto, createTemplateFromMeetingDto, deleteMeetingDto, getAllMeetingQADto, getAllRegistrantsQuestionsDto, getUpcomingMeetingsDto, inMeetingControlDto, updateMeetingDto, updateMeetingStatusDto, validate } from "@middlewares";
import { getAllMeetingsDto, getAllPastMeetingInstances, getAllRegistrantsDto, getAllTemplatesDto, getMeetingByIdDto } from "@middlewares";

const MeetingsRouter = Router()

MeetingsRouter
    .get('/all', validate(getAllMeetingsDto, "query"), MeetingsController.GetAllMeetings)
    .get('/get-by-id', validate(getMeetingByIdDto, "query"), MeetingsController.GetMeetingById)
    .get('/all-registrants', validate(getAllRegistrantsDto, "query"), MeetingsController.GetAllMeetingRegistrants)
    .get('/all-templates', validate(getAllTemplatesDto, "query"), MeetingsController.GetAllMeetingTempalates)
    .get('/all-past-meetings', validate(getAllPastMeetingInstances, "query"), MeetingsController.GetAllMeetingPastMeetings)
    .get('/all-meeting-qa', validate(getAllMeetingQADto, "query"), MeetingsController.GetMeetingAllQA)
    .get('/registrants-questions', validate(getAllRegistrantsQuestionsDto, "query"), MeetingsController.GetMeetingRegistrantQuestions)
    .get('/upcoming-meetings', validate(getUpcomingMeetingsDto, "query"), MeetingsController.GetUpcomingMeetings)


    .post('/create-meeting', validate(createMeetingDto), MeetingsController.CreateMeeting)
    .post('/create-template-from-meeting', validate(createTemplateFromMeetingDto), MeetingsController.CreateTemplateFromMeeting)
    .post('/create-meeting-invite-links', validate(createMeetingInviteLinksDto), MeetingsController.CreateMeetingInviteLinks)


    .put('/update-meeting', validate(updateMeetingDto),
    MeetingsController.UpdateMeeting)
    .put('/update-meeting-status', validate(updateMeetingStatusDto),
    MeetingsController.UpdateMeetingStatus)

    .delete('/delete-meeting', validate(deleteMeetingDto), MeetingsController.DeleteMeeting)

export { MeetingsRouter }