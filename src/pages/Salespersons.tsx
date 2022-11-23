import "./index.css";
import React from "react";
import { SalespersonApiFp } from '../apis/salesperson-api';
import { Salesperson } from "../models";
import UpdateSalesperson from "../components/updatesalesperson";
import CreateSalesperson from "../components/createsalesperson";
import * as FaIcons from "react-icons/fa";
import * as GrIcons from "react-icons/gr";


export default class Salespersons extends React.Component {
  state = {
    persons: [],
    showModal: false,
    showCreateModal: false,
    activePerson: null
  }

  loadData() {
    SalespersonApiFp().getSalespersons().then(
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

  updateSalesperson = (person: Salesperson) => {
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
      <div className="salespersons center">
        <h1>Salespersons</h1>
        <table>
          <thead>
            <tr className="header">
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Begin Date</th>
              <th>End Date</th>
              <th>Manager</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.persons
                .map((person: Salesperson) =>
                  <tr key={person.id}>
                    <th>{person.id}</th>
                    <th>{person.firstname}</th>
                    <th>{person.lastname}</th>
                    <th>{person.address}</th>
                    <th>{person.phone}</th>
                    <th>{person.begin_date}</th>
                    <th>{person.end_date}</th>
                    <th>{person.manager}</th>
                    <th><FaIcons.FaRegEdit onClick={() => { this.updateSalesperson(person); }} /></th>
                  </tr>
                )
            }
          </tbody>
        </table>
        Add Salesperson <GrIcons.GrAddCircle  onClick= {() => {this.createSalesperson();}}/>
        <UpdateSalesperson
          person={this.state.activePerson}
          show={this.state.showModal}
          onChangeShow={this.handleModalChange}
        />
        <CreateSalesperson show={this.state.showCreateModal}
        onChangeShow={this.handleCreateModalChange}
        />
      </div>
    );
  }
}
