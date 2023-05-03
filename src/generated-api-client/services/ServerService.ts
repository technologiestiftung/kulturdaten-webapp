/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ServerService {

    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getHealth(): CancelablePromise<{
        healthy?: boolean;
        dependencies?: Array<{
            name?: string;
            healthy?: boolean;
        }>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/health',
        });
    }

}
