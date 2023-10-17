/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LicenceInfo } from '../models/LicenceInfo.ts';
import type { CancelablePromise } from '../core/CancelablePromise.ts';
import { OpenAPI } from '../core/OpenAPI.ts';
import { request as __request } from '../core/request.ts';
export class LicenceService {
    /**
     * Returns the status of the _Lighting Control REST API_.
     * @returns LicenceInfo The licence information.
     * @throws ApiError
     */
    public static getLicenceInfo(): CancelablePromise<LicenceInfo> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/',
        });
    }
}
