import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import * as Services from '../Api';



class Browse extends Component {
    
      constructor(props) {
        super(props);
        this.state = { contacts: [], loading: false };
      }
    
      render() {
        const columns = [{
            Header: 'ID', accessor: 'id', minWidth: 50, 
            Cell: row => <span style={{float: 'right', marginRight: '1em'}}>{row.value}</span>,
            sortMethod: (a, b, desc) => parseInt(a, 10) > parseInt(b, 10)? 1: parseInt(a, 10) < parseInt(b, 10)? -1: 0
          },
          {Header: 'First Name', accessor: 'firstName'},
          {Header: 'Last Name', accessor: 'lastName'},
          {
            Header: 'Email', accessor: 'email',
            Cell: row => <a href={`mailto:${row.value}`}>{row.value}</a>,
          },
          {Header: 'Phone', accessor: 'phone'},
          {Header: 'Address', accessor: 'address'}
        ];
        return (
          <div>
            <ReactTable
              className="-striped -highlight"
              data={this.state.contacts} columns={columns}
              defaultPageSize={8}
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