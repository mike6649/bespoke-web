import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./form.css";
import { Product } from '../models';
import { ProductApiFp } from '../apis/product-api';
import errorhandler from '../errorhandler';

type Props = {
    show: boolean,
    onChangeShow: (show: boolean) => void
}

export default class CreateProduct extends React.Component<Props> {

    state = {
        name: "",
        manufacturer: "",
        style: "",
        purchase_price: "",
        sale_price: "",
        quantity: "",
        commission_pct: ""
    }


    handleClose = () => this.props.onChangeShow(false);
    handleShow = () => this.props.onChangeShow(true);
    handleChange = (event: any) => {
        let a: any = {};
        a[event.target.name] = event.target.value;
        this.setState(a);
    }

    handleSubmit = () => {

        let f: keyof typeof this.state;
        let submission: { [k: string]: any } = {};
        for (f in this.state) {
            submission[f] = this.state[f];
        }
        (submission as Product).quantity = parseInt(submission.quantity ?? "0");

        ProductApiFp().updateProduct(submission as Product).then(
            req => {
                req().then(
                    res => {
                        if (res.status >= 200 && res.status < 300) {
                            this.handleClose();
                        } else {
                            alert(res.data);
                        }
                    }
                ).catch(errorhandler);
            }
        )
    }

    render() {
        return (
            <>
                <Modal show={this.props.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div>
                                <div>
                                    Name <input
                                        name='name'
                                        placeholder='Name'
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div>
                                    Manufacturer <input
                                        name='manufacturer'
                                        placeholder='Manufacturer'
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div>
                                    Style <input
                                        name='style'
                                        placeholder='Style'
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div>
                                    Purchase Price <input
                                        name='purchase_price'
                                        type="number"
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div>
                                    Sale Price <input
                                        name='sale_price'
                                        placeholder='234.56'
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div>
                                    Quantity <input
                                        name='quantity'
                                        type="number"
                                        placeholder='100'
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div>
                                    Commission % <input
                                        name='commission_pct'
                                        placeholder='12.34'
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