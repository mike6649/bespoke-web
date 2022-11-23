import "./index.css";
import React from "react";
import { SaleApiFp } from '../apis/sale-api';
import { Sale, DetailedSale } from "../models";
import CreateSale from "../components/createsale";
import * as GrIcons from "react-icons/gr";


export default class Sales extends React.Component {
  state = {
    sales: [],
    showCreateModal: false,
  }

  loadData() {
    SaleApiFp().getSales().then(
      req => {
        req().then(
          res => {
            const sales = res.data;
            sales.sort((a, b) => (Date.parse(a?.sale_date ?? "2000-01-01") - Date.parse(b?.sale_date ?? "2000-01-01")));
            this.setState({ sales: sales });
          }
        )
      }
    );
  }
  componentDidMount() {
    this.loadData();
  }

  createSale = () => {
    this.setState({ showCreateModal: true });
  }

  handleModalChange = (show: boolean) => {
    this.setState({ showModal: show });
    if (!show) {
      this.loadData();
    }
  }

  handleCreateModalChange = (show: boolean) => {
    this.setState({ showCreateModal: show });
    if (!show) {
      this.loadData();
    }
  }

  render() {
    return (
      <div className="sales center">
        <h1>Sales</h1>
        <table>
          <thead>
            <tr className="header">
              <th>Sale Date</th>
              <th>Product</th>
              <th>Customer</th>
              <th>Salesperson</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.sales
                .map((sale: DetailedSale) =>
                  <tr key={sale.id}>
                    <th>{sale.sale_date}</th>
                    <th>{sale.product?.manufacturer?.toUpperCase()} {sale.product?.name}</th>
                    <th>{sale.customer?.firstname} {sale.customer?.lastname}</th>
                    <th>{sale.salesperson?.firstname} {sale.salesperson?.lastname}</th>
                    <th>{sale.quantity}</th>
                  </tr>
                )
            }
          </tbody>
        </table>
        Create Sale <GrIcons.GrAddCircle onClick={() => { this.createSale(); }} />
        <CreateSale show={this.state.showCreateModal}
          onChangeShow={this.handleCreateModalChange}
        />
      </div>
    );
  }
}
