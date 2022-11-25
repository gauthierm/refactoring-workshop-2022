export function getNextPage(linkHeader: string): string {
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
