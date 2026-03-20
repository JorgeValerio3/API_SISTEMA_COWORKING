import error from "../middlewares/error.js";
import mSpaces from "../models/mSpaces.js";
import type { Request, Response } from "express";

import redisClient from "../config/redis.js";

const cSpaces = {
    getSpaces: async (request: Request, response: Response) => {
        try {
            // Try to fetch from cache
            try {
                if (redisClient.isOpen) {
                    const cachedSpaces = await redisClient.get('spaces:all');
                    if (cachedSpaces) {
                        response.json({
                            message: "Consulta Realizada con Exito (Cache)",
                            spaces: JSON.parse(cachedSpaces)
                        });
                        return;
                    }
                }
            } catch (cacheError) {
                console.error("Redis Cache Error:", cacheError);
            }

            const spaces = await mSpaces.getSpaces();

            // Cache the result
            try {
                if (redisClient.isOpen) {
                    await redisClient.setEx('spaces:all', 3600, JSON.stringify(spaces));
                }
            } catch (cacheError) {
                console.error("Redis Cache Error:", cacheError);
            }

            response.json({
                message: "Consulta Realizada con Exito",
                spaces
            });
        } catch (err) {
            error.e500(request, response, err);
        }
    },
    getSpace: async (request: Request, response: Response) => {
        try {
            const id = Number(request.params.id);
            const space = await mSpaces.getSpace(id);
            response.json({
                message: "Consulta Realizada con Exito",
                space
            });
        } catch (err) {
            error.e500(request, response, err);
        }
    },
    getSpacesperType: async (request: Request, response: Response) => {
        try {
            const id = Number(request.params.id);
            const spaces = await mSpaces.getSpacesperType(id);
            response.json({
                message: "Consulta Realizada con Exito",
                spaces
            });
        } catch (err) {
            error.e500(request, response, err);
        }
    },
    getSpacesCapacity: async (request: Request, response: Response) => {
        try {
            const id = Number(request.params.id);
            const spaces = await mSpaces.getSpacesCapacity(id);
            response.json({
                message: "Consulta Realizada con Exito",
                spaces
            });
        } catch (err) {
            error.e500(request, response, err);
        }
    },
    getSpacesperLocation: async (request: Request, response: Response) => {
        try {
            const id = Number(request.params.id);
            const spaces = await mSpaces.getSpacesperLocation(id);
            response.json({
                message: "Consulta Realizada con Exito",
                spaces
            });
        } catch (err) {
            error.e500(request, response, err);
        }
    },
    getSpaceAvailable: async (request: Request, response: Response) => {
        try {
            const { timeDate, timeFrom, until } = request.body;
            const spaces = await mSpaces.getSpaceAvailable({ timeDate, timeFrom, until });
            response.json({
                message: "Consulta Realizada con Exito",
                spaces
            });
        } catch (err) {
            error.e500(request, response, err);
        }
    }
}

export default cSpaces;