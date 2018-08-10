import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import './ShelfPage.css';

//views
//link to the add page
//get request
const mapStateToProps = state => ({
  user: state.user,
  state
});

class ShelfPage extends Component {
  constructor(props){
    super(props)
      this.state ={ 
        show: false,
        id: [],
        editItem: [],
      }
  }
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER})
    this.props.dispatch({type:'GET_LIST'})
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  handleDelete = (item) => {
    this.props.dispatch({ 
        type: 'DELETE_ITEM', payload: item.id
    })
}

handleShow = (itemId) => {
  console.log('click', this.state.show, itemId);
  this.setState({
   show: this.show = !this.show,
   id : itemId,
  },

)}

handleChangeFor = (propertyName) => {
  return (event ) => {
    this.setState({
      editItem : {
        ...this.state.editItem,
        [propertyName] : event.target.value
      }
    })
  }
}

editSubmit = () => {
  console.log('edit submit', this.state.editItem)
  this.props.dispatch({
    type: 'UPDATE_ITEM',
    payload: this.state.editItem,
    id: this.state.id
  })
}

  render() {
    let content = null;

    let itemListArray = this.props.state.itemList.map ((item, index) => {
      return <div key={index} className="card">
                <img src = {item.image_url} alt="Item"/>
                <p>{item.description}</p>
                <button onClick={()=>this.handleDelete(item)}>Delete</button> 
                <button onClick={()=>this.handleShow(item.id)}>Edit</button>
            </div>
    })   
    

    if (this.props.user.userName && this.state.show) {
      content = (
        <div>
          <p>
            Info Page
          </p>
          <input placeholder="description" onChange={this.handleChangeFor("description")}/>
          <input placeholder="image URL" onChange={this.handleChangeFor("imageURL")}/>
          <button onClick={this.editSubmit}>Submit</button>
          <div>{itemListArray}</div>
        </div>
      );
    } else {
      content = (
        <div>
          <p>
            Info Page
          </p>
          <div>{itemListArray}</div>
        </div>
      )
    }

    return (
      <div>
        <Nav />
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ShelfPage);
