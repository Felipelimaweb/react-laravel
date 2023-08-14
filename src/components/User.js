import React, { Component } from "react";

class User extends Component {
  onDelete = () => {
    this.props.onDelete(this.props.user.id);
  }
  onEdit = () => {
    this.props.onEdit(this.props.user);
  }
  render() {
    const {id, name, email, phone} = this.props.user;
    return (
      <tr>
        <td style={{ textAlign: "center" }}>{id}</td>
        <td>{name}</td>
        <td>{email}</td>
        <td>{phone}</td>
        <td>
          <button className="mini ui blue button" onClick={this.onEdit}>Editar</button>
          <button className="mini ui red button" onClick={this.onDelete}>Deletar</button>
        </td>
      </tr>
    );
  }
}

export default User;
