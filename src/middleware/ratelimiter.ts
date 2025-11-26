import type { NextFunction, Request, Response } from "express";
import { config } from "../config/config.ts";

export interface RateLimitData {
    count: number;
    time: number;
}


const limits: Map<string, RateLimitData> = new Map();


const rateLimiter = (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip

    if (!ip) {
        return res.json({message: "No IP address"})
    }

    const now = Date.now()
    
    let limitData = limits.get(ip)

    if (!limitData || (now - limitData.time) > Number(config.WINDOW_SIZE_MS)){
        limitData = { count : 1 , time: now}
        limits.set(ip, limitData)
    } else {
        limitData.count++;
        limits.set(ip, limitData)
    }

    if (limitData.count > Number(config.MAX_REQUEST)) {
        return res.status(429).json({message: "Too many request"})
    }

    next()
}