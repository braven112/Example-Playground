const personalizedBlocks = async (orchestratedOffer, originalDynamicBlocks) => {

  const filteredDynamicBlocks = originalDynamicBlocks.filter(
    (block) =>
      block?.dynamic_block?.include_in_offer_orchestration === true
  );
  // console.log('ORIGINAL filteredDynamicBlocks', JSON.stringify(filteredDynamicBlocks))

  if(!orchestratedOffer) return originalDynamicBlocks;

  const personalOffersOnly = orchestratedOffer?.personalOffers;


  for (const key in filteredDynamicBlocks) {
    if (filteredDynamicBlocks[key]?.dynamic_block?.include_in_offer_orchestration === true){
      filteredDynamicBlocks[key] = {
        ...filteredDynamicBlocks[key],
        dynamic_block: {
          ...filteredDynamicBlocks[key].dynamic_block,
          ucm: [personalOffersOnly[key]],
        }
      }
    }
  }

  console.log('filteredDynamicBlocks', JSON.stringify(filteredDynamicBlocks));



  for (const key in originalDynamicBlocks) {
    //check if originalDynamicBlocks[key] is inside of filteredDynamicBlocks
    if (originalDynamicBlocks[key]?.dynamic_block?.include_in_offer_orchestration === false){
      originalDynamicBlocks[key] = originalDynamicBlocks[key]
    } else {
      originalDynamicBlocks[key] = {
        ...originalDynamicBlocks[key],
        dynamic_block: {
          ...originalDynamicBlocks[key].dynamic_block,
          ucm: [key > filteredDynamicBlocks.length ? filteredDynamicBlocks[key - 1]?.dynamic_block.ucm[0] : filteredDynamicBlocks[key]?.dynamic_block.ucm[0]],
        }
      }
    }
  }

  console.log('originalDynamicBlocks', JSON.stringify(originalDynamicBlocks));
  return originalDynamicBlocks;

};

module.exports = { personalizedBlocks };
