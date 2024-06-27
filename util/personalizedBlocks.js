const personalizedBlocks = async (orchestratedOffer, defaultDynamicBlock) => {

  if(!orchestratedOffer) return defaultDynamicBlock;

  const personalOffersOnly = orchestratedOffer?.personalOffers;

  for (const key in defaultDynamicBlock) {
    if(defaultDynamicBlock[key]?.dynamic_block?.include_in_offer_orchestration){
      defaultDynamicBlock[key] = {
        ...defaultDynamicBlock[key],
        dynamic_block: {
          ...defaultDynamicBlock[key].dynamic_block,
          ucm: [personalOffersOnly[key]],
        }
      }
    }
  }

  return defaultDynamicBlock;
  
};

module.exports = { personalizedBlocks };
