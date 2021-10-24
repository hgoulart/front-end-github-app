import React from "react";
import Resource from "../resources/Resource";
import { List, ListItem, ListItemText, Avatar } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";

// users per page  
const number = 10;

const initialState = {
  page: 1,
  number: number,
  loading: true,
  fakeUsers: [0, 1, 2, 3, 5, 6, 7, 8, 9, 10],
  users: []
}

export default class User extends React.Component {

  constructor(props) {
    super(props);

    this.state = { ...initialState };

  }
  componentDidMount() {
    // setTimeout just to see the skeleton
    setTimeout(() => {
      this.getUsers(this.state.page);
    }, 2000);

  }

  handleChange = (event, value) => {
    let nextPage = 1;
    if (value !== 1 && value !== 0) {
      nextPage = value * this.state.number
    }
    this.setState({ page: nextPage });
    this.getUsers(nextPage);
  };

  async getUsers(page) {
    const response = await Resource.getUsers(page, this.state.number);
    if (response) {
      this.setState({ loading: false, users: response, page: page })
    }
  };

  render() {
    const { users, loading, fakeUsers } = this.state;

    return <List 
      className="user-list"
      sx={{ width: '100%'}}
      >
      {
        loading && fakeUsers.map(fakeUser => {
          return (
            <ListItem key={fakeUser} className="list-border ">
              <div className="fake-avatar"></div>
              <div className="fake-item">
                <div className="fake-login"></div>
                <div className="fake-url"></div>
              </div>

            </ListItem>
          );
        })
      }
      {
        !loading && users.map(user => {
          return (
            <ListItem key={user.id} className="list-border" >
              <Avatar
                className="user-avatar"
                alt={user.login}
                src={user.avatar_url}
              />
              <ListItemText primary={user.login} secondary={user.html_url} />
              <Link to={`${user.login}/details`}
                className="btn-link"
              >
                Detail
              </Link>
            </ListItem>
          );
        })
      }

      <Stack spacing={2} className="c-pagination">
        <Pagination
          count={100}
          color="primary"
          onChange={this.handleChange}
        />
      </Stack>

    </List>
  }
}