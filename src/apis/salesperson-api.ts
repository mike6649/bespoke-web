/* tslint:disable */
/* eslint-disable */
/**
 * Bespoked Bikes - API
 * BeSpoked Bikes is looking to create a sales tracking application.  BeSpoked is a high-end bicycle shop and each salesperson gets a commission for each bike they sell.  They are introducing a new quarterly bonus based on sales as an incentive.
 *
 * OpenAPI spec version: 1.0.11
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import globalAxios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
import { Salesperson } from '../models';
/**
 * SalespersonApi - axios parameter creator
 * @export
 */
export const SalespersonApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Get salesperson by ID
         * @param {string} id Salesperson ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getSalespersonById: async (id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling getSalespersonById.');
            }
            const localVarPath = `/salesperson/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Get list of salespersons
         * @summary Get list of salespersons
         * @param {string} [firstname] First Name
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getSalespersons: async (firstname?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/salespersons`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (firstname !== undefined) {
                localVarQueryParameter['firstname'] = firstname;
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Update or create salesperson
         * @param {Salesperson} [body] salesperson object
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateSalesPerson: async (body?: Salesperson, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/salesperson`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers!['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * SalespersonApi - functional programming interface
 * @export
 */
export const SalespersonApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Get salesperson by ID
         * @param {string} id Salesperson ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getSalespersonById(id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<Salesperson>>> {
            const localVarAxiosArgs = await SalespersonApiAxiosParamCreator(configuration).getSalespersonById(id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Get list of salespersons
         * @summary Get list of salespersons
         * @param {string} [firstname] First Name
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getSalespersons(firstname?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<Array<Salesperson>>>> {
            const localVarAxiosArgs = await SalespersonApiAxiosParamCreator(configuration).getSalespersons(firstname, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary Update or create salesperson
         * @param {Salesperson} [body] salesperson object
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateSalesPerson(body?: Salesperson, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<Salesperson>>> {
            const localVarAxiosArgs = await SalespersonApiAxiosParamCreator(configuration).updateSalesPerson(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * SalespersonApi - factory interface
 * @export
 */
export const SalespersonApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @summary Get salesperson by ID
         * @param {string} id Salesperson ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getSalespersonById(id: string, options?: AxiosRequestConfig): Promise<AxiosResponse<Salesperson>> {
            return SalespersonApiFp(configuration).getSalespersonById(id, options).then((request) => request(axios, basePath));
        },
        /**
         * Get list of salespersons
         * @summary Get list of salespersons
         * @param {string} [firstname] First Name
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getSalespersons(firstname?: string, options?: AxiosRequestConfig): Promise<AxiosResponse<Array<Salesperson>>> {
            return SalespersonApiFp(configuration).getSalespersons(firstname, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Update or create salesperson
         * @param {Salesperson} [body] salesperson object
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateSalesPerson(body?: Salesperson, options?: AxiosRequestConfig): Promise<AxiosResponse<Salesperson>> {
            return SalespersonApiFp(configuration).updateSalesPerson(body, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * SalespersonApi - object-oriented interface
 * @export
 * @class SalespersonApi
 * @extends {BaseAPI}
 */
export class SalespersonApi extends BaseAPI {
    /**
     * 
     * @summary Get salesperson by ID
     * @param {string} id Salesperson ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SalespersonApi
     */
    public async getSalespersonById(id: string, options?: AxiosRequestConfig) : Promise<AxiosResponse<Salesperson>> {
        return SalespersonApiFp(this.configuration).getSalespersonById(id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Get list of salespersons
     * @summary Get list of salespersons
     * @param {string} [firstname] First Name
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SalespersonApi
     */
    public async getSalespersons(firstname?: string, options?: AxiosRequestConfig) : Promise<AxiosResponse<Array<Salesperson>>> {
        return SalespersonApiFp(this.configuration).getSalespersons(firstname, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary Update or create salesperson
     * @param {Salesperson} [body] salesperson object
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SalespersonApi
     */
    public async updateSalesPerson(body?: Salesperson, options?: AxiosRequestConfig) : Promise<AxiosResponse<Salesperson>> {
        return SalespersonApiFp(this.configuration).updateSalesPerson(body, options).then((request) => request(this.axios, this.basePath));
    }
}
