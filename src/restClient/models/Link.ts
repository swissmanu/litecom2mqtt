/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Link = {
    /**
     * Link structure for API navigation (HATEOAS).
     */
    rel: string;
    /**
     * The uri path to the resource/operation.
     */
    href: string;
    /**
     * The type of action this link will perform as an HTTP verb.
     */
    method?: Link.method;
};
export namespace Link {
    /**
     * The type of action this link will perform as an HTTP verb.
     */
    export enum method {
        GET = 'GET',
        POST = 'POST',
        PUT = 'PUT',
        PATCH = 'PATCH',
        DELETE = 'DELETE',
    }
}

