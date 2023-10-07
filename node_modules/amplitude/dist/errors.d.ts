import { AxiosError } from 'axios';
import { AmplitudeResponseBody } from './responses';
export declare class AmplitudeErrorResponse extends Error {
    readonly status: number;
    private data;
    constructor(err: AxiosError);
}
export declare const axiosErrorCatcher: (reqPromise: Promise<AmplitudeResponseBody>) => Promise<AmplitudeResponseBody>;
