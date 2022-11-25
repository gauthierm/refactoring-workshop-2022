function trimAngleBrackets(text: string) {
  return text.replaceAll(/(^<|>$)/g, '');
}

function isRelNext(rel: string) {
  return rel === 'rel="next"';
}

export function getNextPage(linkHeader: string): string {
  return (
    linkHeader
      .split(/\s*,\s*/)
      .map((link) => link.split(/\s*;\s*/))
      .filter(([_, rel]) => isRelNext(rel))
      .map(([url]) => trimAngleBrackets(url))
      .at(-1) ?? ''
  );
}
