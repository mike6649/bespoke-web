import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./form.css";
import { Customer } from '../models';
import { CustomerApiFp } from '../apis/customer-api';

type Props = {
    show: boolean,
    onChangeShow: (show: boolean) => void
}

export default class CreateCustomer extends React.Component<Props> {

    state = {
        firstname: "",
        lastname: "",
        address: "",
        phone: "",
        begin_date: ""
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
        console.log(submission);
        CustomerApiFp().updateCustomer(submission as Customer).then(
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

    render() {
        return (
            <>
                <Modal show={this.props.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Salesperson</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div>
                                First Name <input
                                    name='firstname'
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