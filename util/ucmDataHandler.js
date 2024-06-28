
const ucmDataHandler = (remainingFields, componentData) => {

    return Object.entries(remainingFields).map(([key, value]) => {
      switch (key) {
        case 'teaser':
          return key === 'teaser'
          ? <img key={key} className="teaser" src={`${componentData[key][value.ucm_value_to_use].url}`} /> 
          : <span key={key} className="teaser">{componentData[key][value.ucm_value_to_use]}</span>;
        case 'headline':
          return <h1 key={key} className="headline">{componentData[key][value.ucm_value_to_use]}</h1>;
        case 'subheadline':
          return <h2 key={key} className="subheadline">{componentData[key][value.ucm_value_to_use]}</h2>;
        case 'description':
          return <p key={key} className="description">{componentData[key][value.ucm_value_to_use]}</p>;
        //Price is hardcoded for demo, but would ideally be dynamic price coming from Flight Deals JSON or another source
        case 'price':
          return <h3 key={key} className="price-point">$69 one way</h3>;
        case 'button':
          return (
            <p className="hyperlink-wrapper" key={key}>
              <auro-hyperlink
                href={componentData[key][value.ucm_value_to_use[0]].href}
                target="_self"
                ariaLabel={componentData[key][value.ucm_value_to_use[2]].href}
                type="cta"
              >
                {componentData[key][value.ucm_value_to_use[0]].title}
              </auro-hyperlink>
            </p>
          );
        case 'fineprint':
          return <p key={key} className="fineprint">{componentData[key][value.ucm_value_to_use]}</p>;
        default:
          return null;
      }
    });
  };
  
  module.exports = { ucmDataHandler };
