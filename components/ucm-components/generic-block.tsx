import React from 'react';
import { GenericBlockProp } from '../../typescript/component';
import { reduceConfig } from '../../util/ucmConfigHandler';
import { ucmDataHandler } from '../../util/ucmDataHandler';

export default function GenericBlock(props: GenericBlockProp) {
  const { configuration, data } = props;

  // console.log('configuration: ', JSON.stringify(configuration));
  // console.log('data: ', JSON.stringify(data));

  // const newData = {
  //   teaser: { ...teaser },
  //   headline: { ...headline },
  //   subheadline: { ...subheadline },
  //   description: { ...description },
  //   fineprint: { ...fineprint },
  //   media: { ...media },
  //   icons: { ...icons },
  //   button: { ...button },
  //   hyperlink: { ...hyperlink },
  //   items: { ...items },
  //   related_campaigns: { ...related_campaigns },
  // };

  const { remainingFields } = reduceConfig(configuration[0]?.directives);

  // console.log('newData: ', newData);
  console.log('remainingFields: ', remainingFields);

  return (
    <div className="static static-block">
      <div className="block-wrapper">
        {/* {ucmDataHandler(remainingFields, data)} */}
        GENERIC BLOCK
      </div>
    </div>
  );
}
