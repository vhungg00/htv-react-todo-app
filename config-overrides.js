const {override, addWebpackAlias} = require('customize-cra');

const aliasConfig = require('./config/webpack.alias');
const hasAlias = aliasConfig && aliasConfig.resolve && aliasConfig.resolve.alias;

module.exports = override(hasAlias && addWebpackAlias(aliasConfig.resolve.alias))