/**
 * Module dependencies
 */
var pivot = require("pivot")
  , lookup = require("pivot-lookup-redis")
  , assign = require("pivot-assign");

/**
 * Expose experiments
 */
var experiments = module.exports = pivot();

/**
 * Retrieve feature settings from redis
 */
experiments.lookup(lookup("pivot-example"));

/**
 * Tells pivot which variant gets assigned to the user
 */
experiments.assign(assign());
