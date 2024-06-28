import React from 'react';
import { StaticBlockProp } from '../../typescript/component';
import { reduceConfig } from '../../util/ucmConfigHandler';
import { ucmDataHandler } from '../../util/ucmDataHandler';

export default function StaticBlock(props: StaticBlockProp) {

  const { teaser, headline, subheadline, description, fineprint, media, icons, button, hyperlink, items, related_campaigns } = props;

  const newData = {
    teaser: {...teaser},
    headline: {...headline},
    subheadline: {...subheadline},
    description: {...description},
    fineprint: {...fineprint},
    media: {...media},
    icons: {...icons},
    button: {...button},
    hyperlink: {...hyperlink},
    items: {...items},
    related_campaigns: {...related_campaigns},
  }

  const { remainingFields } = reduceConfig(
    props.configuration[0]?.directives
  );

  console.log('newData: ', newData);
  console.log('remainingFields: ', remainingFields);
  
  return (
    <div className="static static-block">
      <div className="block-wrapper">
          {ucmDataHandler(remainingFields, newData)}
      </div>
    </div>
  );
}
