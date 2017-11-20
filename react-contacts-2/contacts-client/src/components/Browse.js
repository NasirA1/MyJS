import React, { Component } from 'react';
import { Checkbox } from 'react-bootstrap';
import * as Services from '../Api';
import EditContact from './EditContact';
import * as Util from '../util';


const NEW_ROW_ID = -1;

function createNewContact() {
  return {
    id: NEW_ROW_ID,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  };
}



class Browse extends Component {
    
      constructor(props) {
        super(props);
        this.state = { 
          contacts: [], 
          loading: false, 
          sortToggle: false,
          showEditContact: false,
          currentRowIndex: -1,
          currentRow: null
        };
        this.handleFilter = this.handleFilter.bind(this);
        this.handleSort = this.handleSort.bind(this);
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
              console.error(err);
              const msg = err.response && err.response.data? err.response.data.error: err.message;
              this.props.setAlert({ title: 'Oops!', message: msg, bsStyle: 'danger', visibility: true });    
              this.setState({
              loading: false
            });                
          });
      }


      onEditContactCancelClick() {
        this.setState({ showEditContact: false });
      }

      haveNewRow() {
        return this.state.currentRow && this.state.currentRow.id === NEW_ROW_ID;
      }

      onEditContactOKClick(event) {
        event.preventDefault();
        if(this.haveNewRow()) {
          Services.insertContact(this.state.currentRow, this.props.store.getState().user.token)
          .then(res => {
            console.log(res);
            let contacts = this.state.contacts;
            let newContact = Object.assign({}, this.state.currentRow);
            newContact.id = res.data.id;
            contacts.push(newContact);
            this.setState({ contacts: contacts, showEditContact: false });
          })
          .catch(err => {
            console.error(err);
            const msg = err.response && err.response.data? err.response.data.error: err.message;
            this.props.setAlert({ title: 'Oops!', message: msg, bsStyle: 'danger', visibility: true });    
            this.setState({ showEditContact: false });
          });
        }
        else {
          Services.updateContact(this.state.currentRow, this.props.store.getState().user.token)
          .then(res => {
            console.log(res);
            let contacts = this.state.contacts;
            contacts[this.state.currentRowIndex] = Object.assign({}, this.state.currentRow);
            this.setState({ contacts: contacts, showEditContact: false });
          })
          .catch(err => {
            console.error(err);
            const msg = err.response && err.response.data? err.response.data.error: err.message;
            this.props.setAlert({ title: 'Oops!', message: msg, bsStyle: 'danger', visibility: true });    
            this.setState({ showEditContact: false });
          });  
        }
      }

      onEditContactInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        let currentRow = this.state.currentRow;
        currentRow[name] = value;
        this.setState({ currentRow: currentRow });
      }
          

      handleFilter(event) {
        const id = event.target.id;
        const value = event.target.value;
        return this.filter(id, value);
      }

      handleSort(event) {
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
            <div className="btn-group" style={{ float: 'right', marginBottom: '10px'}}>
            <a className="btn icon-btn btn-default" style={{color: 'gray'}} onClick={ 
                (event) => {
                  event.preventDefault();
                  console.log('TODO');
                } 
              }>
                <span className="glyphicon btn-glyphicon glyphicon-trash img-circle text-danger"></span>
                Del
              </a>            
              <a className="btn icon-btn btn-default" style={{color: 'gray'}} onClick={
                (event) => {
                  event.preventDefault();
                  this.setState( {
                    currentRowIndex: -1,
                    currentRow: createNewContact(),
                    showEditContact: true,
                  });
                } 
              }>
                <span className="glyphicon btn-glyphicon glyphicon-plus img-circle text-success"></span>
                New
              </a>
            </div>
            <table>
              {/* <caption>All Records</caption> */}
              <thead>
                <tr key={-1}>
                <th className="td-select" data-column="selectAll" key={0}>
                  Select
                </th>
                {columns.map( (col, i) => {
                  if(i === 0) //first row numeric sort
                    return (<th className="td-id" data-numeric={true} data-column={col.accessor} key={i} onClick={this.handleSort}>{col.header}</th>);
                  return (<th data-column={col.accessor} key={i} onClick={this.handleSort}>{col.header}</th>);
                })}
                </tr>
              </thead>
              <tbody>
              <tr className="filter-row">
                <td className="td-select" data-column="selectAll">
                  <Checkbox 
                    onChange={(event) => console.log(event)} 
                    onClick={(event) => {console.log(event); Util.cancelBubble(event); }} 
                  />                  
                </td>
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
                  <tr className="st-row" key={i} onClick={() => {
                    let selectedRow = Object.assign({}, this.state.contacts[i]);
                    this.setState({currentRow: selectedRow, currentRowIndex: i, showEditContact: true});                                
                    }} >
                    <td className="td-select">
                      <Checkbox 
                        onChange={(event) => console.log(event)} 
                        onClick={(event) => {console.log(event); Util.cancelBubble(event); }} 
                      />
                    </td>
                    <td className="td-id">{ row.id }</td>
                    <td className="td-firstName">{ row.firstName }</td>
                    <td className="td-lastName">{ row.lastName }</td>
                    <td className="td-email"><a href={`mailto:${row.email}`} onClick={(event) => Util.cancelBubble(event)}>{ row.email }</a></td>
                    <td className="td-phone">{ row.phone }</td>
                    <td className="td-address">{ row.address }</td>
                  </tr>);
                })}                
              </tbody>
            </table>
            <EditContact 
              showModal={this.state.showEditContact}
              onInputChange = {this.onEditContactInputChange.bind(this)}
              onCancelClick={this.onEditContactCancelClick.bind(this)}
              onOKClick={this.onEditContactOKClick.bind(this)}
              contact={this.state.currentRow}
            />            
          </div>
        );
      }
    }
    

    export default Browse;