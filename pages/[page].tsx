import React, { useState, useEffect } from 'react';
import { onEntryChange } from '../contentstack-sdk';
import RenderBlocks from '../components/blocks/render-blocks';
import {
  getPageRes,
  getAlaskaPageRes,
  fetchOrchestratedOffer,
} from '../helper';
import { personalizedBlocks } from '../util/personalizedBlocks';
import Skeleton from 'react-loading-skeleton';
import { Props, Context } from '../typescript/pages';
import '@aurodesignsystem/auro-background';
import '@aurodesignsystem/auro-header';
import '@aurodesignsystem/auro-button';
import '@aurodesignsystem/auro-hyperlink';

export default function Page(props: Props) {
  const { page, entryUrl } = props;
  const [getEntry, setEntry] = useState(page);

  async function fetchData() {
    try {
      // const entryRes = await getAlaskaPageRes(entryUrl);
      // console.log('Alaska_Airlines Page Payload: ', entryRes)
      // if (!entryRes) throw new Error('Status code 404');
      // setEntry(entryRes);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    onEntryChange(() => fetchData());
  }, [page]);

  return getEntry.content_blocks ? (
    <RenderBlocks
      pageComponents={getEntry.content_blocks}
      contentTypeUid="alaska_airlines"
      entryUid={getEntry.uid}
      locale={getEntry.locale}
    />
  ) : (
    <Skeleton count={3} height={300} />
  );
}

export async function getServerSideProps(context: Context) {
  try {
    const entryUrl = context.query.page.includes('/')
      ? context.query.page
      : `/${context.query.page}`;
    let entryRes = await getAlaskaPageRes(entryUrl);
    const offerId = context.query.offer;

    //Fetch from dummy offer orchestration service || This would be replaced by the recommendation engine
    const orchestratedOffer = await fetchOrchestratedOffer(offerId);

    const originalDynamicBlocks = entryRes.content_blocks;

    //This function combines ochestratedOffers to the originalDynamicBLocks
    const personalizedDynamicBlocks = await personalizedBlocks(
      orchestratedOffer,
      originalDynamicBlocks
    );

    let finalEntryRes = entryRes;
    //Spread the original response and replace the content_blocks with the personalized content_blocks
    finalEntryRes = {
      ...finalEntryRes,
      content_blocks: personalizedDynamicBlocks,
    };

    if (!finalEntryRes) throw new Error('404');

    return {
      props: {
        entryUrl: entryUrl,
        page: finalEntryRes,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
}
