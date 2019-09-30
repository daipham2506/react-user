import React, { Component } from 'react';


// import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from "bs4-modal-react";
class Table extends Component {

  constructor(props) {
    super(props);
    this.state = {
      itemUser: {},
    }
  }

  getItemUser = (item) => {
    this.setState({
      itemUser: item
    });
  }

  permissionShow = (permission) => {
    if (parseInt(permission) === 1) return "Admin"
    else if (parseInt(permission) === 2) return "Modorator"
    else return "Normal"
  }

  isChange = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    this.setState({
      itemUser: {
        ...this.state.itemUser,
        [name]: val
      }
    });

  }

  handleClickSave = (item)=>{
    this.getItemUser(item)
    this.props.handleEdit(item)
  }




  render() {
    return (
      <div className="col">
        <table className="table  table-hover  text-center">
          <thead className="thead-inverse">
            <tr>
              <th>Stt</th>
              <th>Name </th>
              <th>Phone</th>
              <th>Permission</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>


            {/* Modal Edit */}
            <div className="modal fade" id="myModal">
              <div className="modal-dialog modal-dialog-centered ">
                <div className="modal-content ">
                  {/* Modal Header */}
                  <div className="modal-header ">
                    <h4 className="modal-title">Edit infomation </h4>
                    <button type="button" className="close" data-dismiss="modal">×</button>
                  </div>
                  {/* Modal body */}
                  <div className="modal-body">

                    <div className=" text-primary">
                      <div className="form-group">                     
                        <input name="name" type="text" className="form-control" required placeholder="User Name"
                          value={this.state.itemUser.name}
                          onChange={(e) => this.isChange(e)} />
                      </div>
                      <div className="form-group">
                        <input name="tel" type="tel" className="form-control" required placeholder="Phone Number"
                          value={this.state.itemUser.tel}
                          onChange={(e) => this.isChange(e)} />
                      </div>

                      <div className="input-group mb-3">
                        <select
                          value={this.state.itemUser.permission}
                          name="permission" className="custom-select" id="inputGroupSelect02" required

                          onChange={(e) => this.isChange(e)}>
                          <option value={1} >Admin</option>
                          <option value={2} >Modorator</option>
                          <option value={3} >Normal</option>
                        </select>
                      </div>



                    </div>
                  </div>
                  {/* Modal footer */}
                  <div className="modal-footer">
                    <button
                      onClick={() => this.handleClickSave(this.state.itemUser)}
                      type="button" className="btn btn-primary " data-dismiss="modal">Save</button>
                  </div>
                </div>
              </div>
            </div>



            {this.props.dataUserProps.map(item => (

              <tr>

                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.tel}</td>
                <td>{this.permissionShow(item.permission)}</td>
                <td className="act">
                  <button type="button" className="btn btn-warning" data-toggle="modal" data-target="#myModal"
                    onClick={() => this.getItemUser(item)}
                  ><i className="fa fa-edit" /> Edit</button>

                  <button
                    onClick={() => this.props.handleClickRemove(item.id, item.name)}
                    type="button" className="btn btn-danger"> <i className="fa fa-trash" /> Remove</button>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;