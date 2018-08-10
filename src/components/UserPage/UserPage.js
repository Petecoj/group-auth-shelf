import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});


class CustomizedTable extends Component {


  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER })
    this.props.dispatch({ type: 'GET_USERS' })
}

componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
        this.props.history.push('home');
    }
}
render(){
    const { classes } = this.props;

   let userListArray = this.props.state.userList.map(n => {
        return (
            
          <TableRow className={classes.row} key={n.id}>
            <CustomTableCell>{n.username}</CustomTableCell>
            <CustomTableCell numeric>{n.count}</CustomTableCell>
          </TableRow>
        );
      })
  return (
     <div>
    <Nav/>
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>USERNAME</CustomTableCell>
            <CustomTableCell numeric>NUMBER OF ITEMS</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {userListArray}      
        </TableBody>
      </Table>
    </Paper>
    </div>
  );
}
}
CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    user: state.user,
    state
});

const styledTable = withStyles(styles)(CustomizedTable);

export default connect(mapStateToProps)(styledTable);