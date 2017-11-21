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
          selected: {},
          toggleAll: false,
          loading: false, 
          sortToggle: false,
          showEditContact: false,
          currentRowIndex: -1,
          currentRow: null
        };
        this.handleFilter = this.handleFilter.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.handleToggleAll = this.handleToggleAll.bind(this);
        this.handleDeleteContacts = this.handleDeleteContacts.bind(this);
      }

      componentWillMount() {
        this.fetchData();
      }


      fillSelectedMap(contacts, isSelected) {
        let selectedMap = {};
        contacts.forEach(contact => {
          selectedMap[contact.id] = isSelected;
        });
        return selectedMap;
      }

      fetchData() {
        this.setState({loading: true});
        Services.getAllContacts()
          .then(res => {
            this.setState({
              contacts: res.data.Items,
              selected: this.fillSelectedMap(res.data.Items, false),
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
            let selected = this.state.selected;
            let newContact = Object.assign({}, this.state.currentRow);
            newContact.id = res.data.id;
            contacts.push(newContact);
            selected[newContact.id] = false;
            this.setState({ contacts: contacts, selected: selected, showEditContact: false });
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

      handleToggle(e, id) {
        let selected = this.state.selected;
        selected[id] = e.target.checked;
        this.setState( { selected: selected } );
      }

      handleToggleAll(event) {
        let selected = this.state.selected;        
        Object.keys(selected).forEach( key => {
          selected[key] = event.target.checked;
        });
        this.setState( { selected: selected, toggleAll: !this.state.toggleAll } );
      }

      handleDeleteContacts(event) {
        const ids = Object.keys(this.state.selected).filter(key => this.state.selected[key]);
        if(ids.length <= 0) {
          console.log('no item selected');
          return;
        }

        Services.deleteContacts(ids, this.props.store.getState().user.token)
        .then(res => {
          const contacts = this.state.contacts.filter(contact => !res.data.deleted.includes(contact.id) );
          this.setState( { contacts: contacts, selected: this.fillSelectedMap(contacts, false), toggleAll: false } );
        })
        .catch(err => {
          console.error(err);
          const msg = err.response && err.response.data? err.response.data.error: err.message;
          this.props.setAlert({ title: 'Oops!', message: msg, bsStyle: 'danger', visibility: true });
        });      
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
              <a className="btn icon-btn btn-default" style={{color: 'gray'}} onClick={this.handleDeleteContacts}>
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
                <th className="td-select" key={0}>
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
                <td className="td-select">
                  <Checkbox 
                    checked={this.state.toggleAll}
                    onChange={this.handleToggleAll} onClick={(e) => Util.cancelBubble(e)}
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
                        checked={this.state.selected[row.id]}
                        onChange={(e) => this.handleToggle(e, row.id)}
                        onClick={(e) => Util.cancelBubble(e)}
                      />
                    </td>
                    <td className="td-id" data-label="ID">{ row.id }</td>
                    <td className="td-firstName" data-label="First Name">{ row.firstName }</td>
                    <td className="td-lastName" data-label="Last Name">{ row.lastName }</td>
                    <td className="td-email" data-label="Email"><a href={`mailto:${row.email}`} onClick={(event) => Util.cancelBubble(event)}>{ row.email }</a></td>
                    <td className="td-phone" data-label="Phone">{ row.phone }</td>
                    <td className="td-address" data-label="Address">{ row.address }</td>
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