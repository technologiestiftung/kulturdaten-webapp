/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type PatchLocation = {
    name?: Record<string, string>;
    description?: Record<string, string>;
    address?: {
        '@type'?: PatchLocation.'@type';
        streetAddress?: string;
        addressLocality?: string;
        postalCode?: string;
        description?: string;
    };
    borough?: PatchLocation.borough;
    contactPoint?: Array<{
        '@type'?: 'ContactPoint';
        name?: Record<string, string>;
        telephone?: string;
        email?: string;
    }>;
    website?: string;
    accessibility?: string;
};

export namespace PatchLocation {

    export enum '@type' {
        POSTAL_ADDRESS = 'PostalAddress',
    }

    export enum borough {
        MITTE = 'Mitte',
        FRIEDRICHSHAIN_KREUZBERG = 'Friedrichshain-Kreuzberg',
        PANKOW = 'Pankow',
        CHARLOTTENBURG_WILMERSDORF = 'Charlottenburg-Wilmersdorf',
        SPANDAU = 'Spandau',
        STEGLITZ_ZEHLENDORF = 'Steglitz-Zehlendorf',
        TEMPELHOF_SCH_NEBERG = 'Tempelhof-Schöneberg',
        NEUK_LLN = 'Neukölln',
        TREPTOW_K_PENICK = 'Treptow-Köpenick',
        MARZAHN_HELLERSDORF = 'Marzahn-Hellersdorf',
        LICHTENBERG = 'Lichtenberg',
        REINICKENDORF = 'Reinickendorf',
        AU_ERHALB = 'außerhalb',
    }


}

