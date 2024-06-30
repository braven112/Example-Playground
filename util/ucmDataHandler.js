
const ucmDataHandler = (remainingFields, componentData) => {
  
    return Object.entries(remainingFields).map(([key, value]) => {
      if(key === 'teaser') return <span key={key} className={key} dangerouslySetInnerHTML={{__html: componentData[key][value.ucm_value_to_use]}} />;
      if(key === 'headline')  return <h1 key={key} className={key} dangerouslySetInnerHTML={{__html: componentData[key][value.ucm_value_to_use]}} />;
      if(key === 'subheadline') return <h2 key={key} className={key} dangerouslySetInnerHTML={{__html: componentData[key][value.ucm_value_to_use]}} />;
      if(key === 'description' || key === 'fineprint') return <p key={key} className={key} dangerouslySetInnerHTML={{__html: componentData[key][value.ucm_value_to_use]}} />;
      if(key === 'button')
        return <p key={key} className={key} dangerouslySetInnerHTML={{__html: `
            <auro-hyperlink
              href={${componentData[key][value.ucm_value_to_use[0]].href}}
              target="_self"
              ariaLabel={${componentData[key][value.ucm_value_to_use[2]].href}}
              type="cta"
            >
              ${componentData[key][value.ucm_value_to_use[0]].title}
            </auro-hyperlink>
          `}} />
      if(key === 'price') 
        return(
          <h3 key={key} className="price-point" dangerouslySetInnerHTML={{__html: `
              ${value.ucm_value_to_use === 'miles' 
                ? `${componentData["lowestFare"][value.ucm_value_to_use]} miles one way` 
                : `$${componentData["lowestFare"][value.ucm_value_to_use]} one way`}
          `}} />
        )
      return null;
    });
  };
  
  module.exports = { ucmDataHandler };
