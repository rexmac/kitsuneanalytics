import React from 'react'

class ContactForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: {
        name: '',
        companyName: '',
        phone: '',
        email: '',
        emailConfirm: ''
      },
      success: false,
      touched: {
        name: false,
        companyName: false,
        phone: false,
        email: false,
        emailConfirm: false
      }
    };

    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleBlur(event) {
    this.setState({
      touched: { ...this.state.touched, [event.target.name]: true }
    });
  };

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log('handleChange', {target, value, name});

    target.classList.add('active');
    target.classList[value ? 'remove' : 'add']('placeholder-shown');
    console.log(target.classList);

    this.setState({
      input: { ...this.state.input, [name]: value }
    });

    //this.showInputError(name);
  }

  handleSubmit(e) {
    e.preventDefault();

    // Set touched=true for all fields
    this.setState({
      touched: {
        name: true,
        companyName: true,
        phone: true,
        email: true,
        emailConfirm: true
      }
    });

    console.log('component state', JSON.stringify(this.state.input));

    if (!this.canBeSubmitted()) {
      console.log('form is invalid: do not submit');
      return;
    }

    console.log('form is valid: submit');
    this.setState({ success: true });

    const formPayload = this.state.input;
    // Fire off request to form processor
    // ...
    // Disable / remove form; replace with thank you message
    //...
  }

  /*
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
*/

  validateField(fieldName) {
    const validity = this.refs[fieldName].validity;
    const label = document.querySelector(`label[for="contact-${fieldName}"]`).textContent;
    const isEmail = fieldName.indexOf('email') !== -1;
    const isEmailConfirm = fieldName === 'emailConfirm';

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
        return `${label} is a required field`;
      } else if (isEmail && validity.typeMismatch) {
        return `${label} should be a valid email address`;
        //} else if (isPassword && validity.patternMismatch) {
        //  error.textContent = `${label} should be longer than 4 chars`;
      } else if (isEmailConfirm && validity.customError) {
        return 'Email addresses do not match';
      }
    }

    return '';
  }

  validate() {
    console.log('validate', Object.keys(this.refs));
    if (Object.keys(this.refs).length === 0) {
      return {};
    }

    const errors = {};

    //Object.keys(this.state.input).map(this.validateField.bind(this));
    Object.keys(this.state.input).forEach((fieldName) => {
      errors[fieldName] = this.validateField(fieldName);
    });

    console.log('errors', errors);

    return errors;
  }

  canBeSubmitted() {
    const errors = this.validate();
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  render() {
    //const submitEnabled = this.showFormErrors();

    const errors = this.validate();
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    const allTouched = Object.keys(this.state.touched).every(x => this.state.touched[x]);
    const success = this.state.success;

    const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];

      //return hasError ? shouldShow : false;
      return hasError && shouldShow;
    };

    return (
      <form id="contact-form"
            className={success ? 'success' : ''}
            onSubmit={this.handleSubmit}
            noValidate
      >
        <div>
        <div className={`form-group ${shouldMarkError('name') ? 'error' : ''}`}>
          <input className="form-control placeholder-shown"
                 type="text"
                 id="contact-name"
                 name="name"
                 ref="name"
                 value={ this.state.input.name }
                 onBlur={ this.handleBlur }
                 onChange={ this.handleChange }
                 required />
          <label htmlFor="contact-name">Name</label>
          <div className="error-message" id="name-error">{errors.name}</div>
        </div>
        <div className={`form-group ${shouldMarkError('companyName') ? 'error' : ''}`}>
          <input className="form-control placeholder-shown"
                 type="text"
                 id="contact-companyName"
                 name="companyName"
                 ref="companyName"
                 value={ this.state.input.companyName }
                 onBlur={ this.handleBlur }
                 onChange={ this.handleChange }
          />
          <label htmlFor="contact-companyName">Company Name</label>
          <div className="error-message" id="companyName-error">{errors.companyName}</div>
        </div>
        <div className={`form-group ${shouldMarkError('phone') ? 'error' : ''}`}>
          <input className="form-control placeholder-shown"
                 type="phone"
                 id="contact-phone"
                 name="phone"
                 ref="phone"
                 value={ this.state.input.phone }
                 onBlur={ this.handleBlur }
                 onChange={ this.handleChange }
          />
          <label htmlFor="contact-phone">Phone</label>
          <div className="error-message" id="phone-error">{errors.phone}</div>
        </div>
        <div className={`form-group ${shouldMarkError('email') ? 'error' : ''}`}>
          <input className="form-control placeholder-shown"
                 type="email"
                 id="contact-email"
                 name="email"
                 ref="email"
                 value={ this.state.input.email }
                 onBlur={ this.handleBlur }
                 onChange={ this.handleChange }
                 required />
          <label htmlFor="contact-email">Email</label>
          <div className="error-message" id="email-error">{errors.email}</div>
        </div>
        <div className={`form-group ${shouldMarkError('emailConfirm') ? 'error' : ''}`}>
          <input className="form-control placeholder-shown"
                 type="email"
                 id="contact-emailConfirm"
                 name="emailConfirm"
                 ref="emailConfirm"
                 value={ this.state.input.emailConfirm }
                 onBlur={ this.handleBlur }
                 onChange={ this.handleChange }
                 required />
          <label htmlFor="contact-emailConfirm">Confirm Email</label>
          <div className="error-message" id="emailConfirm-error">{errors.emailConfirm}</div>
        </div>
        <button className={`btn btn-primary btn-submit ${isDisabled && allTouched ? 'btn-error' : ''} ${success ? 'btn-success' : ''}`}
                disabled={isDisabled}
                onClick={ this.handleSubmit }>submit</button>
        </div>
      </form>
    );
  }
}

export default ContactForm