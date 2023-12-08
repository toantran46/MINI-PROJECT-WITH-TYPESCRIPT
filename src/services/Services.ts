import axios from "axios";
import { ApiResponse } from "../entities/types";
import { URL_SERVICE } from "../constants/Constants";

export const MovieService = async (searchKey: string, page: number) => {
    const params = {
        s: searchKey,
        page: page,
        apikey: URL_SERVICE.MOVIE.TOKEN
    }
    const res = await axios.get<ApiResponse>(URL_SERVICE.MOVIE.GET, {params})
        .then((res) => res.data)
        .catch((error) => {
            console.log(error);
        })
    
    return res;
    
}

export const MovieDetailService = async (title: string) => {
    const params = {
        t: title,
        apikey: URL_SERVICE.MOVIE.TOKEN
    }
    const res = await axios.get(URL_SERVICE.MOVIE.GET, {params})
        .then((res) => res.data)
        .catch((error) => {
            console.log(error);
        })
    
    return res;
    
}