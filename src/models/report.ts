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
import { ReportSale } from './report-sale';
import { Salesperson } from './salesperson';
/**
 * 
 * @export
 * @interface Report
 */
export interface Report {
    /**
     * 
     * @type {Salesperson}
     * @memberof Report
     */
    salesperson?: Salesperson;
    /**
     * 
     * @type {string}
     * @memberof Report
     */
    year?: string;
    /**
     * 
     * @type {string}
     * @memberof Report
     */
    quarter?: string;
    /**
     * 
     * @type {Array<ReportSale>}
     * @memberof Report
     */
    sales?: Array<ReportSale>;
    /**
     * 
     * @type {string}
     * @memberof Report
     */
    total_sales?: string;
    /**
     * 
     * @type {string}
     * @memberof Report
     */
    total_commission?: string;
}
