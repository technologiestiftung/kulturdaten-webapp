/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type User = {
    type?: User.type;
    identifier: string;
    email: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    createdAt?: string;
    updatedAt?: string;
    permissionFlags: number;
};

export namespace User {

    export enum type {
        USER = 'User',
    }


}

