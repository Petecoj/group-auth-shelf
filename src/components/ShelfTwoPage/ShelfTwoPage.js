import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import '../ShelfPage/ShelfPage.css';

const mapStateToProps = state => ({
  user: state.user,
  state
});

class ShelfPage extends Component {
  constructor(props){
    super(props)
      this.state ={ 
        show: false
      }
  }
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER})
    this.props.dispatch({type:'GET_USER_LIST'})
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

handleChangeFor = (propertyName) => {
  return (event ) => {
    this.setState({
      newItem : {
        ...this.state.newItem,
        [propertyName] : event.target.value
      }
    })
  }
}


  render() {
    let content = null;

    let itemListArray = this.props.state.itemList.map ((item, index) => {
      return <div key={index} className="card">
                <img src = {item.image_url} alt="Item"/>
                <p>{item.description}</p>
            </div>
    })   


    if (this.props.user.userName) {
      content = (
        <div>
          <p>
            Info Page
          </p>
          <div>{itemListArray}</div>
        </div>
      );
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