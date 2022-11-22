import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { renderFile } from 'ejs';
import { format } from 'prettier';
import fetch from 'node-fetch';
import { Stats } from '../components/Stats';
import { port } from '../config';

// TODO:
// - top 10 facebook contributors
// - top 10 non-facebook contributors
// - total facebook, non-facebook contributions
// - sort by name or contributions

async function getContributors(): Promise<[any[], number]> {
  const contributors: any[] = [];
  let totalContributions = 0;

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
      totalContributions += contributor.contributions;
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

  return [contributors, totalContributions];
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

export async function getPageContent() {
  const [contributors, total] = await getContributors();
  const members = await getMembers();

  const groupedMembers: { [key: string]: any[] } = { facebook: [], other: [] };

  contributors.forEach((contributor) => {
    if (members.includes(contributor.login)) {
      groupedMembers.facebook.push(contributor);
    } else {
      groupedMembers.other.push(contributor);
    }
  });

  console.log(groupedMembers, total);

  return format(
    await renderFile(__dirname + '/../views/template.ejs', {
      content: ReactDOMServer.renderToString(
        <Stats groupedContributors={groupedMembers} />
      ),
    }),
    {
      parser: 'html',
    }
  );
}
