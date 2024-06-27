import React, { useState, useEffect } from 'react';
import { onEntryChange } from '../contentstack-sdk';
// import RenderComponents from '../components/render-components';
import RenderBlocks from '../components/blocks/render-blocks';
import { getPageRes, getAlaskaPageRes, fetchOrchestratedOffer } from '../helper';
import Skeleton from 'react-loading-skeleton';
import { Props } from "../typescript/pages";

export default function Page(props: Props) {
  const { page, entryUrl } = props;
  const [getEntry, setEntry] = useState(page);

  async function fetchData() {
    try {
      const entryRes = await getAlaskaPageRes(entryUrl);
      // console.log('Alaska_Airlines Page Payload: ', entryRes)
      if (!entryRes) throw new Error('Status code 404');
      setEntry(entryRes);
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
      contentTypeUid='alaska_airlines'
      entryUid={getEntry.uid}
      locale={getEntry.locale}
    />
  ) : (
    <Skeleton count={3} height={300} />
  );
}

export async function getServerSideProps({params}: any) {
  try {
      const entryUrl = params.page.includes('/') ? params.page:`/${params.page}`
      const entryRes = await getAlaskaPageRes(entryUrl);
      const orchestratedOffer = await fetchOrchestratedOffer();
      console.log('entryRes: ', JSON.stringify(entryRes));
      // console.log('orchestratedOffer: ', orchestratedOffer);
      // const entryRes = await getPageRes(entryUrl);
      if(orchestratedOffer){
        console.log('params.page: ', params)
        const firstDynamicBlock = entryRes?.content_blocks[0]?.dynamic_block;
        const newUCM = [orchestratedOffer]
        const modifiedFirstDynamicBlock = {
          ...firstDynamicBlock,
          ucm: newUCM
        }

        console.log(modifiedFirstDynamicBlock)

        const allContentBlocks = entryRes?.content_blocks;
        console.log('modifiedFirstDynamicBlock: ', JSON.stringify(modifiedFirstDynamicBlock))

      }   
      if (!entryRes) throw new Error('404');
      return {
        props: {
          entryUrl: entryUrl,
          page: entryRes,
        },
      };

  } catch (error) {
    return { notFound: true };
  }
}
