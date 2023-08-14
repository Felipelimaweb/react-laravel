import React, { Component } from "react"

class Form extends Component {
    state = {
        form: {name: "", email: "", phone: "", isEdit: false},
        btnName: "Salvar",
        btnClass: "ui primary button submit-button"
    };

    isEmptyObj(obj) {
        return Object.entries(obj).length === 0 && obj.constructor === Object;
    };

    componentDidUpdate(prevProps) {
        if(prevProps !== this.props && !this.isEmptyObj(this.props.user)) {
            this.setState({
                form: { ...this.props.user, isEdit: true},
                btnName: "Update",
                btnClass: "ui orange button submit-button"
            })
        }
    };

    handleChange = event => {
        const {name, value} = event.target;
        let form = this.state.form;
        form[name] = value;
        this.setState({form})
    };

    onFormSubmit = (event) => {
        event.preventDefault();
        this.formValidation();
        if (this.formValidation()) {
            this.props.onFormSubmit(this.state.form)
        }
        this.clearFormFields();
    };

    formValidation = () => {
        if(document.getElementsByName("name")[0].value === "") {
            alert('Informe o nome');
            return false;
        }
        if(document.getElementsByName("email")[0].value === "") {
            alert('Informe o e-mail');
            return false;
        }
        if(document.getElementsByName("phone")[0].value === "") {
            alert('Informe o telefone');
            return false;
        }

        return true;
    };

    clearFormFields = () => {
        this.setState({
            form: {name: "", email: "", phone: "", isEdit: false} 
        });

        this.setState({
            btnName: "Salvar",
            btnClass: "ui primary button submit-button"
        })

        document.querySelector(".form").reset();
    };

    render() {
        return (
            <form className="ui form">
                <div className="fields">
                    <div className="four wide field">
                        <label>Name</label>
                        <input type="text" name="name" placeholder="Nome" onChange={this.handleChange} value={this.state.form.name}/>
                    </div>

                    <div className="four wide field">
                        <label>E-mail</label>
                        <input type="email" name="email" placeholder="E-mail" onChange={this.handleChange} value={this.state.form.email}/>
                    </div>

                    <div className="four wide field">
                        <label>Telefone</label>
                        <input type="text" name="phone" placeholder="Telefone" onChange={this.handleChange} value={this.state.form.phone}/>
                    </div>

                    <div className="four wide field">
                        <button className={this.state.btnClass} onClick={this.onFormSubmit}>{this.state.btnName}</button>
                    </div>
                </div>
            </form>
        );
    }
}

export default Form;