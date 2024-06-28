const ucmConfigHandler = fieldsOrder => {
    //Seperates media from other fields in the fieldsOrder array
    const { media, remainingFields } = fieldsOrder.reduce(
      (acc, field) => {
        const fieldKey = Object.keys(field)[0];
        const fieldValue = Object.values(field)[0];
  
        if (Object.hasOwn(field, 'media')) {
          acc.media[fieldKey] = fieldValue;
        } else {
          acc.remainingFields[fieldKey] = fieldValue;
        }
  
        return acc;
      },
      { media: {}, remainingFields: {} }
    );
  
    return { media, remainingFields };
  };


  const reduceConfig = fieldsOrder => {
    //Seperates media from other fields in the fieldsOrder array
    const { remainingFields } = fieldsOrder.reduce(
      (acc, field) => {
        const fieldKey = Object.keys(field)[0];
        const fieldValue = Object.values(field)[0];
  
        acc.remainingFields[fieldKey] = fieldValue;
  
        return acc;
      },
      { remainingFields: {} }
    );
  
    return { remainingFields };
  };
  
  module.exports = { ucmConfigHandler, reduceConfig };