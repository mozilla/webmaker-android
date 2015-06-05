module.exports = {

  validators: {
    email: {
      regex: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
      message: 'Please use a valid email address.'
    },
    passwordLength: {
      regex: /^\S{8,128}$/,
      message: 'Must be between 8 and 128 characters.'
    },
    lowerCase: {
      regex: /[a-z]+/,
      message: 'Must contain a lower case letter.'
    },
    upperCase: {
      regex: /[A-Z]+/,
      message: 'Must contain an upper case letter.'
    },
    numbers: {
      regex: /\d+/,
      message: 'Must contain a number.'
    },
    username: {
      regex: /^[a-zA-Z0-9\-]{1,20}$/,
      message: 'Must be 1-20 characters long and use only "-" and alphanumeric symbols.'
    }
  },

  // Looks at this.fields, and returns an object of errors
  // keyed on field.name
  //
  // e.g. this.fields should look like:
  // [{
  //   name: 'username',
  //   label: 'Username',
  //   required: true,
  //   validations: 'username'
  // },
  // {
  //   name: 'email',
  //   label: 'Email',
  //   type: 'email',
  //   required: true,
  //   validations: 'email'
  // },
  // {
  //   name: 'password',
  //   label: 'Password',
  //   type: 'password',
  //   required: true,
  //   validations: ['passwordLength', 'lowerCase', 'upperCase', 'numbers']
  // }]

  getValidationErrors: function () {
    var errors = {};
    var fields = this.fields;

    if (!fields) {
      return errors;
    }

    fields.forEach(fieldData => {

      var field = fieldData.name;
      var value = this.state[field];
      var isRequired = fieldData.required;
      var isEmpty = !value && value !== 0;
      var validations = fieldData.validations;

      // Required
      if (isRequired && isEmpty) {
        errors.requiredFieldsMissing = true;
      }

      // Custom Validation
      if (validations) {
        if (typeof validations === 'string') {
          validations = [validations];
        }
        validations.forEach(type => {
          var validation = this.validators[type];
          var errorMessage = validation.message;
          var regex = validation.regex;

          // Test the value if it is non-emptynpm tun
          if (!isEmpty && !regex.test(value)) {
            errors[field] = errors[field] || [];
            errors[field].push(errorMessage);
          }
        });
      }

    });

    return errors;
  }
};
