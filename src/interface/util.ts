import { Request } from "express";

interface ISong {
    id: string;
    title: {
        en: string;
        ko?: undefined;
        "zh-Hant"?: undefined;
        "zh-Hans"?: undefined;
        ja?: undefined;
        kr?: undefined;
    };
    artist: string;
}

interface ISongRequest extends Request {
    song?: ISong
}

export { ISong, ISongRequest }