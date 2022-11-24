import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./form.css";
import { Sale } from '../models';
import Autocomplete from './autocomplete';
import errorhandler from '../errorhandler';
import { ProductApiFp, SaleApiFp, CustomerApiFp, SalespersonApiFp } from '../api';

type Props = {
    show: boolean,
    onChangeShow: (show: boolean) => void
}

export default class CreateSale extends React.Component<Props> {


    state = {
        sale_date: "",
        quantity: "1",
        products: new Map(),
        customers: new Map(),
        salespersons: new Map(),
        productInput: "",
        customerInput: "",
        salespersonInput: ""
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
        submission.product_id = this.state.products.get(this.state.productInput);
        submission.customer_id = this.state.customers.get(this.state.customerInput);
        submission.salesperson_id = this.state.salespersons.get(this.state.salespersonInput);
        submission.quantity = parseInt(this.state.quantity);
        submission.sale_date = this.state.sale_date;

        SaleApiFp().createSale(submission as Sale).then(
            req => {
                req().then(
                    res => {
                        console.log(res.data);
                        this.handleClose();
                    }
                ).catch(errorhandler);
            }
        )
    }

    onEnter = () => {
        CustomerApiFp().getCustomers().then(
            req => {
                req().then(
                    res => {
                        const persons = res.data;
                        // build a mapping from Firstname lastname to ID
                        const map = new Map(
                            persons.map(o => {
                                return [`${o.firstname} ${o.lastname}`, o.id]
                            })
                        );
                        this.setState({ customers: map });
                    }
                )
            }
        );

        ProductApiFp().getProducts().then(
            req => {
                req().then(
                    res => {
                        const map = new Map(
                            res.data.map(o => {
                                return [`${o.manufacturer?.toUpperCase()} ${o.name}`, o.id]
                            })
                        );
                        this.setState({ products: map });
                    }
                )
            }
        );

        SalespersonApiFp().getSalespersons().then(
            req => {
                req().then(
                    res => {
                        const map = new Map(
                            res.data.map(o => {
                                return [`${o.firstname} ${o.lastname}`, o.id]
                            })
                        );
                        this.setState({ salespersons: map });
                    }
                )
            }
        );
    }

    handleProductInputChange = (s: string) => {
        this.setState({ productInput: s });
    }

    handleCustomerInputChange = (s: string) => {
        this.setState({ customerInput: s });
    }

    handleSalespersonInputChange = (s: string) => {
        this.setState({ salespersonInput: s });
    }

    render() {
        return (
            <>
                <Modal show={this.props.show} onHide={this.handleClose} onEntered={this.onEnter}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Sale</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div>
                                <div>
                                    Product <Autocomplete suggestions={Array.from(this.state.products.keys())}
                                        userInput={this.state.productInput}
                                        setUserInput={this.handleProductInputChange} />
                                </div>
                                <div>
                                    Customer <Autocomplete suggestions={Array.from(this.state.customers.keys())}
                                        userInput={this.state.customerInput}
                                        setUserInput={this.handleCustomerInputChange} />
                                </div>
                                <div>
                                    Product <Autocomplete suggestions={Array.from(this.state.salespersons.keys())}
                                        userInput={this.state.salespersonInput}
                                        setUserInput={this.handleSalespersonInputChange} />
                                </div>
                                <div>
                                    Sale Date <input
                                        name='sale_date'
                                        placeholder='1970-01-01'
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div>
                                    Quantity <input
                                        name='quantity'
                                        defaultValue='1'
                                        placeholder='1'
                                        onChange={this.handleChange}
                                    />
                                </div>
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