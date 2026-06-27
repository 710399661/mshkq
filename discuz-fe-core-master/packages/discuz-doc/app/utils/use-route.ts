import { RouteProps, matchPath } from 'react-router';
import useRouter from 'use-react-router';

export default function useRoute<P>(
  options: Pick<RouteProps, 'path' | 'exact' | 'strict' | 'sensitive'> = {},
) {
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { location, history, match: parentMatch } = useRouter<P>();
    const match = matchPath<P>(location.pathname, options, parentMatch);
    return { match, history, location };
  } catch (err) {
    return { match: null, history: null, location: null };
  }
}
