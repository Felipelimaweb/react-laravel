import React, { Component } from "react";
import axios from "axios";
import Form from "./Form";
import UserList from "./UserList";
import Loader from "./Loader"
import "./app.css";

class App extends Component {
    state = {
        users: [],
        user: {},
        loader: false,
        url: "http://localhost/laravel-api/public/api/users"
    };
    
    getUsers = async () => {
        this.setState({loader: true})
        const users = await axios.get(this.state.url);
        this.setState({ users: users.data, loader: false});
    };

    deleteUser = async id => {
        this.setState({loader: true});
        await axios.delete(`${this.state.url}/${id}`);
        this.getUsers();
    };

    createUser =  async (data) => {
        this.setState({loader: true});
        await axios.post(this.state.url, {
            name: data.name,
            email: data.email,
            phone: data.phone,
        });
        this.getUsers();
    };

    editUser = async (data) => {
        this.setState({user: {}, loader: true});
        await axios.put(`${this.state.url}/${data.id}`, {
            name: data.name,
            email: data.email,
            phone: data.phone,
        });
        this.getUsers();
    };

    componentDidMount(){
        this.getUsers();
    };

    onDelete = id => {
        this.deleteUser(id);
    };

    onEdit = data => {
        this.setState({user: data});
    };

    onFormSubmit = data => {
        if(data.isEdit) {
            this.editUser(data);
        }else {
            this.createUser(data);
        }
    };

    render() {
        return (
            <div>
                <div className="ui fixed inverted menu">
                    <div className="ui container">
                        <a href="/#" className="header item">
                            React laravel
                        </a>
                    </div>
                </div>

                <div className="ui main container">
                    <Form user={this.state.user} onFormSubmit={this.onFormSubmit} />
                    {this.state.loader ? <Loader /> : ""}
                    <UserList users={this.state.users} onDelete={this.onDelete} onEdit={this.onEdit} />
                </div>
            </div>
        );
    }
}

export default App;