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
/**
 * 
 * @export
 * @interface Customer
 */
export interface Customer {
    /**
     * 
     * @type {number}
     * @memberof Customer
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof Customer
     */
    firstname?: string;
    /**
     * 
     * @type {string}
     * @memberof Customer
     */
    lastname?: string;
    /**
     * 
     * @type {string}
     * @memberof Customer
     */
    address?: string;
    /**
     * 
     * @type {string}
     * @memberof Customer
     */
    phone?: string;
    /**
     * 
     * @type {string}
     * @memberof Customer
     */
    begin_date?: string;
}
