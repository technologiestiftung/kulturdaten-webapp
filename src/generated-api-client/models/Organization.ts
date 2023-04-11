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
 * @interface Organization
 */
export interface Organization {
    /**
     * 
     * @type {string}
     * @memberof Organization
     */
    identifier: string;
    /**
     * 
     * @type {string}
     * @memberof Organization
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof Organization
     */
    description?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Organization
     */
    createdAt?: string;
    /**
     * 
     * @type {string}
     * @memberof Organization
     */
    updatedAt?: string;
}

/**
 * Check if a given object implements the Organization interface.
 */
export function instanceOfOrganization(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "identifier" in value;
    isInstance = isInstance && "name" in value;

    return isInstance;
}

export function OrganizationFromJSON(json: any): Organization {
    return OrganizationFromJSONTyped(json, false);
}

export function OrganizationFromJSONTyped(json: any, ignoreDiscriminator: boolean): Organization {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'identifier': json['identifier'],
        'name': json['name'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'createdAt': !exists(json, 'createdAt') ? undefined : json['createdAt'],
        'updatedAt': !exists(json, 'updatedAt') ? undefined : json['updatedAt'],
    };
}

export function OrganizationToJSON(value?: Organization | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'identifier': value.identifier,
        'name': value.name,
        'description': value.description,
        'createdAt': value.createdAt,
        'updatedAt': value.updatedAt,
    };
}

