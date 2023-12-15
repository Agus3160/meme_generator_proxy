import { Request, Response, urlencoded } from "express"
import dotenv from 'dotenv'
dotenv.config()

interface Meme {
    id: string;
    name: string;
    url: string;
    width: number;
    height: number;
    box_count: number;
}

interface ApiResponse {
    success: boolean;
    data: {
        memes: Meme[];
    };
}

interface CreatedMeme{
    success: boolean;
    data?:{
        url: string;
    }
    error_message?: string;
}

export interface MemeBodyRequest{
    template_id: string;
    username: string;
    password: string;
    boxes: {
        text: string;
    }[]
}

const parseJSONToURLEncoded = (data: MemeBodyRequest) => {
    const urlEncodedParams = new URLSearchParams()
    urlEncodedParams.append('template_id', data.template_id)
    urlEncodedParams.append('username', data.username)
    urlEncodedParams.append('password', data.password)
    data.boxes.forEach((box, index) => {
        urlEncodedParams.append(`boxes[${index}][text]`, box.text)
    })
    return urlEncodedParams
}


const getMemeTemplates = async (_req: Request, res: Response) => {
    const response = await fetch('https://api.imgflip.com/get_memes', {
        method: 'GET',
    })

    if(!response.ok) {
        res.sendStatus(500)
        return
    }

    const data: ApiResponse = await response.json()

    res.status(200)
    res.json(data.data.memes)
    
}

const generateMeme = async (req: Request, res: Response) => {
    try{

        if(!req.body) {
            res.sendStatus(400)
            return
        }
    
        //Store and add the credentials
        const requestInfo: MemeBodyRequest = req.body
        requestInfo.username = process.env.IMGFLIP_USERNAME!
        requestInfo.password = process.env.IMGFLIP_PASSWORD!
    
        //Create and Load Data into a URL Encoded Params
        const urlEncodedParams = parseJSONToURLEncoded(requestInfo)
    
        const response = await fetch('https://api.imgflip.com/caption_image', {
            method: 'POST',
            body: urlEncodedParams.toString(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    
        if(!response.ok) {
            throw new Error("The meme wasn't generated")
        }
    
        const data: CreatedMeme = await response.json()
        res.status(200)
        res.json({url: data.data?.url})

    }catch(err) {
        res.sendStatus(500)
    }
    
}

export {getMemeTemplates, generateMeme}