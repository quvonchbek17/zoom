import { Router } from "express";
import { ChannelsController } from "./channels";
import {  createChannelDto, getAllChannelMembersDto, getAllChannelsDto, getChannelByIdDto, inviteMembersToChannelDto, joinChannelDto, performChannelOperationsDto, updateChannelDto, validate } from "@middlewares";

const ChannelsRouter = Router()

ChannelsRouter
    .get("/all", validate(getAllChannelsDto,"query"), ChannelsController.GetAllChannels)
    .get("/get-by-id", validate(getChannelByIdDto,"query"), ChannelsController.GetChannelById)
    .get("/all-channel-members", validate(getAllChannelMembersDto,"query"), ChannelsController.GetAllChannelMembers)
    .post("/create", validate(createChannelDto), ChannelsController.CreateChannel)
    .post("/join-channel", validate(joinChannelDto), ChannelsController.JoinChannel)
    .post("/invite-members-to-channel", validate(inviteMembersToChannelDto), ChannelsController.InviteMembersToChannel)
    .patch("/update", validate(updateChannelDto), ChannelsController.UpdateChannel)
    .patch("/perform-operations", validate(performChannelOperationsDto), ChannelsController.PerformChannelOperations)



export { ChannelsRouter }