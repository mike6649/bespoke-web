import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./form.css";
import { Sale, Salesperson } from '../models';
import { SalespersonApiFp } from '../apis/salesperson-api';

type Props = {
    person?: Salesperson | null,
    show: boolean,
    onChangeShow: (show: boolean) => void
}

export default class UpdateSalesperson extends React.Component<Props> {

    state = {
        id: this.props.person?.id,
        firstname: this.props.person?.firstname,
        lastname: this.props.person?.lastname,
        address: this.props.person?.address,
        phone: this.props.person?.phone,
        begin_date: this.props.person?.begin_date,
        end_date: this.props.person?.end_date,
        manager: this.props.person?.manager
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
            submission[f] = this.state[f] ?? this.props.person![f];
        }
        console.log(submission);
        SalespersonApiFp().updateSalesPerson(submission as Salesperson).then(
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
                        <Modal.Title>Edit Salesperson</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div>
                                First Name <input
                                    name='firstname'
                                    placeholder='First Name'
                                    defaultValue={this.props.person?.firstname}
                                    value={this.state.firstname}
                                    onChange={this.handleChange}
                                />
                                Last Name <input
                                    name='lastname'
                                    placeholder='Last Name'
                                    defaultValue={this.props.person?.lastname}
                                    onChange={this.handleChange}
                                />
                                Address <input
                                    name='address'
                                    placeholder='Address'
                                    defaultValue={this.props.person?.address}
                                    onChange={this.handleChange}
                                />
                                Phone <input
                                    name='phone'
                                    placeholder='Phone'
                                    defaultValue={this.props.person?.phone}
                                    onChange={this.handleChange}
                                />
                                Begin Date <input
                                    name='begin_date'
                                    placeholder='1970-01-01'
                                    defaultValue={this.props.person?.begin_date}
                                    onChange={this.handleChange}
                                />
                                End Date <input
                                    name='end_date'
                                    placeholder='1970-01-01'
                                    defaultValue={this.props.person?.end_date ?? ""}
                                    onChange={this.handleChange}
                                />
                                Manager <input
                                    name='manager'
                                    placeholder='Manager'
                                    defaultValue={this.props.person?.manager}
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