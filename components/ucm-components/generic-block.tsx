import React from 'react';
import { GenericBlockProp, Link, ContentstackImage } from '../../typescript/component';
import { reduceConfig, reduceData } from '../../util/ucmConfigHandler';

export default function GenericBlock(props: GenericBlockProp) {
  const { configuration, data } = props;
  const { remainingFields } = reduceConfig(configuration[0]?.directives);
  const { dataObjects } = reduceData(data[0]?.generic_content);

  const createListItems = (listItemsArray: []) => {
    return(
      <ul className='list-items' key="list-item">
        {
          listItemsArray.map((item : any) => {
            return (
              <li key={item.link.title} dangerouslySetInnerHTML={{__html: item.text}} />
            );
          })
        }
    </ul>
    )
  }

  const createImage = (image: ContentstackImage) => {
    return (<div className="image" key={image.url}><img  src={image?.url} style={{maxWidth: '100%'}} alt="" /></div>);
  }

  const createIcons = (iconsArray: []) => {
    return iconsArray.map((icon : any) => {
      return (<div key={icon.title} className="icon" ><img  src={icon.url} alt=""  /></div>);
    })
  }

  const createHyperlink = (linkObject: Link) => {
    return <p key={linkObject?.title} className="hyperlink" ><auro-hyperlink type="cta" href={linkObject?.href} target="_blank">{linkObject?.title}</auro-hyperlink></p>;
  }

  const createButton = (linkObject: Link) => {
    return <p className="hyperlink" key={linkObject?.title}><auro-button type="cta" target="_blank">{linkObject?.title}</auro-button></p>;
  }

  return (
    <div className="static static-block">
      <div className="block-wrapper">
        {
          Object.entries(remainingFields).map(([key]) => {
            // console.log('key: ', key)
            if(!dataObjects[key]) return null;
            if(key === 'media') return createImage(dataObjects[key].image);
            if(key === 'list_items') return createListItems(dataObjects[key]?.items);
            if(key === 'icons') return createIcons(dataObjects[key]?.media);
            if(key === 'hyperlink') return createHyperlink(dataObjects[key]?.link);
            if(key === 'button') return createButton(dataObjects[key]?.link);
            return(<div key={key} className={key} dangerouslySetInnerHTML={{__html: dataObjects[key]?.text}} />)
          })
        }
      </div>
    </div>
  );
}
