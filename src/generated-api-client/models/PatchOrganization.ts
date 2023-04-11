/* tslint:disable */
/* eslint-disable */
/**
 * API Kulturdaten.Berlin
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface PatchOrganization
 */
export interface PatchOrganization {
    /**
     * 
     * @type {string}
     * @memberof PatchOrganization
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof PatchOrganization
     */
    description?: string;
}

/**
 * Check if a given object implements the PatchOrganization interface.
 */
export function instanceOfPatchOrganization(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PatchOrganizationFromJSON(json: any): PatchOrganization {
    return PatchOrganizationFromJSONTyped(json, false);
}

export function PatchOrganizationFromJSONTyped(json: any, ignoreDiscriminator: boolean): PatchOrganization {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': !exists(json, 'name') ? undefined : json['name'],
        'description': !exists(json, 'description') ? undefined : json['description'],
    };
}

export function PatchOrganizationToJSON(value?: PatchOrganization | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'description': value.description,
    };
}

