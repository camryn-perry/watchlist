/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar';
export {default as UserHome} from './user-home';
export {Login, Signup} from './auth-form';
export {default as AllFilms} from './AllFilms';
export {default as Search} from './Search';
export {default as SearchResults} from './SearchResults';
export {default as AdvancedSearchView} from './AdvancedSearchView';
export {default as Watchlist} from './Watchlist';
export {default as DetailedView} from './DetailedView';
