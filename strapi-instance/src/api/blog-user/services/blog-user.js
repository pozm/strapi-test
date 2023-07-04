'use strict';

/**
 * blog-user service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::blog-user.blog-user');
