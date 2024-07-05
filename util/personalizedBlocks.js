const personalizedBlocks = async (orchestratedOffer, originalDynamicBlocks, flightDealsData) => {

  //Return originalDynamicBlocks with Default Offers if orchestration service doesnt return any personalized offers
  if (!orchestratedOffer) return originalDynamicBlocks;

  //Save just the personalOffers array
  const personalOffersOnly = orchestratedOffer?.personalOffers;
  
  //Loops through the original blocks that are opted in to be replaced by personalized offer and swap out the campaign thats inside of the block
  //Configuration for each Opted-In Dynamic Blocks are unchanged.
  for (const key in originalDynamicBlocks) {
    if (originalDynamicBlocks[key]?.dynamic_block) { //All dynamic_blocks
      if (originalDynamicBlocks[key]?.dynamic_block?.include_in_offer_orchestration === true) { //Only opted in dynamic_blocks
        originalDynamicBlocks[key] = {
          ...originalDynamicBlocks[key],
          dynamic_block: {
            ...originalDynamicBlocks[key].dynamic_block,
            data: (personalOffersOnly.length > 0 ? [personalOffersOnly.shift()] : [...originalDynamicBlocks[key].dynamic_block.data]) || [...originalDynamicBlocks[key].dynamic_block.data],
          }
        }
      }


      //Check to see if price should be included in the data
      const allDirectives = originalDynamicBlocks[key]?.dynamic_block.configuration[0].directives;
      if(allDirectives.some(directive => directive.hasOwnProperty('price'))) {
        // console.log('CHASE!')
        originalDynamicBlocks[key] = {
          ...originalDynamicBlocks[key],
          dynamic_block: {
            ...originalDynamicBlocks[key].dynamic_block,
            data: [
                {
                  ...originalDynamicBlocks[key].dynamic_block.data[0],
                  lowestFare: {
                    ...flightDealsData 
                  }
                },
                
            ],
          }
        }
      }

    }
  }

  // console.log('originalDynamicBlocks: ', JSON.stringify(originalDynamicBlocks));
  //Return the modified dynamic blocks
  return originalDynamicBlocks;

};

module.exports = { personalizedBlocks };
