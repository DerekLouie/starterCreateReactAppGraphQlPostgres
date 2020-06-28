const bcrypt = require('bcrypt');
const { validEmail, validPhoneNumber } = require('./helpers/dataValidators');
const { getAccessToken } = require('./helpers/getAccessToken');
const { AuthenticationError } = require('apollo-server-express');
const isEmpty = require('lodash/isEmpty');

const publicUserKeys = ['name', 'email', 'phone_number', 'id'];
const allUserKeys = [...publicUserKeys, 'password'];

const GENERIC_LOGIN_ERROR = 'No user with that login info could be found';

const ensureAuth = (req) => {
  if (isEmpty(req.user)) {
    throw new AuthenticationError('Must authenticate');
  }
};

const getResolvers = ({ db }) => {
  return {
    Query: {
      async me(_, args, { req }) {
        ensureAuth(req);

        const user_id = req.user.id;

        const [user] = await db('users')
          .where('id', user_id)
          .select(...publicUserKeys);

        return user;
      },
    },
    Mutation: {
      async signup(_, { name, email, phone_number, password }) {
        let user = {};

        if (!validEmail(email)) {
              throw new Error('Invalid email');
        }

        if (!validPhoneNumber(phone_number)) {
              throw new Error('Invalid phone number');
        }

        try {
          [user] = await db('users').insert(
            {
              name,
              email,
              phone_number,
              password: await bcrypt.hash(password, 10),
            },
            publicUserKeys
          );
        } catch (e) {
          switch (e.constraint) {
            case 'users_phone_number_unique':
              throw new Error('The phone number you entered already is registered to another account');
            case 'users_email_unique':
              throw new Error('The email you entered already is registered to another account');
            default:
              throw e;
          }
        }

        return { ...user, tokens: getAccessToken(user) };
      },
      async login(_, { login_credential, password }) {
        let user;

        const phoneNumberLogin = !isNaN(parseInt(login_credential, 10));

        try {
          if (phoneNumberLogin) {
            [user] = await db('users')
              .where({ phone_number: login_credential })
              .select(...allUserKeys);
          } else {
            [user] = await db('users')
              .where({ email: login_credential })
              .select(...allUserKeys);
          }
        } catch (e) {
          // TODO: Better error handling
          throw new Error(GENERIC_LOGIN_ERROR);
        }

        if (!user) {
          throw new Error(GENERIC_LOGIN_ERROR);
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
          throw new Error(GENERIC_LOGIN_ERROR);
        }

        return { ...user, tokens: getAccessToken(user) };
      },
    },
  };
};

module.exports = {
  getResolvers,
};
