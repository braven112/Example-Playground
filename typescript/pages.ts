import { Component } from '../typescript/component';
import { Image } from '../typescript/action';
import { Entry, HeaderProps, FooterProps } from './layout';

type AdditionalParam = {
  title: string;
  title_h2: string;
  title_h3: string;
  description: string;
  banner_title: string;
  banner_description: string;
  designation: string;
  name: string;
  html_code: string;
  body: string;
  date: string;
  related_post: [];
  copyright: string;
  announcement_text: string;
  label: {};
  url: string;
};

type Post = {
  url: string;
  is_archived: boolean;
  body: string;
  featured_image: Image;
  title: string;
  date: string;
  author: [Author];
  $: AdditionalParam;
};

type Author = {
  title: string;
  $: AdditionalParam;
};

type PageProps = {
  page: Page;
  posts: [];
  archivePost: [];
  blogPost: BlogPosts;
};

type Seo = {
  enable_search_indexing: boolean;
};

type Blog = {
  url: string;
  body: string;
  title: string;
  $: AdditionalParam;
};

export type FlightDeals = {
  dealCode?: string;
  showAsDefault?: boolean;
  originShort?: string;
  origin?: string;
  destinationShort?: string;
  destination?: string;
  purchaseBy?: string;
  saverRevenue?: number;
  mainRevenue?: number;
  miles?: number;
  fee?: number;
  activate?: Date;
  deactivate?: Date;
  startDate?: Date;
  endDate?: Date;
  fareRules?: string;
}

export type OptimizelyDataObject = {
  userId: string;
  decision_enabled: boolean;
  variationKey: string;
  sortMethod: string;
  decision_ruleKey: string;
}

export type Props = {
  page: Page;
  flightDeals?: FlightDeals;
  entryUrl: string;
  Component: Function;
  entries: Entry;
  pageProps: PageProps;
  header: HeaderProps;
  footer: FooterProps;
  optimizelyDecision: OptimizelyDataObject;
};

export type Page = {
  page_components: Component[];
  content_blocks: Component[];
  uid: string;
  locale: string;
  url: string;
  seo: Seo;
  title: string;
};

export type Context = {
  resolvedUrl: string;
  query: {
    offer: string;
    page: string;
  };
  setHeader: Function;
  write: Function;
  end: Function;
  optimizelyDecision: OptimizelyDataObject;
};

export type Pages = [page: Page];

export type PostPage = [post: Post];

export type PageUrl = {
  pageUrl: string;
};

export type BlogPosts = {
  title: string;
  date: string;
  body: string;
  author: [Author];
  related_post: [Blog];
  locale: string;
  featured_image: Image;
  is_archived: boolean;
  seo: Seo;
  url: string;
  _owner: string;
  $: AdditionalParam;
};
