import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./form.css";
import { Product } from '../models';
import { ProductApiFp } from '../apis/product-api';
import errorhandler from '../errorhandler';

type Props = {
    product?: Product | null,
    show: boolean,
    onChangeShow: (show: boolean) => void
}

export default class UpdateProduct extends React.Component<Props> {

    state = {
        id: this.props.product?.id,
        name: this.props.product?.name,
        manufacturer: this.props.product?.manufacturer,
        style: this.props.product?.style,
        purchase_price: this.props.product?.purchase_price,
        sale_price: this.props.product?.sale_price,
        quantity: this.props.product?.quantity,
        commission_pct: this.props.product?.commission_pct
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
            submission[f] = this.state[f] ?? this.props.product![f];
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
                        <Modal.Title>Edit Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div>
                                <div>
                                    Name <input
                                        name='name'
                                        placeholder='Name'
                                        defaultValue={this.props.product?.name}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div>
                                    Manufacturer <input
                                        name='manufacturer'
                                        placeholder='Manufacturer'
                                        defaultValue={this.props.product?.manufacturer}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div>
                                    Style <input
                                        name='style'
                                        placeholder='Style'
                                        defaultValue={this.props.product?.style}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div>
                                    Purchase Price <input
                                        name='purchase_price'
                                        placeholder='123.45'
                                        defaultValue={this.props.product?.purchase_price}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div>
                                    Sale Price <input
                                        name='sale_price'
                                        placeholder='234.56'
                                        defaultValue={this.props.product?.sale_price}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div>
                                    Quantity <input
                                        name='quantity'
                                        type="number"
                                        placeholder='100'
                                        defaultValue={this.props.product?.quantity}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div>
                                    Commission % <input
                                        name='commission_pct'
                                        placeholder='12.34'
                                        defaultValue={this.props.product?.commission_pct}
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