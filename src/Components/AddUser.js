import React, { Component } from 'react';

class AddUser extends Component {

  constructor(props) {
    super(props);
    this.state ={
      id:"",
      name:"",
      tel:"",
      permission: 3
    }
  }

  isChange = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    this.setState({
      [name]:val
    });

  }

  handleClickAdd = () => {
    this.props.handleEventClickInForm()
    this.props.getAddUserData(this.state.name,this.state.tel,this.state.permission)
  }

  displayForm = () => {
    if(this.props.isDisplayForm === true){
      return( 
        <div className ="col">
        <div className="card text-gray border-primary mb-2 mt-2">
          <h5 className="card-header">Add User</h5>
          <div className="card-body text-primary">
            <div className="form-group">
              <label className="text-left">User Name</label>
              <input name="name"type="text" className="form-control"  required
              onChange ={(e)=> this.isChange(e)}/>
            </div>
            <div className="form-group">
              <label className="text-left">Phone Number</label>
              <input name="tel"type="text" className="form-control"  required
              onChange ={(e)=> this.isChange(e)}/>
            </div>
            <div className="input-group mb-3">
              <select name="permission"className="custom-select" id="inputGroupSelect02" required
              onChange ={(e)=> this.isChange(e)}>
                <option>Choose User Type</option>
                <option value={1}>Admin</option>
                <option value={2}>Modorator</option>
                <option value={3}>Normal</option>
              </select>
            </div>
            <div className="form-group">
              <div className="btn btn-block btn-outline-primary"
              onClick = {this.handleClickAdd}
              >Add</div>
            </div>
          </div>
        </div>
        </div>
      )
    }
  }
  
  
  render() {
      return (
        <div>
            {this.displayForm()}
        </div>
      );
  }
}

export default AddUser;