/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthService {

    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postAuthToken(
        requestBody?: {
            password?: string;
            email?: string;
        },
    ): CancelablePromise<{
        accessToken?: string;
        expiresIn?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/token',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
