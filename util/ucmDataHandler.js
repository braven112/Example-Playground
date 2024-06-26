
const ucmDataHandler = (remainingFields, componentData) => {
    return Object.entries(remainingFields).map(([key, value]) => {
      switch (key) {
        case 'teaser':
          return (
            <span key={key}>{componentData[key][value.ucm_value_to_use]}</span>
          );
        case 'headline':
          return <h1 key={key}>{componentData[key][value.ucm_value_to_use]}</h1>;
        case 'description':
          return <p key={key}>{componentData[key][value.ucm_value_to_use]}</p>;
        //Price is hardcoded for demo, but would ideally be dynamic price coming from Flight Deals JSON or another source
        case 'price':
          return <h2 key={key}>$69 one way</h2>;
        case 'button':
          return (
            <auro-hyperlink
              key={key}
              href={componentData[key][value.ucm_value_to_use[0]].href}
              target="_self"
              aria-label={componentData[key][value.ucm_value_to_use[2]].href}
              type="cta"
            >
              {componentData[key][value.ucm_value_to_use[0]].title}
            </auro-hyperlink>
          );
        case 'fineprint':
          return <h5 key={key}>{componentData[key][value.ucm_value_to_use]}</h5>;
        default:
          return null;
      }
    });
  };
  
  module.exports = { ucmDataHandler };