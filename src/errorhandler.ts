import {AxiosError} from 'axios';

type ErrResponse = {
    err: string  
}

export default function errorhandler(e: AxiosError) {
    if (e.response) {
        alert(`${e.response.status}: ${(e.response.data as ErrResponse).err}`);
    } else {
        alert(e);
    }
}
