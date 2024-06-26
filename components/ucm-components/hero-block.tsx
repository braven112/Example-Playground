import React from 'react';
import { DynamicBlock} from "../../typescript/component";
import { ucmConfigHandler } from "../../util/ucmConfigHandler";
import { ucmDataHandler } from "../../util/ucmDataHandler";


export default function HeroBlock(props: DynamicBlock) {
  const { ucm, configuration } = props;
  const { media, remainingFields } = ucmConfigHandler(configuration[0]?.directives);

  return (
    <div
      className="hero-block"
      style={{
        backgroundImage: `url("${ucm[0]?.media?.primary?.url}")`,
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
