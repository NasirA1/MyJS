import React, { Component } from 'react';
import * as Services from '../Api';


class Browse extends Component {
    
      constructor(props) {
        super(props);
        this.state = { contacts: [], loading: false };
      }

      componentWillMount() {
        this.fetchData();
      }

      fetchData() {
        this.setState({loading: true});
        Services.getAllContacts()
          .then(res => {
            this.setState({
              contacts: res.data.Items,
              loading: false
            });
          })
          .catch(err => {
            //TODO display error alert
            console.error(err);
            this.setState({
              loading: false
            });                
          });
      }
    
      render() {
        const columns = [
          {Header: 'ID', accessor: 'id'},
          {Header: 'First Name', accessor: 'firstName'},
          {Header: 'Last Name', accessor: 'lastName'},
          {Header: 'Email', accessor: 'email'},
          {Header: 'Phone', accessor: 'phone'},
          {Header: 'Address', accessor: 'address'}
        ];
                
        return (
          <div style={{ borderRadius: '5px', border: '1px none', padding: '5px', backgroundColor: 'white' }}>
            <table>
              {/* <caption>All Records</caption> */}
              <thead>
                <tr key={-1}> 
                {columns.map( (col, i) => {
                  return (<th scope='col' key={i}>{col.Header}</th>);
                })}
                </tr>
              </thead>
              <tbody>
                {this.state.contacts.map( (row, i) => {
                  return (
                  <tr key={i}>
                    <td data-label='ID'>{ row.id }</td>
                    <td data-label='First Name'>{ row.firstName }</td>
                    <td data-label='Last Name'>{ row.lastName }</td>
                    <td data-label='Email'><a href={`mailto:${row.email}`}>{ row.email }</a></td>
                    <td data-label='Phone'>{ row.phone }</td>
                    <td data-label='Address'>{ row.address }</td>
                  </tr>);
                })}                
              </tbody>
            </table>
          </div>
        );
      }
    }
    

    export default Browse;