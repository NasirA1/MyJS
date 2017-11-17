import React, { Component } from 'react';
import * as Services from '../Api';


class Browse extends Component {
    
      constructor(props) {
        super(props);
        this.state = { contacts: [], loading: false };
        this.handleFilter = this.handleFilter.bind(this);
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

      handleFilter(event) {
        const id = event.target.id;
        const value = event.target.value;
        return this.onFilter(id, value);
      }

      onFilter(id, value, fnShowPredicate) {
        [...document.getElementsByClassName('st-row')].forEach(row => {
          [...row.getElementsByTagName('td')].some(cell => {
            if (cell.className === 'td-' + id) {
              let showCell = false;
              if(fnShowPredicate) 
                showCell = fnShowPredicate(value, cell.textContent);
              else 
                showCell = cell.textContent.startsWith(value);
              if (showCell) {
                row.style.display = 'table-row';
                return true;                
              }
              else {
                row.style.display = 'none';
                return true;                
              }
            }
            return false;
          })
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
          <div className="simple-table">
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
              <tr className="filter-row">
			          <td><input id="id" className="filter-input" type="text" onChange={this.handleFilter} /></td>
			          <td><input id="firstName" className="filter-input" type="text" onChange={this.handleFilter} /></td>
                <td><input id="lastName" className="filter-input" type="text" onChange={this.handleFilter} /></td>
                <td><input id="email" className="filter-input" type="text" onChange={this.handleFilter} /></td>
                <td><input id="phone" className="filter-input" type="text" onChange={this.handleFilter} /></td>
                <td><input id="address" className="filter-input" type="text" 
                  onChange={(event) => { 
                    this.onFilter(event.target.id, event.target.value, (needle, haystack) => {
                      return haystack.includes(needle);
                    }); 
                  }} 
                /></td>
		          </tr>                
                {this.state.contacts.map( (row, i) => {
                  return (
                  <tr className="st-row" key={i}>
                    <td className="td-id" data-label='ID'>{ row.id }</td>
                    <td className="td-firstName" data-label='First Name'>{ row.firstName }</td>
                    <td className="td-lastName" data-label='Last Name'>{ row.lastName }</td>
                    <td className="td-email" data-label='Email'><a href={`mailto:${row.email}`}>{ row.email }</a></td>
                    <td className="td-phone" data-label='Phone'>{ row.phone }</td>
                    <td className="td-address" data-label='Address'>{ row.address }</td>
                  </tr>);
                })}                
              </tbody>
            </table>
          </div>
        );
      }
    }
    

    export default Browse;