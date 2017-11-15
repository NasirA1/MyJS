import React, { Component } from 'react';
import * as Services from '../Api';


//TODO make it work!
function handleFilter(id, value) {
  [...document.getElementsByClassName('st-row')].forEach(row => {
    [...row.getElementsByTagName('td')].some(cell => {
      if (cell.className === 'td-' + id) {
        if (!cell.innerHTML.startsWith(value)) {
          row.style.display = 'none';
          return true;
        }
        else {
          row.style.display = 'table-row';
          return true;
        }
      }
    });
  });
}


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
			          <td><input id="id" className="filter-input" type="text" onInput={handleFilter(this.id, this.value)} /></td>
			          <td><input id="firstName" className="filter-input" type="text" onInput={handleFilter(this.id, this.value)} /></td>
                <td><input id="lastName" className="filter-input" type="text" onInput={handleFilter(this.id, this.value)} /></td>
                <td><input id="email" className="filter-input" type="text" onInput={handleFilter(this.id, this.value)} /></td>
                <td><input id="phone" className="filter-input" type="text" onInput={handleFilter(this.id, this.value)} /></td>
                <td><input id="address" className="filter-input" type="text" onInput={handleFilter(this.id, this.value)} /></td>
		          </tr>                
                {this.state.contacts.map( (row, i) => {
                  return (
                  <tr className="st-row" key={i}>
                    <td className="td-id" data-label='ID'>{ row.id }</td>
                    <td className="td-firstName" data-label='First Name'>{ row.firstName }</td>
                    <td className="td-lastName" data-label='Last Name'>{ row.lastName }</td>
                    <td className="td-email" data-label='Email'><a href={`mailto:${row.email}`}>{ row.email }</a></td>
                    <td className="td-phone-" data-label='Phone'>{ row.phone }</td>
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