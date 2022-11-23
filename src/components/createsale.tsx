import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./form.css";
import { Sale } from '../models';
import { SaleApiFp } from '../apis/sale-api';
import { CustomerApiFp } from '../apis/customer-api';
import Autocomplete from './autocomplete';

type Props = {
    show: boolean,
    onChangeShow: (show: boolean) => void
}

export default class CreateSale extends React.Component<Props> {

    state = {
        product_id: 0,
        customer_id: 0,
        salesperson_id: 0,
        sale_date: "",
        quantity: 0,
        products: [],
        customers: [],
        salespersons: []
    }

    handleClose = () => this.props.onChangeShow(false);
    handleShow = () => this.props.onChangeShow(true);
    handleChange = (event: any) => {
        let a: any = {};
        a[event.target.name] = event.target.value;
        this.setState(a);
    }

    handleSubmit = () => {

        let submission: { [k: string]: any } = {};
        submission.product_id = this.state.product_id;
        submission.customer_id = this.state.customer_id;
        submission.salesperson_id = this.state.salesperson_id;
        submission.quantity = this.state.quantity;
        submission.sale_date = this.state.sale_date;

        console.log(submission);
        SaleApiFp().createSale(submission as Sale).then(
            req => {
                req().then(
                    res => {
                        console.log(res.data);
                        this.handleClose();
                    }
                )
            }
        )
    }

    onEnter = () => {
        console.log("Hello");
        CustomerApiFp().getCustomers().then(
            req => {
              req().then(
                res => {
                  const persons = res.data;
                  persons.sort((a, b) => ((a?.id ?? 0) - (b?.id ?? 0)));
                  this.setState({ customers: persons });
                }
              )
            }
          );
    }

    render() {
        return (
            <>
                <Modal show={this.props.show} onHide={this.handleClose} onEntered={this.onEnter}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Salesperson</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                        {/* <Autocomplete suggestions={["Oranges", "Apples", "Banana", "Kiwi", "Mango"]}/> */}
                        </div>
                        <form>
                            <div>
                                Product <input
                                    name='product'
                                    placeholder='First Name'
                                    onChange={this.handleChange}
                                />
                                Last Name <input
                                    name='lastname'
                                    placeholder='Last Name'
                                    onChange={this.handleChange}
                                />
                                Address <input
                                    name='address'
                                    placeholder='Address'
                                    onChange={this.handleChange}
                                />
                                Phone <input
                                    name='phone'
                                    placeholder='Phone'
                                    onChange={this.handleChange}
                                />
                                Begin Date <input
                                    name='begin_date'
                                    placeholder='1970-01-01'
                                    onChange={this.handleChange}
                                />
                            </div>
                        </form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={this.handleSubmit}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}