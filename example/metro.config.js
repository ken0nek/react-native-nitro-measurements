const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const projectRoot = __dirname;
const libraryRoot = path.resolve(projectRoot, '..');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(projectRoot);

// Watch the library source in the parent directory
config.watchFolders = [libraryRoot];

// Resolve dependencies from the example's node_modules first,
// then fall back to the library's node_modules
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(libraryRoot, 'node_modules'),
];

module.exports = config;
