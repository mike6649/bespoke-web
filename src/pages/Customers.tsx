import "./index.css";
import React from "react";
import { CustomerApiFp } from '../apis/customer-api';
import { Customer } from "../models";
import UpdateCustomer from "../components/updatecustomer";
import CreateCustomer from "../components/createcustomer";
import * as FaIcons from "react-icons/fa";
import * as GrIcons from "react-icons/gr";


export default class Customers extends React.Component {
  state = {
    persons: [],
    showModal: false,
    showCreateModal: false,
    activePerson: null
  }

  loadData() {
    CustomerApiFp().getCustomers().then(
      req => {
        req().then(
          res => {
            const persons = res.data;
            persons.sort((a, b) => ((a?.id ?? 0) - (b?.id ?? 0)));
            console.log(persons);
            this.setState({ persons: persons });
          }
        )
      }
    );
  }
  componentDidMount() {
    this.loadData();
  }

  updateCustomer = (person: Customer) => {
    this.setState({ showModal: true, activePerson: person });
  }

  createSalesperson = () => {
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
      <div className="customers center">
        <h1>Customers</h1>
        <table>
          <thead>
            <tr className="header">
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Begin Date</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.persons
                .map((person: Customer) =>
                  <tr key={person.id}>
                    <th>{person.id}</th>
                    <th>{person.firstname}</th>
                    <th>{person.lastname}</th>
                    <th>{person.address}</th>
                    <th>{person.phone}</th>
                    <th>{person.begin_date}</th>
                    <th><FaIcons.FaRegEdit onClick={() => { this.updateCustomer(person); }} /></th>
                  </tr>
                )
            }
          </tbody>
        </table>
        Add Customer <GrIcons.GrAddCircle  onClick= {() => {this.createSalesperson();}}/>
        <UpdateCustomer
          person={this.state.activePerson}
          show={this.state.showModal}
          onChangeShow={this.handleModalChange}
        />
        <CreateCustomer show={this.state.showCreateModal}
        onChangeShow={this.handleCreateModalChange}
        />
      </div>
    );
  }
}
