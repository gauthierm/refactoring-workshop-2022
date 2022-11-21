import React, { ReactNode } from 'react';

interface TableProps {
  title: string;
  total: number;
  contributors: any[];
}

function Table({ title, total, contributors }: TableProps) {
  const rows: any[] = [];

  contributors.forEach((contributor) => {
    rows.push(
      <tr>
        <th>{contributor.login}</th>
        <td>{contributor.contributions}</td>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>{title}</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

interface StatsProps {
  groupedContributors: { [key: string]: any[] };
}

export function Stats({ groupedContributors }: StatsProps) {
  const tables: any[] = [];

  Object.entries(groupedContributors).forEach(([key, value]) => {
    let total = 0;
    tables.push(<Table title={key} total={total} contributors={value} />);
  });

  return <>{tables}</>;
}
