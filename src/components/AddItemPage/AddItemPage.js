import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';

import { fetchUser } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';

const mapStateToProps = state => ({
  user: state.user,
});

class AddItemPage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      newItem: {
        description : '',
        imageURL: '',
      }
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchUser());
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
    // this.props.history.push('home');
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

  addItem = () => {
    this.props.dispatch({
      type: 'POST_ITEM',
      payload: this.state.newItem
    })
  }

  render() {
    let content = null;

    console.log('state', this.state.newItem)

    if (this.props.user.userName) {
      content = (
        <div>
          <h3
            id="welcome"
          >
            Welcome, { this.props.user.userName }!
          </h3>

          <input placeholder="description" onChange={this.handleChangeFor("description")}/>
          <input placeholder="image URL" onChange={this.handleChangeFor("imageURL")}/>
          <button onClick={this.addItem}>Submit</button>

          <button
            onClick={this.logout}
          >
            Log Out
          </button>
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
export default connect(mapStateToProps)(AddItemPage);

