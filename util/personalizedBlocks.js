const personalizedBlocks = async (orchestratedOffer, originalDynamicBlocks) => {

  //Return originalDynamicBlocks with Default Offers if orchestration service doesnt return any personalized offers
  if (!orchestratedOffer) return originalDynamicBlocks;

  //Save just the personalOffers array
  const personalOffersOnly = orchestratedOffer?.personalOffers;
  
  //Loops through the original blocks that are opted in to be replaced by personalized offer and swap out the campaign thats inside of the block
  //Configuration for each Opted-In Dynamic Blocks are unchanged.
  for (const key in originalDynamicBlocks) {
    if (originalDynamicBlocks[key]?.dynamic_block?.include_in_offer_orchestration === true) {
      originalDynamicBlocks[key] = {
        ...originalDynamicBlocks[key],
        dynamic_block: {
          ...originalDynamicBlocks[key].dynamic_block,
          ucm: (personalOffersOnly.length > 0 ? [personalOffersOnly.shift()] : [...originalDynamicBlocks[key].dynamic_block.ucm]) || [...originalDynamicBlocks[key].dynamic_block.ucm],
        }
      }
    }
  }

  //Return the modified dynamic blocks
  return originalDynamicBlocks;

};

module.exports = { personalizedBlocks };
