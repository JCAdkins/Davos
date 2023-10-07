export interface AmplitudeTrackResponse {
    code: number;
    server_upload_time: number;
    payload_size_bytes: number;
    events_ingested: number;
}
export declare type AmplitudeIdentifyResponse = string;
export interface AmplitudeUserSearchMatch {
    amplitude_id: number;
    user_id: string;
    last_seen?: string;
}
export interface AmplitudeUserSearchResponse {
    matches: Array<AmplitudeUserSearchMatch>;
    type: string;
}
export interface AmplitudeUserActivityResponse {
    userData: {
        [key: string]: any;
    };
    events: Array<{
        [key: string]: any;
    }>;
}
export declare type AmplitudeResponseBody = AmplitudeTrackResponse | AmplitudeIdentifyResponse | AmplitudeUserSearchResponse | AmplitudeUserActivityResponse;
