import React from 'react';
import { GenericBlockProp, Link } from '../../typescript/component';
import { reduceConfig, reduceData } from '../../util/ucmConfigHandler';
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
  const { dataObjects } = reduceData(data[0]?.generic_content);

  // console.log('newData: ', newData);
  console.log('dataObjects: ', JSON.stringify(dataObjects));


  const createIcons = (iconsArray: []) => {
    return iconsArray.map((icon : any) => {
      return (<div key={icon.title} className="icon" ><img  src={icon.url} alt="" /></div>);
    })
  }

  const createHyperlink = (linkObject: Link) => {
    return (<p className="hyperlink" ><a href={linkObject?.href} target="_blank">{linkObject?.title}</a></p>);
  }

  return (
    <div className="static static-block">
      <div className="block-wrapper">
        {
          Object.entries(remainingFields).map(([key]) => {
            if(!dataObjects[key]) return null;
            if(key === 'icons') return createIcons(dataObjects[key]?.media);
            if(key === 'hyperlink') return createHyperlink(dataObjects[key]);
            return(<div key={key} className={key} dangerouslySetInnerHTML={{__html: dataObjects[key]?.text}} />)
          })
        }
      </div>
    </div>
  );
}
