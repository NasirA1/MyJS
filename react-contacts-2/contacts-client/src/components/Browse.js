import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import * as Services from '../Api';
import { PageHeader } from 'react-bootstrap';



class Browse extends Component {
    
      constructor(props) {
        super(props);
        this.state = { contacts: [], loading: false };
      }
    
      render() {
        const columns = [{
            Header: 'ID', accessor: 'id', minWidth: 30, 
            Cell: props => <span style={{float: 'right', marginRight: '1em'}}>{props.value}</span>,
            sortMethod: (a, b, desc) => parseInt(a, 10) > parseInt(b, 10)? 1: parseInt(a, 10) < parseInt(b, 10)? -1: 0
          },
          {Header: 'First Name', minWidth: 60, accessor: 'firstName'},
          {Header: 'Last Name', minWidth: 60, accessor: 'lastName'},
          {Header: 'Email', minWidth: 60, accessor: 'email'},
          {Header: 'Phone', minWidth: 40, accessor: 'phone'},
          {Header: 'Address', accessor: 'address'}
        ];
        return (
          <div className="container-fluid" style={{marginTop: '5em'}}>
            <ReactTable
              data={this.state.contacts} columns={columns}
              defaultPageSize={10}
              filterable
              loading={this.state.loading}
              onFetchData={(state, instance) => {
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
              }}
            />
          </div>
        );
      }
    }
    

    export default Browse;