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
 * @interface HealthGet200ResponseDependenciesInner
 */
export interface HealthGet200ResponseDependenciesInner {
    /**
     * 
     * @type {string}
     * @memberof HealthGet200ResponseDependenciesInner
     */
    name?: string;
    /**
     * 
     * @type {boolean}
     * @memberof HealthGet200ResponseDependenciesInner
     */
    healthy?: boolean;
}

/**
 * Check if a given object implements the HealthGet200ResponseDependenciesInner interface.
 */
export function instanceOfHealthGet200ResponseDependenciesInner(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function HealthGet200ResponseDependenciesInnerFromJSON(json: any): HealthGet200ResponseDependenciesInner {
    return HealthGet200ResponseDependenciesInnerFromJSONTyped(json, false);
}

export function HealthGet200ResponseDependenciesInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): HealthGet200ResponseDependenciesInner {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': !exists(json, 'name') ? undefined : json['name'],
        'healthy': !exists(json, 'healthy') ? undefined : json['healthy'],
    };
}

export function HealthGet200ResponseDependenciesInnerToJSON(value?: HealthGet200ResponseDependenciesInner | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'healthy': value.healthy,
    };
}

