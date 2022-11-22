import React from 'react';

function getTable(title: string, total: number, contributors: any[]) {
  const rows: any[] = [];

  contributors.forEach((contributor) => {
    rows.push(
      <tr
        key={contributor.login}
        className={contributor?.majorContributor ? 'major' : ''}
      >
        <td>
          <a href={`https://github.com/${contributor.login}`}>
            {contributor.login}
          </a>
        </td>
        <td>{contributor.contributions.toLocaleString()}</td>
      </tr>
    );
  });

  return (
    <div className="table">
      <h2>{title}</h2>
      <table>
        <thead>
          <tr>
            <th>contributor</th>
            <th>contributions</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
        <tfoot>
          <tr>
            <th>total</th>
            <th>{total.toLocaleString()}</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

interface StatsProps {
  groupedContributors: { [key: string]: any[] };
  totals: { [key: string]: number };
}

export function Stats({ groupedContributors, totals }: StatsProps) {
  const tables: any[] = [];

  Object.entries(groupedContributors).forEach(([key, value]) => {
    tables.push(getTable(key, totals[key], value));
  });

  return <>{tables}</>;
}
