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
            Cell: props => <span style={{float: 'right', marginRight: '1em'}}>{props.value}</span>,
            sortMethod: (a, b, desc) => parseInt(a, 10) > parseInt(b, 10)? 1: parseInt(a, 10) < parseInt(b, 10)? -1: 0
          },
          {Header: 'First Name', minWidth: 150, accessor: 'firstName'},
          {Header: 'Last Name', minWidth: 150, accessor: 'lastName'},
          {Header: 'Email', minWidth: 200, accessor: 'email'},
          {Header: 'Phone', minWidth: 150, accessor: 'phone'},
          {Header: 'Address', minWidth: 300, accessor: 'address'}
        ];
        return (
          <div>
            <ReactTable
              style={{background: 'white'}}
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