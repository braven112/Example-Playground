import React from 'react';
import { DynamicBlock} from "../../typescript/component";
import { ucmConfigHandler } from "../../util/ucmConfigHandler";
import { ucmDataHandler } from "../../util/ucmDataHandler";



export default function BannerBlock(props: DynamicBlock) {

  const { ucm, configuration } = props;
  const { media, remainingFields } = ucmConfigHandler(configuration[0]?.directives);
  console.log(ucm)

  const { ucm_value_to_use } = media.media;

  console.log('ucm_value_to_use: ', ucm_value_to_use);

  // const mediaPropertyName = Object.keys(media)[0];
  // const mediaUrl = Object.values(media)[0]?.ucm_value_to_use;
  // const backgroundImageUrl = `${componentData[mediaPropertyName][mediaUrl]?.url}?format=webp&width=2000`;

  return (
    <div className="banner-block">
      <div className="grid-container">
        <div className="grid-item">
          {ucmDataHandler(remainingFields, ucm[0])}
        </div>
        <div className="grid-item">
          <img src={`${ucm_value_to_use == 'primary' ? ucm[0]?.media['primary']?.url : ''}?format=webp&width=2000`} alt="" />
        </div>
      </div>
    </div>
  );
}
