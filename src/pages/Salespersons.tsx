import "./index.css";
import React from "react";
import { SalespersonApiFp } from '../apis/salesperson-api';
import { Salesperson } from "../models";


export default class Salespersons extends React.Component {
  state = {
    persons: []
  }

  componentDidMount() {
    SalespersonApiFp().getSalespersons().then(
      req => {
        req().then(
          res => {
            const persons = res.data;
            console.log(persons);
            this.setState({ persons });
          }
        )
      }
    );
  }
  render() {
    return (
      <div className="products">
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
                  </tr>
                )
            }
          </tbody>
        </table>
      </div>
    );
  }
}
