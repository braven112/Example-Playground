const personalizedBlocks = async (orchestratedOffer, originalDynamicBlocks) => {

  const filteredDynamicBlocks = originalDynamicBlocks.filter(
    (block) =>
      block?.dynamic_block?.include_in_offer_orchestration === true
  );
  // console.log('ORIGINAL filteredDynamicBlocks', JSON.stringify(filteredDynamicBlocks))

  if(!orchestratedOffer) return originalDynamicBlocks;

  const personalOffersOnly = orchestratedOffer?.personalOffers;


  for (const key in originalDynamicBlocks) {
    //check if originalDynamicBlocks[key] is inside of filteredDynamicBlocks
    if (filteredDynamicBlocks[key]?.dynamic_block?.include_in_offer_orchestration === false){
      continue;
    } else {
      originalDynamicBlocks[key] = {
        ...originalDynamicBlocks[key],
        dynamic_block: {
          ...originalDynamicBlocks[key].dynamic_block,
          ucm: [personalOffersOnly[key] ? personalOffersOnly[key] : personalOffersOnly[key - 1]],
        }
      }
    }
  }

  console.log('originalDynamicBlocks', JSON.stringify(originalDynamicBlocks));
  return originalDynamicBlocks;

};

module.exports = { personalizedBlocks };
