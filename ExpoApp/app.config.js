// Import the configuration from app.json
const config = require('./app.json');

// Export the merged configuration
module.exports = {
  ...config,
  extra: {
    ...config.expo.extra,
    apiUrl: "test"|| 'http://localhost:3000',
  },
};
