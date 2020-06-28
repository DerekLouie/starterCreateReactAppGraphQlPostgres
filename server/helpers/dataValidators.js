const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

// Email Validator.
// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
const validEmail = (email) => {
    return re.test(String(email).toLowerCase());
}

// [BASIC] US Phone Number Validator.
// Does not account for valid area codes / number combinations etc.
const validPhoneNumber = (phone_number) => {
    return (phone_number + '').length === 10 && !isNaN(parseInt(phone_number));
}

module.exports = {
  validPhoneNumber,
  validEmail,
};
