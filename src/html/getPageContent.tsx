import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { renderFile } from 'ejs';
import { format } from 'prettier';
import fetch from 'node-fetch';
import { Stats } from '../components/Stats';
import { getGroupedMemberData } from './getGoupedMemberData';

export async function getPageContent() {
  const { contributors, totals } = await getGroupedMemberData();

  console.log(contributors, totals);

  return format(
    await renderFile(__dirname + '/../views/template.ejs', {
      content: ReactDOMServer.renderToString(
        <Stats groupedContributors={contributors} totals={totals} />
      ),
    }),
    {
      parser: 'html',
    }
  );
}
