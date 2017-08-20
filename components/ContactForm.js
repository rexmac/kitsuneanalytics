import React from 'react'
import ContactFormThankYou from './ContactFormThankYou'
import Loader from './Loader'

function withLoader(WrappedComponent) {
  return React.createClass({
    render: function () {
      // Use JSX spread syntax to pass all props and state down automatically.
      return (
        <Loader>
          <WrappedComponent {...this.props} {...this.state} />;
        </Loader>
      )
    }
  });
}

class ContactForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: {
        name: '',
        companyName: '',
        phone: '',
        email: '',
        emailConfirm: '',
        comment: ''
      },
      loading: false,
      success: false,
      submitted: false,
      touched: {
        name: false,
        companyName: false,
        phone: false,
        email: false,
        emailConfirm: false,
        comment: false
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
        emailConfirm: true,
        comment: true
      }
    });

    console.log('component state', JSON.stringify(this.state.input));

    if (!this.canBeSubmitted()) {
      console.log('form is invalid: do not submit');
      //return;
    }

    console.log('form is valid: submit');
    this.setState({ success: true, loading: true });
    //this.setState({ success: true });
    //this.setState({ loading: true });

    const formPayload = this.state.input;
    // Fire off request to form processor
    const url = 'https://script.google.com/macros/s/AKfycbxc6cWBmiOpM6yVwDr_RkmD2AxXkS8ZEcHsOvAYMMBPKD6OK6kA/exec';
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    //xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    const that = this;
    xhr.onreadystatechange = function() {
      console.log(xhr.status, xhr.statusText);
      console.log(xhr.responseText);
      // Disable / remove form; replace with thank you message
      that.setState({ loading: false, submitted: true });
      return;
    };
    // url encode form data for sending as post data
    const encoded = Object.keys(formPayload).map(function(k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(formPayload[k])
    }).join('&');
    xhr.send(encoded);
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
    console.log('canBeSubmitted?');
    const errors = this.validate();
    const formHasErrors = Object.keys(errors).some(x => errors[x]);
    return !formHasErrors;
  }

  render() {
    console.log('render');
    const errors = this.validate();
    const formHasErrors = Object.keys(errors).some(x => errors[x]);
    const allTouched = Object.keys(this.state.touched).every(x => this.state.touched[x]);
    const loading = this.state.loading;
    const success = this.state.success;
    const submitted = this.state.submitted;
    const formClassNames = [
      'collapsible-wrapper',
      loading ? 'loading' : '',
      success ? 'success' : '',
      formHasErrors ? '' : 'submittable',
      submitted ? 'submitted collapsed' : ''
    ];

    const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];

      //return hasError ? shouldShow : false;
      return hasError && shouldShow;
    };

    return (
      <form id="contact-form"
            className={ formClassNames.join(' ') }
            onSubmit={ this.handleSubmit }
            noValidate
      >
        <Loader loading={loading} />
        <div className="collapsible">
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
          <div className={`form-group ${shouldMarkError('comment') ? 'error' : ''}`}>
            <textarea className="form-group placeholder-shown"
                      id="contact-comment"
                      name="comment"
                      ref="comment"
                      value={ this.state.input.comment }
                      onBlur={ this.handleBlur }
                      onChange={ this.handleChange }
            ></textarea>
            <label htmlFor="contact-comment">Comment</label>
            <div className="error-message" id="comment-error">{ errors.comment }</div>
          </div>
          <button className={`btn btn-primary btn-submit ${formHasErrors && allTouched ? 'btn-error' : ''} ${success ? 'btn-success' : ''}`}
                  onClick={ this.handleSubmit }
          >Submit</button>
        </div>
        <ContactFormThankYou />
      </form>
    );
  }
}

export default ContactForm