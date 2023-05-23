/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Location = ({
    context?: Location.context;
    identifier: string;
    created?: string;
    updated?: string;
    kind?: Location.kind;
    url?: string;
    origin?: {
        name?: string;
        originId?: string;
    };
} & {
    type?: Location.type;
    name?: Record<string, string>;
    description?: Record<string, string>;
    address?: {
        type?: Location.type;
        streetAddress?: string;
        addressLocality?: string;
        postalCode?: string;
        description?: string;
    };
    geo?: {
        type?: Location.type;
        latitude?: string;
        longitude?: string;
    };
    borough?: Location.borough;
    contactPoint?: Array<{
        type?: 'ContactPoint';
        name?: Record<string, string>;
        telephone?: string;
        email?: string;
    }>;
    website?: string;
    managedBy?: Record<string, any>;
    accessibility?: string;
    categories?: Array<{
        inDefinedTermSet?: Record<string, any>;
        term?: Record<string, string>;
    }>;
});

export namespace Location {

    export enum context {
        KULTURDATEN_BERLIN_API_V1_SPEC = 'kulturdaten.berlin/api/v1/spec',
    }

    export enum kind {
        CULTURE = 'culture',
    }

    export enum type {
        VIRTUAL_LOCATION = 'VirtualLocation',
        PLACE = 'Place',
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

