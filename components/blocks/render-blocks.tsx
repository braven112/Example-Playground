import React from 'react';
import HeroBlock from '../ucm-components/hero-block';
import BannerBlock from '../ucm-components/banner-block';
import StaticBlock from '../ucm-components/static-block';
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
        //StaticBlock Handler
        if (component.static_block?.configuration[0]?.component_name === 'AS_ASCOM_Static_Block') {
          return (
            <StaticBlock {...component.static_block} key={`component-${key}`} />
          );
        }
        //StaticBlock Handler
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
