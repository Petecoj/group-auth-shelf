import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';



const mapStateToProps = state => ({
    user: state.user,
    state
});

class UserPage extends Component {
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER })
        this.props.dispatch({ type: 'GET_USERS' })
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
    }

    render() {
        let content = null
        console.log(this.props);


        let userListArray = this.props.state.userList.map((user, index) => {
            return <tr key={index}>
                <td>{user.username}</td>
                <td>{user.count}</td>
            </tr>
        })

        if (this.props.user.userName) {
            content = (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Number of Shelved Items</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userListArray}
                        </tbody>
                    </table>
                </div>
            );
        }

        return (
            <div>
                <Nav />
                {content}
            </div>
        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
