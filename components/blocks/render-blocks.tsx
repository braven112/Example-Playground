import React from 'react';
import HeroBlock from '../ucm-components/hero-block';
import BannerBlock from '../ucm-components/banner-block';
import GenericBlock from '../ucm-components/generic-block';
import { RenderProps } from '../../typescript/component';

export default function RenderBlocks(props: RenderProps) {
  const { pageComponents, entryUid, contentTypeUid, locale } = props;
  return (
    <div
      data-pageref={entryUid}
      data-contenttype={contentTypeUid}
      data-locale={locale}
    >
      {pageComponents?.map((component, key: number) => {
        //GenericBlock Handler
        if (
          component.generic_block?.configuration[0]?.component_name ===
          'AS_ASCOM_Generic_Block'
        ) {
          return (
            <GenericBlock
              {...component.generic_block}
              // data={component.generic_block.data[0]}
              // configuration={component.generic_block.configuration[0]}
              key={`component-${key}`}
            />
          );
        }
        //GenericBlock Handler
        //HeroBlock Component
        if (
          component.dynamic_block?.configuration[0]?.component_name ===
          'AS_ASCOM_Homepage_Primary_Merchandising_Flight-Deal'
        ) {
          return (
            <HeroBlock {...component.dynamic_block} key={`component-${key}`} />
          );
        }
        //HeroBlock Component

        //BannerBlock Component
        if (
          component.dynamic_block?.configuration[0]?.component_name ===
          'AS_ASCOM_Homepage_Secondary_Merchandising_Flight-Deal'
        ) {
          return (
            <BannerBlock
              {...component.dynamic_block}
              key={`component-${key}`}
            />
          );
        }
        //BannerBlock Component
      })}
    </div>
  );
}
