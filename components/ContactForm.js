import React from 'react'

class ContactForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      companyName: '',
      phone: '',
      email: '',
      emailConfirm: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.target.classList.add('active');
    e.target.classList[e.target.value ? 'remove' : 'add']('placeholder-shown');
    console.log(e.target.classList);

    this.setState({
      [e.target.name]: e.target.value
    });

    this.showInputError(e.target.name);
  }

  handleSubmit(e) {
    e.preventDefault();

    console.log('component state', JSON.stringify(this.state));

    if (!this.showFormErrors()) {
      console.log('form is invalid: do not submit');
      e.target.classList.remove('btn-success');
      e.target.classList.add('btn-error');
    } else {
      console.log('form is valid: submit');
      e.target.classList.remove('btn-error');
      e.target.classList.add('btn-success');

      // Fire off request to form processor
      // ...
      // Disable / remove form; replace with thank you message
      //...
    }
  }

  showFormErrors() {
    const inputs = document.querySelectorAll('input');
    let isFormValid = true;

    inputs.forEach(input => {
      input.classList.add('active');

      const isInputValid = this.showInputError(input.name);

      if (!isInputValid) {
        isFormValid = false;
      }
    });

    return isFormValid;
  }

  showInputError(refName) {
    const validity = this.refs[refName].validity;
    const label = document.querySelector(`label[for="contact-${refName}"]`).textContent;
    const error = document.getElementById(`${refName}-error`);
    const isEmail = refName.indexOf('email') !== -1;
    const isEmailConfirm = refName === 'emailConfirm';

    if (isEmailConfirm) { //} || (refName === 'email' && this.refs.emailConfirm.value)) {
      if (this.refs.email.value !== this.refs.emailConfirm.value) {
        console.log(this.refs.email.value, this.refs.emailConfirm.value);
        this.refs.emailConfirm.setCustomValidity('Email addresses do not match');
      } else {
        this.refs.emailConfirm.setCustomValidity('');
      }
    }

    if (!validity.valid) {
      if (validity.valueMissing) {
        error.textContent = `${label} is a required field`;
      } else if (isEmail && validity.typeMismatch) {
        error.textContent = `${label} should be a valid email address`;
      //} else if (isPassword && validity.patternMismatch) {
      //  error.textContent = `${label} should be longer than 4 chars`;
      } else if (isEmailConfirm && validity.customError) {
        error.textContent = 'Email addresses do not match';
      }
      return false;
    }

    error.textContent = '';
    return true;
  }

  render() {
    return (
      <form noValidate id="contact-form">
        <div className="form-group">
          <input className="form-control placeholder-shown"
                 type="text"
                 id="contact-name"
                 name="name"
                 ref="name"
                 value={ this.state.name }
                 onChange={ this.handleChange }
                 required />
          <label htmlFor="contact-name">Name</label>
          <div className="error" id="name-error" />
        </div>
        <div className="form-group">
          <input className="form-control placeholder-shown"
                 type="text"
                 id="contact-companyName"
                 name="companyName"
                 ref="companyName"
                 value={ this.state.companyName }
                 onChange={ this.handleChange }
                 required
          />
          <label htmlFor="contact-companyName">Company Name</label>
          <div className="error" id="companyName-error" />
        </div>
        <div className="form-group">
          <input className="form-control placeholder-shown"
                 type="phone"
                 id="contact-phone"
                 name="phone"
                 ref="phone"
                 value={ this.state.phone }
                 onChange={ this.handleChange }
          />
          <label htmlFor="contact-phone">Phone</label>
          <div className="error" id="phone-error" />
        </div>
        <div className="form-group">
          <input className="form-control placeholder-shown"
                 type="email"
                 id="contact-email"
                 name="email"
                 ref="email"
                 value={ this.state.email }
                 onChange={ this.handleChange }
                 required />
          <label htmlFor="contact-email">Email</label>
          <div className="error" id="email-error" />
        </div>
        <div className="form-group">
          <input className="form-control placeholder-shown"
                 type="email"
                 id="contact-emailConfirm"
                 name="emailConfirm"
                 ref="emailConfirm"
                 value={ this.state.emailConfirm }
                 onChange={ this.handleChange }
                 required />
          <label htmlFor="contact-emailConfirm">Confirm Email</label>
          <div className="error" id="emailConfirm-error" />
        </div>
        <button className="btn btn-primary btn-submit"
                onClick={ this.handleSubmit }>submit</button>
      </form>
    );
  }
}

export default ContactForm