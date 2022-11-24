import "./index.css";
import React from "react";
import { ProductApiFp } from '../apis/product-api';
import { Product } from "../models";
import UpdateProduct from "../components/updateproduct";
import CreateProduct from "../components/createproduct";
import * as FaIcons from "react-icons/fa";
import * as GrIcons from "react-icons/gr";
import errorhandler from "../errorhandler";


export default class Products extends React.Component {
  state = {
    products: [],
    showModal: false,
    showCreateModal: false,
    activeProduct: null
  }

  loadData() {
    ProductApiFp().getProducts().then(
      req => {
        req().then(
          res => {
            const products = res.data;
            products.sort((a, b) => ((a?.id ?? 0) - (b?.id ?? 0)));
            console.log(products);
            this.setState({ products: products });
          }
        ).catch(errorhandler);
      }
    );
  }
  componentDidMount() {
    this.loadData();
  }

  updateProduct = (product: Product) => {
    this.setState({ showModal: true, activeProduct: product });
  }

  createProduct = () => {
    this.setState({showCreateModal: true});
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
      <div className="products center">
        <h1>Products</h1>
        <table>
          <thead>
            <tr className="header">
              <th>ID</th>
              <th>Name</th>
              <th>Manufacturer</th>
              <th>Style</th>
              <th>Purchase Price</th>
              <th>Sale Price</th>
              <th>Quantity</th>
              <th>Commission %</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.products
                .map((product: Product) =>
                  <tr key={product.id}>
                    <th>{product.id}</th>
                    <th>{product.name}</th>
                    <th>{product.manufacturer}</th>
                    <th>{product.style}</th>
                    <th>{product.purchase_price}</th>
                    <th>{product.sale_price}</th>
                    <th>{product.quantity}</th>
                    <th>{product.commission_pct}</th>
                    <th><FaIcons.FaRegEdit onClick={() => { this.updateProduct(product); }} /></th>
                  </tr>
                )
            }
          </tbody>
        </table>
        Add Product <GrIcons.GrAddCircle  onClick= {() => {this.createProduct();}}/>
        <UpdateProduct
          product={this.state.activeProduct}
          show={this.state.showModal}
          onChangeShow={this.handleModalChange}
        />
        <CreateProduct show={this.state.showCreateModal}
        onChangeShow={this.handleCreateModalChange}
        />
      </div>
    );
  }
}
