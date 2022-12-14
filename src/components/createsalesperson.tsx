import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./form.css";
import { Salesperson } from '../models';
import { SalespersonApiFp } from '../apis/salesperson-api';
import errorhandler from '../errorhandler';

type Props = {
    show: boolean,
    onChangeShow: (show: boolean) => void
}

export default class CreateSalesperson extends React.Component<Props> {

    state = {
        firstname: "",
        lastname: "",
        address: "",
        phone: "",
        begin_date: "",
        end_date: "",
        manager: ""
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
        SalespersonApiFp().updateSalesPerson(submission as Salesperson).then(
            req => {
                req().then(
                    res => {
                        this.handleClose();
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
                        <Modal.Title>Create Salesperson</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div>
                                <div>
                                    First Name <input
                                        name='firstname'
                                        placeholder='First Name'
                                        value={this.state.firstname}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div>
                                    Last Name <input
                                        name='lastname'
                                        placeholder='Last Name'
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div>
                                    Address <input
                                        name='address'
                                        placeholder='Address'
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div>
                                    Phone <input
                                        name='phone'
                                        placeholder='Phone'
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div>
                                    Begin Date <input
                                        name='begin_date'
                                        placeholder='1970-01-01'
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div>
                                    End Date <input
                                        name='end_date'
                                        placeholder='1970-01-01'
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div>
                                    Manager <input
                                        name='manager'
                                        placeholder='Manager'
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
