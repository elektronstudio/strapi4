"use strict";

/**
 *  project controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const axios = require("axios");
const { sanitize } = require("@strapi/utils");
const { contentAPI } = sanitize;

module.exports = createCoreController("api::project.project");
