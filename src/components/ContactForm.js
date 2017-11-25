import React from 'react';
// import PropTypes from 'prop-types';
import Alert from './Alert';
// import FormGroup from './forms/FormGroup';
import ContactFormThankYou from './ContactFormThankYou';
import Loader from './Loader';

/*
function withLoader(WrappedComponent) {
  return class WithLoader extends React.Component {
    render() {
      // Use JSX spread syntax to pass all props and state down automatically.
      return (
        <Loader>
          <WrappedComponent {...this.props} {...this.state} />;
        </Loader>
      )
    }
  };
}
*/

/**
 * Submit form data for processing
 *
 * @param formData
 * @returns {Promise}
 */
function submitForm(formData) {
  const url = 'https://script.google.com/macros/s/AKfycbxPn3hDmkkdrpJaj5MVYTqqkLxCaqTXbgSJ3xvIK39t-mHqHXqs/exec';
  // this.setState({ error: '' });

  // Create new promise with the Promise() constructor;
  // This has as its argument a function
  // with two parameters, resolve and reject
  return new Promise((resolve, reject) => {
    // Standard XHR to load an image
    const request = new XMLHttpRequest();
    request.open('POST', url);
    // request.responseType = 'blob';
    // request.withCredentials = true;
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // When the request loads, check whether it was successful
    request.onload = () => {
      if (request.status === 200) {
        // If successful, resolve the promise by passing back the request response
        resolve(request.response);
      } else {
        // If it fails, reject the promise with a error message
        reject(Error(`Failed to submit form; error code: ${request.statusText}`));
      }
    };
    request.onerror = () => {
      // Also deal with the case when the entire request fails to begin with
      // This is probably a network error, so reject the promise with an appropriate message
      reject(Error('There was a network error.'));
    };

    // url encode form data for sending as post data
    const encodedFormData = Object.keys(formData).map((k) =>
      `${encodeURIComponent(k)}=${encodeURIComponent(formData[k])}`
    ).join('&');

    // Send the request
    request.send(encodedFormData);
  });
}

// @todo should only re-render if form has been modified
class ContactForm extends React.Component {
  constructor(props) {
    super(props);

    this.fieldRefs = {};

    this.state = {

      // Form's field values
      input: {
        name: '',
        companyName: '',
        phone: '',
        email: '',
        emailConfirm: '',
        comment: ''
      },

      // Form's failed submission error message
      error: '',

      // Is the form currently "loading"? (i.e., is it submitting?)
      loading: false,

      // Has the form been submitted?
      submitted: false,

      // Keep track of which form fields have been "touched" (i.e., received focus and then blurred)
      touched: {
        name: false,
        companyName: false,
        phone: false,
        email: false,
        emailConfirm: false,
        comment: false
      },

      // Has the form been validated?
      validated: false
    };

    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // const fieldRefs = this.fieldRefs;
    // ...do something with component
  }

  /**
   * Handle form field blur events
   *
   * @param event
   */
  handleBlur(event) {
    // Flag this field as having been "touched"
    this.setState({
      touched: { ...this.state.touched, [event.target.name]: true }
    });
  };

  /**
   * Handle form field change events
   *
   * @param event
   */
  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    // console.log('handleChange', {target, value, name});

    target.classList.add('active');

    // If field has empty value, then show placeholder
    target.classList[value ? 'remove' : 'add']('placeholder-shown');
    // console.log(target.classList);

    // Store input's value in form's state
    this.setState({
      input: { ...this.state.input, [name]: value }
    });
  }

  /**
   * Handle form submit event
   *
   * @param e
   */
  handleSubmit(e) {
    const that = this;

    // Prevent default form submission logic (i.e., ignore the "action" attribute)
    e.preventDefault();

    // Flag all fields as having been "touched", which has the intended side-effect of
    // displaying validation errors for each field.
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

    // console.log('component state', JSON.stringify(this.state.input));

    // Can the form be submitted? All required input is present and valid?
    if (!this.canBeSubmitted()) {
      // console.log('Form is invalid! :( Aborting submission.');
      return;
    }

    // console.log('Form is valid. :) Proceeding with submission');
    this.setState({ validated: true, loading: true });

    const formPayload = this.state.input;

    // Submit form
    submitForm(formPayload)
      .then(() => {
        // Hide form; replace with "Thank you" message
        that.setState({ loading: false, submitted: true });
      })
      .catch(() => {
        // Show error to user
        // console.error(error);
        that.setState({
          loading: false,
          submitted: false,
          validated: false,
          error: 'An error occurred while trying to submit the form. Please try again. If the error persists, then please email us at <a href="mailto:help@kitsuneanalytics.com">help@kitsuneanalytics.com</a>.'
        });
      });
  }

  validateField(fieldName) {
    const validity = this.fieldRefs[fieldName].validity;
    const label = document.querySelector(`label[for="contact-${fieldName}"]`).textContent;
    const isEmail = fieldName.indexOf('email') !== -1;
    const isEmailConfirm = fieldName === 'emailConfirm';

    if (isEmailConfirm) { // } || (refName === 'email' && this.refs.emailConfirm.value)) {
      if (this.fieldRefs.email.value !== this.fieldRefs.emailConfirm.value) {
        // console.log(this.refs.email.value, this.refs.emailConfirm.value);
        this.fieldRefs.emailConfirm.setCustomValidity('Email addresses do not match');
      } else {
        this.fieldRefs.emailConfirm.setCustomValidity('');
      }
    }

    if (!validity.valid) {
      if (validity.valueMissing) {
        return `${label} is a required field`;
      } else if (isEmail && validity.typeMismatch) {
        return `${label} should be a valid email address`;
        // } else if (isPassword && validity.patternMismatch) {
        //  error.textContent = `${label} should be longer than 4 chars`;
      } else if (isEmailConfirm && validity.customError) {
        return 'Email addresses do not match';
      }
    }

    return '';
  }

  validate() {
    // console.log('validate', Object.keys(this.refs));
    if (Object.keys(this.fieldRefs).length === 0) {
      return {};
    }

    const errors = {};

    // Object.keys(this.state.input).map(this.validateField.bind(this));
    Object.keys(this.state.input).forEach((fieldName) => {
      errors[fieldName] = this.validateField(fieldName);
    });

    // console.log('errors', errors);

    return errors;
  }

  canBeSubmitted() {
    // console.log('canBeSubmitted?');
    const errors = this.validate();
    const formHasErrors = Object.keys(errors).some(x => errors[x]);
    return !formHasErrors;
  }

  render() {
    // console.log('render');
    const errors = this.validate();
    const formHasErrors = Object.keys(errors).some(x => errors[x]);
    const allTouched = Object.keys(this.state.touched).every(x => this.state.touched[x]);
    const loading = this.state.loading;
    const validated = this.state.validated;
    const submitted = this.state.submitted;
    const submitError =  this.state.error;
    const formClassNames = [
      'collapsible-wrapper',
      loading ? 'loading' : '',
      validated ? 'validated' : '',
      formHasErrors ? '' : 'submittable',
      submitted ? 'submitted collapsed' : '',
      submitError ? 'submitError' : ''
    ];

    const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];

      // return hasError ? shouldShow : false;
      return hasError && shouldShow;
    };

    return (
      <form
        id="contact-form"
        className={formClassNames.join(' ')}
        onSubmit={this.handleSubmit}
        noValidate
      >

        <Loader loading={loading} />

        <Alert type="error" message={submitError} />

        <div className="collapsible">
          <div className={`form-group ${shouldMarkError('name') ? 'error' : ''}`}>
            <input
              className="form-control placeholder-shown"
              type="text"
              id="contact-name"
              name="name"
              ref={(c) => { this.fieldRefs.name = c; }}
              value={this.state.input.name}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              required
            />
            <label htmlFor="contact-name">Name</label>
            <div className="error-message" id="name-error">{errors.name}</div>
          </div>
          <div className={`form-group ${shouldMarkError('companyName') ? 'error' : ''}`}>
            <input
              className="form-control placeholder-shown"
              type="text"
              id="contact-companyName"
              name="companyName"
              ref={(c) => { this.fieldRefs.companyName = c; }}
              value={this.state.input.companyName}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
            />
            <label htmlFor="contact-companyName">Company Name</label>
            <div className="error-message" id="companyName-error">{errors.companyName}</div>
          </div>
          <div className={`form-group ${shouldMarkError('phone') ? 'error' : ''}`}>
            <input
              className="form-control placeholder-shown"
              type="phone"
              id="contact-phone"
              name="phone"
              ref={(c) => { this.fieldRefs.phone = c; }}
              value={this.state.input.phone}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
            />
            <label htmlFor="contact-phone">Phone</label>
            <div className="error-message" id="phone-error">{errors.phone}</div>
          </div>
          <div className={`form-group ${shouldMarkError('email') ? 'error' : ''}`}>
            <input
              className="form-control placeholder-shown"
              type="email"
              id="contact-email"
              name="email"
              ref={(c) => { this.fieldRefs.email = c; }}
              value={this.state.input.email}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              required
            />
            <label htmlFor="contact-email">Email</label>
            <div className="error-message" id="email-error">{errors.email}</div>
          </div>
          <div className={`form-group ${shouldMarkError('emailConfirm') ? 'error' : ''}`}>
            <input
              className="form-control placeholder-shown"
              type="email"
              id="contact-emailConfirm"
              name="emailConfirm"
              ref={(c) => { this.fieldRefs.emailConfirm = c; }}
              value={this.state.input.emailConfirm}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              required
            />
            <label htmlFor="contact-emailConfirm">Confirm Email</label>
            <div className="error-message" id="emailConfirm-error">{errors.emailConfirm}</div>
          </div>
          <div className={`form-group ${shouldMarkError('comment') ? 'error' : ''}`}>
            <textarea
              className="form-group placeholder-shown"
              id="contact-comment"
              name="comment"
              ref={(c) => { this.fieldRefs.comment = c; }}
              value={this.state.input.comment}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
            />
            <label htmlFor="contact-comment">Comment</label>
            <div className="error-message" id="comment-error">{ errors.comment }</div>
          </div>
          <button
            className={`btn btn-primary btn-submit ${formHasErrors && allTouched ? 'btn-error' : ''} ${validated ? 'btn-success' : ''}`}
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        </div>

        <ContactFormThankYou />

      </form>
    );
  }
}

export default ContactForm;
