/* eslint-disable no-unused-vars */
const {
  MIN_NAME_CHARS,
  MAX_NAME_CHARS,
  MIN_TITLE_CHARS,
  MAX_TITLE_CHARS,
  MIN_DESCRIPTION_CHARS,
  MAX_DESCRIPTION_CHARS,
  MAX_EMAIL_CHARS,
  MAX_PHONE_CHARS,
} = require('./consts');

const nameValidator = [
  {
    validator(v, x, z) {
      return !(this.name.length < MIN_NAME_CHARS);
    },
    message: (props) => `${props.value} #reason: name's char min length is ${MIN_NAME_CHARS}`,
  },
  {
    validator(v, x, z) {
      return !(this.name.length > MAX_NAME_CHARS);
    },
    message: (props) => `${props.value} #reason: name's char max length is ${MAX_NAME_CHARS}`,
  },
];

const titleValidator = [
  {
    validator(v, x, z) {
      return !(this.title.length < MIN_DESCRIPTION_CHARS);
    },
    message: (props) => `${props.value} #reason: title's char min length is ${MIN_DESCRIPTION_CHARS}`,
  },
  {
    validator(v, x, z) {
      return !(this.title.length > MAX_DESCRIPTION_CHARS);
    },
    message: (props) => `${props.value} #reason: title's char max length is ${MAX_DESCRIPTION_CHARS}`,
  },
];

const descriptionValidator = [
  {
    validator(v, x, z) {
      return !(this.description.length < MIN_TITLE_CHARS);
    },
    message: (props) => `${props.value} #reason: description's char min length is ${MIN_TITLE_CHARS}`,
  },
  {
    validator(v, x, z) {
      return !(this.description.length > MAX_TITLE_CHARS);
    },
    message: (props) => `${props.value} #reason: description's char max length is ${MAX_TITLE_CHARS}`,
  },
];

const emailValidator = [
  {
    validator(v, x, z) {
      return !(this.email.length > MAX_EMAIL_CHARS);
    },
    message: (props) => `${props.value} #reason: email's char max length is ${MAX_EMAIL_CHARS}`,
  },
];

const phoneValidator = [
  {
    validator(v, x, z) {
      return !(this.phone.length > MAX_PHONE_CHARS);
    },
    message: (props) => `${props.value} #reason: phone's char max length is ${MAX_PHONE_CHARS}`,
  },
];

const validatorGetReason = (msg) => {
  const word = '#reason: ';
  const index = msg.indexOf(word);
  const { length } = word;

  const result = msg.slice(index + length);
  return result;
};

module.exports = {
  nameValidator,
  titleValidator,
  descriptionValidator,
  emailValidator,
  phoneValidator,
  validatorGetReason,
};
