

import './../App.css';
import Header from './Header';
import Search from './Search';
import Table from './Table';
import AddUser from './AddUser';
import data from './Data.json'

import React, { Component } from 'react';



const uuidv1 = require('uuid/v1');

function delAccents_toUpper(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  return str.toUpperCase();
}


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      DataUser: [],
      isDisplayForm: false,
      searchText: "",
    }
  }

  
  componentWillMount() {
    if(localStorage.getItem('DataUser') === null){
      localStorage.setItem('DataUser',JSON.stringify(data))
    }
    else{
      var tempData = JSON.parse(localStorage.getItem('DataUser'))
      this.setState({
        DataUser: tempData
      });
    }
  }
  

  handleClickRemove = (idUser,nameUser) => {
    if (confirm("Are you sure remove "+nameUser+"?")) //eslint-disable-line
    {
      var tempData = this.state.DataUser.filter(item => item.id !== idUser)

      this.setState({
        DataUser: tempData
      });
      localStorage.setItem('DataUser',JSON.stringify(this.state.DataUser))
    }
    
  }

  handleEdit = (user) => {

    var tempData = this.state.DataUser
    tempData.forEach(item => {
      if (item.id === user.id) {
        item.name = user.name
        item.tel = user.tel
        item.permission = user.permission
      }
    })
    this.setState({
      DataUser: tempData
    });
    localStorage.setItem('DataUser',JSON.stringify(this.state.DataUser))
  }

  getAddUserData = (name, tel, permission) => {
    var item = {}
    item.id = uuidv1();
    item.name = name;
    item.tel = tel;
    item.permission = permission;

    var items = this.state.DataUser;
    items.push(item);

    this.setState({
      DataUser: items
    });
    localStorage.setItem('DataUser',JSON.stringify(this.state.DataUser))

  }

  changeStatusForm = () => {
    this.setState({
      isDisplayForm: !this.state.isDisplayForm
    });
  }


  handleEventClickInForm = () => {
    this.changeStatusForm()
    alert("You have successfully added");
  }

  getTextSearch = (text) => {
    this.setState({
      searchText: text
    });

  }





  render() {

    
    var resultSearch = [];
    var text_search = delAccents_toUpper(this.state.searchText);


    this.state.DataUser.forEach((item) => {
      var item_name = delAccents_toUpper(item.name);
      if (item_name.indexOf(text_search) !== -1)
        resultSearch.push(item);

    })

    return (
      <div className="App">

        <Header />
        <div className="container">
          <div className="row">
            <Search changeStatusForm={() => this.changeStatusForm()}
              getTextSearch={(dl) => this.getTextSearch(dl)}
            />
            <Table dataUserProps={resultSearch}
              handleClickRemove={(id,name) => this.handleClickRemove(id,name)}
              handleEdit={(user) => this.handleEdit(user)}
            />
            <AddUser isDisplayForm={this.state.isDisplayForm}
              handleEventClickInForm={() => this.handleEventClickInForm()}
              getAddUserData={(name, tel, permission) => this.getAddUserData(name, tel, permission)}
            />
          </div>
        </div>
      </div>
    );
  }
}



export default App;
