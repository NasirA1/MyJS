import React, { Component } from 'react';
import * as Services from '../Api';
import EditContact from './EditContact';


class Browse extends Component {
    
      constructor(props) {
        super(props);
        this.state = { 
          contacts: [], 
          loading: false, 
          sortToggle: false,
          showEditContact: false,
          currentRowIndex: -1
        };
        this.handleFilter = this.handleFilter.bind(this);
        this.sort = this.sort.bind(this);
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

      onEditContactCancelClick() {
        this.setState({ showEditContact: false });
      }

      onEditContactOKClick(event) {
        event.preventDefault();        
        console.log("we're here!");
        this.setState({ showEditContact: false });        
      }

      handleFilter(event) {
        const id = event.target.id;
        const value = event.target.value;
        return this.filter(id, value);
      }

      sort(event) {
        this.sortRows(event.target.dataset.column, this.state.sortToggle, event.target.dataset.numeric);
        let sortToggle = !this.state.sortToggle;
        this.setState({sortToggle: sortToggle});
      }

      sortRows(column, ascending, numeric) {
        let sortedRows = this.state.contacts.sort( (a, b) => {
          const left = numeric? parseInt(a[column], 10): a[column];
          const right = numeric? parseInt(b[column], 10): b[column];
          return (ascending? left < right: left > right);
        });
        this.setState({contacts: sortedRows });
      }
      

      /**
       * Handler triggered when user types into any of the FILTER input boxes
       * 
       * @param {*} id Id of the target element
       * @param {*} value value of the target element
       * @param {*} fnShowPredicate is a predicate search function in the form of `(needle, haystack) => boolean` passed to filter
       */
      filter(id, value, fnShowPredicate) {
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
          {header: 'ID', accessor: 'id'},
          {header: 'First Name', accessor: 'firstName'},
          {header: 'Last Name', accessor: 'lastName'},
          {header: 'Email', accessor: 'email'},
          {header: 'Phone', accessor: 'phone'},
          {header: 'Address', accessor: 'address'}
        ];

        return (
          <div className="contacts-table">
            <table>
              {/* <caption>All Records</caption> */}
              <thead>
                <tr key={-1}> 
                {columns.map( (col, i) => {
                  if(i === 0)
                    return (<th data-numeric={true} data-column={col.accessor} key={i} onClick={this.sort}>{col.header}</th>);
                  return (<th data-column={col.accessor} key={i} onClick={this.sort}>{col.header}</th>);
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
                    this.filter(event.target.id, event.target.value, (needle, haystack) => {
                      return haystack.includes(needle);
                    }); 
                  }} 
                /></td>
		          </tr>                
                {this.state.contacts.map( (row, i) => {
                  return (
                  <tr className="st-row" key={i} onClick={() => this.setState({currentRowIndex: i, showEditContact: true})} >
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
            <EditContact 
              showModal={this.state.showEditContact}
              onCancelClick={this.onEditContactCancelClick.bind(this)}
              onOKClick={this.onEditContactOKClick.bind(this)}
              contact={this.state.contacts[this.state.currentRowIndex]}
            />            
          </div>
        );
      }
    }
    

    export default Browse;