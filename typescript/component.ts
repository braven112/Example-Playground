import { Action, Image } from "./action";

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
}

type Employee = {
  image: Image;
  name: string;
  designation: string;
  $: AdditionalParam;
}

type BucketList = [
  BucketArray:{
    title_h3: string;
    description: string;
    url: string;
    call_to_action: Action;
    icon: Image;
    $: AdditionalParam;
  }
]

type Card = [
  cardArray: {
    title_h3: string;
    description: string;
    call_to_action: Action;
    $: AdditionalParam;
    }
]

type Article = {
  href: string;
  title: string;
  $: AdditionalParam;
}

type FeaturedBlog = [
  BlogArray: {
    title: string;
    featured_image: Image;
    body: string;
    url: string;
    $: AdditionalParam;
  }
]

type Widget = {
  title_h2: string;
  type?: string;
  $: AdditionalParam;
}

type Directives = [
  {
    ucm_value_to_use: string;
    background_color: ContentstackImage;
    text_color: string;
  }
]


export type ContentModelConfiguration = {
  component_name: string;
  directives: Directives;
  designation: string;
  $: AdditionalParam;
}

type ContentstackImage = {
  content_type: string;
  filename: string;
  url: string;
  uid: string;
}

type Items = {
  item_headline: string;
  item_subheadline: string;
  item_icon: ContentstackImage;
  item_copy: string;
  item_background: ContentstackImage;
  item_fineprint: string;
  item_link: {
    title: string;
    url: string;
  };
  item_override: string;
}

type Icons = {
  icon_headline: string;
  light_icon: ContentstackImage;
  dark_icon: ContentstackImage;
  icon_link: string;
}


export type UniversalContentModel = {
  title: string;
  teaser: {
    teaser_icon: ContentstackImage;
    teaser_headline: string;
    teaser_subheadline: string;
    teaser_copy: string;
  };
  headline: {
    lg_headline: string;
    md_headline: string;
    sm_headline: string;
    xs_headline: string;
  };
  subheadline: {
    lg_subheadline: string;
    md_subheadline: string;
    sm_subheadline: string;
    xs_subheadline: string;
  };
  description: {
    lg_description: string;
    md_description: string;
    sm_description: string;
    xs_description: string;
  };
  fineprint: {
    lg_fineprint: string;
    md_fineprint: string;
    sm_fineprint: string;
    xs_fineprint: string;
  };
  media: {
    primary: ContentstackImage;
    secondary: ContentstackImage;
  };
  button: {
    aria_label: string;
    link: {
      title: string;
      href: string;
    };
  };
  hyperlink: {
    aria_label: string;
    role: string;
    link: {
      title: string;
      href: string;
    };
  };
  related_campaigns: {
    campaign: [UniversalContentModel]
  };
  items: [Items];
  icons: [Icons];
  $: AdditionalParam;
}


export type Component = {
  hero_banner: Banner;
  section?: SectionProps;
  section_with_buckets?: SectionWithBucket;
  from_blog?: FeaturedBlogData;
  section_with_cards?: Cards;
  section_with_html_code?: AdditionalParamProps;
  our_team?: TeamProps;
  widget?: Widget;
  dynamic_block?: DynamicBlock;
}

export type DynamicBlock = {
  alias: string;
  configuration: [ContentModelConfiguration];
  ucm: [UniversalContentModel];
  $: AdditionalParam;
}

export type SectionWithBucket = {
    bucket_tabular: boolean
    title_h2: string;
    buckets: BucketList;
    description: string;
    $: AdditionalParam;
  }

export type Cards = {
    cards: Card;
  }
  
export type Banner = {
    banner_title:string;
    banner_description: string;
    bg_color: string;
    call_to_action: Action;
    banner_image: Image;
    text_color: string;
    $: AdditionalParam;
  }
  
export type AdditionalParamProps = {
    html_code_alignment: string;
    title: string;
    $: AdditionalParam;
    description: string;
    html_code: string;
  }
  
export type SectionProps = {
    title_h2: String;
    description: string;
    call_to_action: Action;
    image: Image;
    image_alignment: string;
    $: AdditionalParam;
  } 
  
export type TeamProps = {
    title_h2: string;
    description: string;
    $: AdditionalParam;
    employees: [Employee];
  }
  
export type FeaturedBlogData = {
    title_h2: string;
    view_articles: Article;
    featured_blogs: FeaturedBlog;
    $: AdditionalParam;
}

export type RenderProps = {
  blogPost?: boolean;
  contentTypeUid: string;
  entryUid: string;
  locale: string;
  pageComponents:Component[];
}