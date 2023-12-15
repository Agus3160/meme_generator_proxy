import express from "express"
import { getMemeTemplates, generateMeme } from "../controlles/memeController"
const route = express.Router()

route.get('/', getMemeTemplates)
route.post('/', generateMeme)

export default route