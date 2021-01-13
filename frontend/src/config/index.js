import {fromJS, List} from 'immutable';

const CUSTOM_CONFIG = window._trotto.layout;

const DEFAULT_CONFIG = {
  palette: {
    primary: '#EC3944',
    secondary: '#4571C9',
    success: '#27C497',
    error: '#BC1A23'
  },
  page: {
    title: 'Lambda Go Links',
    favicon: '/_images/favicon.ico'
  },
  header: {
    title: 'Go Links',
    logo: {
      url: '/_images/lambda.png',
      css: {
        height: '1.6em'
      }
    },
    links: [
      'directory',
    ]
  },
  footer: {
    showSourceLink: false,
    links: []
  }
};

const DEFAULT_NAV_ITEMS = {
  directory: {
    text: 'Directory',
    url: '#/directory'
  }
};

let config = fromJS(DEFAULT_CONFIG).mergeDeep(fromJS(CUSTOM_CONFIG));
config = config.updateIn(['header', 'links'], (links) => links.reduce((fullLinks, link) => {
  if (typeof link === 'string') {
    if (!DEFAULT_NAV_ITEMS[link]) {
      console.error('Skipping invalid link ID: ', link);

      return fullLinks;
    }
    return fullLinks.push(fromJS(Object.assign({id: link}, DEFAULT_NAV_ITEMS[link])));
  }

  return fullLinks.push(link);
}, List()));

export const getConfig = (keyPath) => config.getIn(keyPath.split('.'))

const setTitleAndFavicon = () => {
  const favicon = document.createElement('link');
  favicon.rel = 'shortcut icon';
  favicon.href = getConfig('page.favicon');
  document.getElementsByTagName('head')[0].appendChild(favicon);

  document.title = getConfig('page.title');
};

setTitleAndFavicon();
