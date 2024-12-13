import axios from '@/lib/axios';

const configData = {
    headers: {
        'content-type': 'multipart/form-data',
    }
}

export function creatPostRequestWithFileUpload(url:string, data: FormData) {
    return axios.post(url, data, configData);
}

export function creactPostRequest(url:string, data: FormData) {
    return axios.post(url, data);
}

// update
export const updateRequest = (url: string, data={}) => {
    return axios.patch(url, data);
}

// delete
export const deleteRecordRequest = (url: string) => {
    return axios.delete(url);
}

// get record
export function getDataRequest(url: string){
    return axios.get(url);
}