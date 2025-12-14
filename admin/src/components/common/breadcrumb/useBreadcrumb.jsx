
import { useLocation } from 'react-router-dom';
import { breadcrumbMap } from './breadcrumb.config';

export function useBreadcrumb() {
  const { pathname } = useLocation();

  if (breadcrumbMap[pathname]) {
    return breadcrumbMap[pathname];
  }

  const matchedKey = Object.keys(breadcrumbMap)
    .sort((a, b) => b.length - a.length)
    .find((key) => pathname.startsWith(key));

  return matchedKey ? breadcrumbMap[matchedKey] : ['Dashboard'];
}
