import React from 'react';
import { DynamicBlock } from '../../typescript/component';
import { ucmConfigHandler } from '../../util/ucmConfigHandler';
import { ucmDataHandler } from '../../util/ucmDataHandler';

export default function HeroBlock(props: DynamicBlock) {
  const { ucm, configuration } = props;
  const { media, remainingFields } = ucmConfigHandler(
    configuration[0]?.directives
  );
  const { ucm_value_to_use } = media.media;

  return (
    <div
      className="dynamic hero-block"
      style={{
        backgroundImage: `url("${
          ucm_value_to_use == 'primary'
            ? ucm[0]?.media['primary']?.url
            : ucm[0]?.media['secondary']?.url
        }?format=webply&width=2000")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <div className="grid-container">
        <div className="grid-item">
          {ucmDataHandler(remainingFields, ucm[0])}
        </div>
        <div className="grid-item"></div>
      </div>
    </div>
  );
}
