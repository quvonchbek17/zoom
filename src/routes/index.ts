import { verifyAccessToken } from "@middlewares"
import { Router } from "express"
import { UsersRouter, AuthRouter, MeetingsRouter, WhiteBoardsRouter, ChannelsRouter } from "@modules"

const router = Router()

router.use("/auth", AuthRouter)
router.use("/users", verifyAccessToken, UsersRouter)
router.use("/meetings", verifyAccessToken, MeetingsRouter)
router.use("/white-boards", verifyAccessToken, WhiteBoardsRouter)
router.use("/channels", verifyAccessToken, ChannelsRouter)

export default router