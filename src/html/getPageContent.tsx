import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { renderFile } from 'ejs';
import { format } from 'prettier';
import fetch from 'node-fetch';
import { Stats } from '../components/Stats';
import { getGroupedMemberData } from './getGroupedMemberData';
import { getContributors } from './getContributors';
import { getMembers } from './getMembers';
import { getData } from './getData';
import { port } from '../config';

export async function getPageContent() {
  const allContributors = getContributors(
    await getData(
      `http://localhost:${port}/api/repos/facebook/react/contributors`
    )
  );
  const members = getMembers(
    await getData(`http://localhost:${port}/api/orgs/facebook/members`)
  );

  const { contributors, totals } = getGroupedMemberData(
    allContributors,
    members
  );

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
