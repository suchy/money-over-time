import { useLocation } from '@remix-run/react';

export const useQueryString = () => {
  const { search: urlSearch } = useLocation();

  const queryStringEntries = new URLSearchParams(urlSearch).entries();

  const queryStringObject = Object.fromEntries(queryStringEntries);

  return queryStringObject;
};
