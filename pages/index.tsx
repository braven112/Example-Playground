import React, { useState, useEffect } from 'react';
import { onEntryChange } from '../contentstack-sdk';
import RenderComponents from '../components/render-components';
import { getPageRes, getAlaskaPageRes } from '../helper';
import Skeleton from 'react-loading-skeleton';
import { Props, Context } from "../typescript/pages";

export default function Home(props: Props) {

  const { page, entryUrl } = props;

  const [getEntry, setEntry] = useState(page);

  async function fetchData() {
    try {
      console.log('LEXI from index: ', entryUrl)
      const entryRes = await getAlaskaPageRes(entryUrl);
      console.log('MARNEL from index: ', entryRes)
      if (!entryRes) throw new Error('Status code 404');
      setEntry(entryRes);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    onEntryChange(() => fetchData());
  }, []);

  return getEntry ? (
    <RenderComponents
      pageComponents={getEntry.page_components}
      contentTypeUid='page'
      entryUid={getEntry.uid}
      locale={getEntry.locale}
    />
  ) : (
    <Skeleton count={3} height={300} />
  );
}

export async function getServerSideProps(context: Context) {
  try {
    const entryRes = await getPageRes(context.resolvedUrl);
    return {
      props: {
        entryUrl: context.resolvedUrl,
        page: entryRes,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
}
