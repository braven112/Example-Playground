import React, { useState, useEffect } from 'react';
import { onEntryChange } from '../contentstack-sdk';
// import RenderComponents from '../components/render-components';
import RenderBlocks from '../components/blocks/render-blocks';
import {
  getPageRes,
  getAlaskaPageRes,
  fetchOrchestratedOffer,
} from '../helper';
import Skeleton from 'react-loading-skeleton';
import { Props, Context } from '../typescript/pages';

export default function Page(props: Props) {
  const { page, entryUrl } = props;
  const [getEntry, setEntry] = useState(page);

  console.log('page: ', JSON.stringify(page));

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

export async function getServerSideProps({ params }: any) {
  try {
    const entryUrl = params.page.includes('/')
      ? params.page
      : `/${params.page}`;
    // const pageQuery = params.query;
    let entryRes = await getAlaskaPageRes(entryUrl);
    // console.log('context: ', context);

    const orchestratedOffer = await fetchOrchestratedOffer();
    let finalEntryRes;
    let copyOfEntryRes = { ...entryRes };

    if (orchestratedOffer) {
      const modifiedFirstDynamicBlock = {
        ...copyOfEntryRes?.content_blocks[0],
        dynamic_block: {
          ...copyOfEntryRes?.content_blocks[0]?.dynamic_block,
          ucm: [orchestratedOffer],
        },
      };

      const newContentBlocks = [
        {
          ...copyOfEntryRes?.content_blocks[0],
          ...modifiedFirstDynamicBlock,
        },
        ...copyOfEntryRes?.content_blocks.slice(1),
      ];

      finalEntryRes = {
        ...copyOfEntryRes,
        content_blocks: newContentBlocks,
      };
      copyOfEntryRes = finalEntryRes;
    }
    if (!copyOfEntryRes) throw new Error('404');
    return {
      props: {
        entryUrl: entryUrl,
        page: copyOfEntryRes,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
}
