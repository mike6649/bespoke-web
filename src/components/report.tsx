import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Report, ReportSale, Salesperson } from '../models';
import { SalespersonApiFp } from '../api';
import errorhandler from '../errorhandler';
import { useParams } from 'react-router';
import "../pages/index.css";

export default function ReportComponent() {
    let { id } = useParams();

    const [year, setYear] = useState("2022");
    const [quarter, setQuarter] = useState("1");
    const [person, setPerson] = useState<Salesperson | undefined>(undefined);
    const [report, setReport] = useState<Report | undefined>(undefined);

    useEffect(() => {
        // do prep work
        SalespersonApiFp().getSalespersonById(id!).then(
            req => {
                req().then(
                    res => {
                        setPerson(res.data);
                    }
                ).catch(errorhandler);
            }
        )
    }, [id]);

    const query = () => {
        SalespersonApiFp().quarterlyReport(id!.toString(), year, quarter.toString()).then(
            req => {
                req().then(
                    res => {
                        console.log(res.data);
                        setReport(res.data);
                    }
                ).catch(errorhandler);
            }
        )
    }

    const onYearChange = (e: any) => {
        setYear(e.target.value);
    }

    const onQuarterChange = (e: any) => {
        setQuarter(e.target.value);
    }

    const renderReport = () => {
        if (report === undefined) {
            return (<div></div>)
        } else {
            return (
                <div>
                    <h1>{report.year} Q{report.quarter}</h1>
                    Total Commission: ${report.total_commission} Total Sales: ${report.total_sales}
                    <table>
                        <thead>
                            <tr className="header">
                                <th>Sale Date</th>
                                <th>Product</th>
                                <th>Customer</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Commission %</th>
                                <th>Commission</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                report.sales!
                                    .map((sale: ReportSale) =>
                                        <tr key={sale.id}>
                                            <th>{sale.sale_date}</th>
                                            <th>{sale.product?.manufacturer?.toUpperCase()} {sale.product?.name}</th>
                                            <th>{sale.customer?.firstname} {sale.customer?.lastname}</th>
                                            <th>{sale.quantity}</th>
                                            <th>${sale.unit_price}</th>
                                            <th>{sale.commission_pct}</th>
                                            <th>${sale.commission}</th>
                                        </tr>
                                    )
                            }
                        </tbody>
                    </table>
                </div>
            )
        }
    }

    return (
        <>
            <div className="report center">
                <h1>Report for {person?.firstname} {person?.lastname}</h1>
                <form>
                    <div>
                        Year <input value={year} onChange={onYearChange} />
                    </div>
                    <div>
                        Quarter <input value={quarter} onChange={onQuarterChange} />
                    </div>
                    <button onClick={(e) => { e.preventDefault(); query(); }}>Search</button>
                </form>
                {renderReport()}
            </div>
        </>
    );

}