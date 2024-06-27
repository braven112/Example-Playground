import React from 'react';
import { DynamicBlock } from '../../typescript/component';
import { ucmConfigHandler } from '../../util/ucmConfigHandler';
import { ucmDataHandler } from '../../util/ucmDataHandler';

export default function BannerBlock(props: DynamicBlock) {
  const { ucm, configuration } = props;
  const { media, remainingFields } = ucmConfigHandler(
    configuration[0]?.directives
  );
  const { ucm_value_to_use } = media.media;

  return (
    <div className="banner-block">
      <div className="grid-container">
        <div className="grid-item">
          {ucmDataHandler(remainingFields, ucm[0])}
        </div>
        <div className="grid-item">
          <auro-background
            slot="graphic"
            alt="Palm trees next to a pool."
            height="300px"
            heightsm="350px"
            heightmd="350px"
            bg={`url(${
              ucm_value_to_use == 'primary'
                ? ucm[0]?.media['primary']?.url
                : ucm[0]?.media['secondary']?.url
            }?format=webply&width=800) center center/cover no-repeat`}
          ></auro-background>
        </div>
      </div>
    </div>
  );
}
