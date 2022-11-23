import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { renderFile } from 'ejs';
import { format } from 'prettier';
import fetch from 'node-fetch';
import { Stats } from '../components/Stats';
import { port } from '../config';

async function getContributors(): Promise<any[]> {
  const contributors: any[] = [];

  const res = await fetch(
    `http://localhost:${port}/api/repos/facebook/react/contributors`
  );

  const data = (await res.json()) as any[];
  data.forEach((contributor) => {
    if (contributor.type === 'User') {
      const majorContributor = contributor.contributions > 500 ? true : false;
      contributors.push({
        majorContributor,
        login: contributor.login,
        contributions: contributor.contributions,
      });
    }
  });

  let nextPageUrl = getNextPage(res.headers.get('link') || '');
  while (nextPageUrl !== '') {
    const res = await fetch(nextPageUrl);
    const data = (await res.json()) as any[];
    data.forEach((contributor) => {
      if (contributor.type === 'User') {
        contributors.push({
          login: contributor.login,
          contributions: contributor.contributions,
        });
      }
    });
    nextPageUrl = getNextPage(res.headers.get('link') || '');
  }

  return contributors;
}

async function getMembers() {
  const members: string[] = [];
  const res = await fetch(`http://localhost:${port}/api/orgs/facebook/members`);
  const data = (await res.json()) as any[];
  data.forEach((contributor) => {
    if (contributor.type === 'User') {
      members.push(contributor.login);
    }
  });

  let nextPageUrl = getNextPage(res.headers.get('link') || '');
  while (nextPageUrl !== '') {
    const res = await fetch(nextPageUrl);
    const data = (await res.json()) as any[];
    data.forEach((contributor) => {
      if (contributor.type === 'User') {
        members.push(contributor.login);
      }
    });
    nextPageUrl = getNextPage(res.headers.get('link') || '');
  }
  return members;
}

function getNextPage(linkHeader: string): string {
  let nextLink = '';

  const links = linkHeader.split(/\s*,\s*/);
  links.forEach((link) => {
    const parts = link.split(/\s*;\s*/);
    if (parts[1] === 'rel="next"') {
      nextLink = parts[0].replaceAll(/(^<|>$)/g, '');
    }
  });

  return nextLink;
}

async function getGroupedMemberData() {
  const contributors = await getContributors();
  const members = await getMembers();

  const groupedMembers: { [key: string]: any[] } = { facebook: [], other: [] };
  const totals: { [key: string]: number } = { facebook: 0, other: 0 };

  contributors.forEach((contributor) => {
    if (members.includes(contributor.login)) {
      groupedMembers.facebook.push(contributor);
      totals.facebook += contributor.contributions;
    } else {
      groupedMembers.other.push(contributor);
      totals.other += contributor.contributions;
    }
  });

  groupedMembers.facebook.splice(10);
  groupedMembers.other.splice(10);

  groupedMembers.facebook.sort((a, b) => a.login.localeCompare(b.login));
  groupedMembers.other.sort((a, b) => a.login.localeCompare(b.login));

  return {
    contributors: groupedMembers,
    totals,
  };
}

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
