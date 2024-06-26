import Stack from '../contentstack-sdk';
import { addEditableTags } from '@contentstack/utils';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const envConfig = process.env.CONTENTSTACK_API_KEY
  ? process.env
  : publicRuntimeConfig;

const liveEdit = envConfig.CONTENTSTACK_LIVE_EDIT_TAGS === 'true';

export const getHeaderRes = async () => {
  const response = await Stack.getEntry({
    contentTypeUid: 'header',
    referenceFieldPath: ['navigation_menu.page_reference'],
    jsonRtePath: ['notification_bar.announcement_text'],
  });

  liveEdit && addEditableTags(response[0][0], 'header', true);
  return response[0][0];
};

export const getFooterRes = async () => {
  const response = await Stack.getEntry({
    contentTypeUid: 'footer',
    referenceFieldPath: undefined,
    jsonRtePath: ['copyright'],
  });
  liveEdit && addEditableTags(response[0][0], 'footer', true);
  return response[0][0];
};

export const getAllEntries = async () => {
  const response = await Stack.getEntry({
    contentTypeUid: 'page',
    referenceFieldPath: undefined,
    jsonRtePath: undefined,
  });
  liveEdit &&
    response[0].forEach((entry) => addEditableTags(entry, 'page', true));
  return response[0];
};

export const getPageRes = async (entryUrl) => {
  const response = await Stack.getEntryByUrl({
    contentTypeUid: 'page',
    entryUrl,
    referenceFieldPath: ['page_components.from_blog.featured_blogs'],
    jsonRtePath: [
      'page_components.from_blog.featured_blogs.body',
      'page_components.section_with_buckets.buckets.description',
      'page_components.section_with_html_code.description',
    ],
  });
  liveEdit && addEditableTags(response[0], 'page', true);
  return response[0];
};

export const getAlaskaPageRes = async (entryUrl) => {
  const response = await Stack.getEntryByUrl({
    contentTypeUid: 'alaska_airlines',
    entryUrl,
    referenceFieldPath: [
      'content_blocks.dynamic_block.data',
      'content_blocks.dynamic_block.configuration',
      'content_blocks.dynamic_block.data.related_campaigns.campaign',
      'content_blocks.generic_block.configuration',
      'content_blocks.generic_block.data',
    ],
    jsonRtePath: [],
  });
  liveEdit && addEditableTags(response[0], 'alaska_airlines', true);
  return response[0];
};


export const fetchOrchestratedOffer = async (offerId) => {
  try {
      const response = await fetch(`https://dummy-offer-orchestration.vercel.app/personalized/${offerId}`);
      if (response.ok) {
          const data = await response.json();
          return data;
      } else {
          console.error('Error fetching data. Status code:', response.status);
      }
  } catch (error) {
      console.error('An error occurred while fetching data:', error.message);
  }
};

export const fetchFlightDeals = async (origin, destination) => {
  try {
      const response = await fetch(`https://dummy-offer-orchestration.vercel.app/flight-deals/${origin}/${destination}`);
      // const response = await fetch(`https://dummy-offer-orchestration.vercel.app/flight-deals`);
      if (response.ok) {
          const data = await response.json();
          return data;
      } else {
          console.error('Error fetching data. Status code:', response.status);
      }
  } catch (error) {
      console.error('An error occurred while fetching data:', error.message);
  }
};

export const getBlogListRes = async () => {
  const response = await Stack.getEntry({
    contentTypeUid: 'blog_post',
    referenceFieldPath: ['author', 'related_post'],
    jsonRtePath: ['body'],
  });
  liveEdit &&
    response[0].forEach((entry) => addEditableTags(entry, 'blog_post', true));
  return response[0];
};

export const getBlogPostRes = async (entryUrl) => {
  const response = await Stack.getEntryByUrl({
    contentTypeUid: 'blog_post',
    entryUrl,
    referenceFieldPath: ['author', 'related_post'],
    jsonRtePath: ['body', 'related_post.body'],
  });
  liveEdit && addEditableTags(response[0], 'blog_post', true);
  return response[0];
};
