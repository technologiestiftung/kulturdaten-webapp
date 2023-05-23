/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Auth } from '../models/Auth';
import type { Login } from '../models/Login';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthService {

    /**
     * @param requestBody
     * @returns Auth OK
     * @throws ApiError
     */
    public static postAuthToken(
        requestBody?: Login,
    ): CancelablePromise<Auth> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/token',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
