import React from 'react';

function getTable(title: string, total: number, contributors: any[]) {
  const rows: any[] = [];

  contributors.forEach((contributor) => {
    rows.push(
      <tr
        key={contributor.login}
        className={contributor?.majorContributor ? 'major' : ''}
      >
        <td>{contributor.login}</td>
        <td>{contributor.contributions}</td>
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
            <th>{total}</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

interface StatsProps {
  groupedContributors: { [key: string]: any[] };
}

export function Stats({ groupedContributors }: StatsProps) {
  const tables: any[] = [];

  Object.entries(groupedContributors).forEach(([key, value]) => {
    let total = 0;
    tables.push(getTable(key, total, value));
  });

  return <>{tables}</>;
}
