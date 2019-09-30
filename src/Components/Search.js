import React, { Component } from 'react';

class Search extends Component {

    constructor(props) {
      super(props);
      this.state ={
        textSearch :""
      }
    }

    isChange = (e) => {
      this.setState({
        textSearch: e.target.value
      }); 
      
      this.props.getTextSearch( e.target.value);
    }



    render() {
      
      return (

        <div className="col-12 search-form text-left">
          <div className="form-group">
            <div className="btn-group">
              <input type="text"  className="form-control" placeholder="Enter name to search" 
              onChange ={(e)=> this.isChange(e)}/>
              <div className="btn btn-outline-success"
              onClick ={()=> this.props.getTextSearch(this.state.textSearch)}
              >Search</div>
            </div>
          </div>
          <div className="btn btn-block btn-outline-primary mt-1"
          onClick = {()=>this.props.changeStatusForm()}>Add User</div>
          <hr />
          
        </div>
      );
    }
}

export default Search;