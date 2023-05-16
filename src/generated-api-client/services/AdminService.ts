/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AdminService {

    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postAdminHarvestBaeventsBezirkskalender(): CancelablePromise<{
        createsOrganizations?: Array<string>;
        alreadyExistsOrganizationIDs?: Array<string>;
        createdLocations?: Array<string>;
        createdEvents?: Array<string>;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/harvest/baevents-bezirkskalender',
        });
    }

}
