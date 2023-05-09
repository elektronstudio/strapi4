"use strict";

/**
 *  project controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const axios = require("axios");
const { sanitize } = require("@strapi/utils");
const { contentAPI } = sanitize;

async function findMediaUrl(id) {
  const axios = require("axios");

  const options = {
    method: "GET",
    url: `https://cdn.jwplayer.com/v2/media/${id}?sources=hls`,
    headers: { accept: "application/json; charset=utf-8" },
  };

  try {
    const response = await axios.request(options);
    return response.data?.playlist[0]?.sources[0]?.file;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function findLiveStreams() {
  const options = {
    method: "GET",
    url: "https://api.jwplayer.com/v2/sites/g7eIo9c5/channels/cW8cP8d5/events/?page=1&page_length=10&q=status%3A%20active&sort=created%3Adsc",
    headers: {
      accept: "application/json",
      Authorization: `bearer ${process.env.JWPLAYER_KEY}`,
    },
  };

  try {
    const response = await axios.request(options);

    if (response.data.events.length > 0) {
      const liveStream = response.data.events[0];
      const mediaData = await findMediaUrl(liveStream.id);
      return mediaData;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = createCoreController("api::project.project", {
  async find(ctx) {
    const { query } = ctx;
    // @ts-ignore
    if (!query.filters) query.filters = {};
    // @ts-ignore
    const streamableEvents = await strapi.entityService.findOne(
      "api::streamable-events.streamable-events",
      1,
      {
        populate: {
          projects: {
            fields: ["id"],
          },
        },
      }
    );

    const entities = await strapi.entityService.findMany(
      "api::project.project",
      query
    );

    const liveStreams = await findLiveStreams();

    const processEntities = entities.map((item) => {
      const streamAllowed = streamableEvents.projects.some(
        (project) => project.id === item.id
      );
      return {
        ...item,
        live: streamAllowed ? liveStreams : null,
      };
    });

    return this.transformResponse(processEntities);
  },
});
