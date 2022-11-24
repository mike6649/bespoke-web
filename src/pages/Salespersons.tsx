import "./index.css";
import React from "react";
import { SalespersonApiFp } from '../apis/salesperson-api';
import { Salesperson } from "../models";
import UpdateSalesperson from "../components/updatesalesperson";
import CreateSalesperson from "../components/createsalesperson";
import * as FaIcons from "react-icons/fa";
import * as TbIcons from "react-icons/tb";
import * as GrIcons from "react-icons/gr";
import { NavigateFunction, Navigation, useNavigate } from "react-router-dom";

export default function Salespersons (){
  const navigation = useNavigate();
  
   return <SalespersonsClass navigation={navigation} /> //pass to your component.
  
    }

class SalespersonsClass extends React.Component<{navigation: NavigateFunction}> {
  state = {
    persons: [],
    showModal: false,
    showCreateModal: false,
    activePerson: null,
  }

  loadData() {
    SalespersonApiFp().getSalespersons().then(
      req => {
        req().then(
          res => {
            const persons = res.data;
            persons.sort((a, b) => ((a?.id ?? 0) - (b?.id ?? 0)));
            this.setState({ persons: persons });
          }
        ).catch(errorhandler);
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
    this.setState({ showCreateModal: true });
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

  handleReportModalChange = (show: boolean) => {
    this.setState({ showReportModal: show });
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
              <th>Report</th>
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
                    <th><TbIcons.TbFileReport onClick={() => { this.props.navigation(`/reports/${person.id}`) }} /></th>
                  </tr>
                )
            }
          </tbody>
        </table>
        Add Salesperson <GrIcons.GrAddCircle onClick={() => { this.createSalesperson(); }} />
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
