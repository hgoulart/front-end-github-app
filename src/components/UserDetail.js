import React from "react";
import { List, ListItem, ListItemText, Avatar } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Link } from "react-router-dom";
import Skeleton from '@mui/material/Skeleton';
import Resource from "../resources/Resource";

const initialState = {
    loading: true,
    user: {},
    repos: []
}


export default class UserDetail extends React.Component {

    constructor(props) {
        super(props);

        this.state = { ...initialState };

    }
    componentDidMount() {
        let userName = this.props.match.params.username;
        // setTimeout just to see the skeleton
        setTimeout(() => {
            this.getUser(userName);
        }, 2000);

    }

    getRepos = async (username) => {
        const res = await Resource.getRepositories(username);
        if (res.length > 0) {
            this.setState({ loading: false, repos: res });
        }
    }

    getUser = async (username) => {
        const response = await Resource.getUser(username);
        if (response) {
            this.getRepos(username);
            this.setState({ user: response })
        }
    };

    render() {
        const { user, loading, repos } = this.state;
        return (
            <div>
                <List       
                className="user-list"
                sx={{ width: '100%' }}>
                    {
                        !loading ? (

                            <ListItem key={user.id} className="list-border" >
                                <Avatar
                                    className="user-avatar"
                                    alt={user.login}
                                    src={user.avatar_url}
                                />
                                <ListItemText primary="Id:" secondary={user.id} />
                                <ListItemText primary="Login:" secondary={user.login} />
                                <ListItemText primary="Url:" secondary={user.html_url} />
                            </ListItem>
                        ) : (
                            <div>
                                <Skeleton variant="circular" width={40} height={40} />
                                <Skeleton variant="text" />
                                <Skeleton variant="text" />
                            </div>
                        )
                    }
                </List >

                <TableContainer>
                    <h3>Repositories<Link to="/"className="btn-link">Home</Link></h3>
                    <Table  size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell component="th" scope="row">Id</TableCell>
                                <TableCell component="th" scope="row">Name</TableCell>
                                <TableCell component="th" scope="row" align="right">Url</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!loading ? (
                                repos.map(repo => {

                                    return (
                                        <TableRow
                                            key={repo.id}
                                        >
                                            <TableCell>{repo.id}</TableCell>
                                            <TableCell>{repo.name}</TableCell>
                                            <TableCell align="right">{repo.html_url}</TableCell>
                                        </TableRow>
                                    )
                                })) : (

                                <TableRow
                                    key="0"
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell ><Skeleton variant="text" /></TableCell>
                                    <TableCell ><Skeleton variant="text" /></TableCell>
                                    <TableCell align="right"><Skeleton variant="text" /></TableCell>
                                </TableRow>
                            )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}


