import React from 'react';
import HeroBlock from '../ucm-components/hero-block';
import BannerBlock from '../ucm-components/banner-block';
import { RenderProps } from "../../typescript/component";

export default function RenderBlocks(props: RenderProps) {
  const { pageComponents, entryUid, contentTypeUid, locale } = props;
  return (
    <div
      data-pageref={entryUid}
      data-contenttype={contentTypeUid}
      data-locale={locale}
    >
      {pageComponents?.map((component, key: number) => {
        //HeroBlock Component
        if (component.dynamic_block?.configuration[0]?.component_name === 'AS_ASCOM_Homepage_Primary_Merchandising_Flight-Deal') {
          return (
            <HeroBlock {...component.dynamic_block} key={`component-${key}`} />
          );
        }
        //HeroBlock Component

        //BannerBlock Component
        if (component.dynamic_block?.configuration[0]?.component_name === 'AS_ASCOM_Homepage_Secondary_Merchandising_Flight-Deal') {
          return (
            <BannerBlock {...component.dynamic_block} key={`component-${key}`} />
          );
        }
        //BannerBlock Component
      })}
    </div>
  );
}
