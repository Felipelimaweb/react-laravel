import React, { Component } from "react";
import User from "./User";

class UserList extends Component {
  onDelete = id => {
    this.props.onDelete(id);
  };
  onEdit = data => {
    this.props.onEdit(data);
  };
  render() {
    const users = this.props.users;
    return (
      <div className="data">
        <table className="ui celled table">
          <thead>
            <tr>
              <th style={{ width: "50px", textAlign: "center" }}>#</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th style={{ width: "200px" }}></th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => {
              return (
                <User user={user} key={user.id} onDelete={this.onDelete} onEdit={this.onEdit} />
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default UserList;
