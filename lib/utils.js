export const format = filename =>
  filename
    .replace('.mdx', '')
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
