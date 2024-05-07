interface IItems {
  cacheId: string;
  link: string;
  snippet: string;
  title: string;
}

interface IQuery {
  count: number;
  startIndex: number;
  totalResults: string;
}

export interface ISearchResults {
  items?: IItems[];
  queries: {
    nextPage?: IQuery[];
    previousPage?: IQuery[];
    request: IQuery[];
  };
  spelling?: {
    correctedQuery: string;
  };
}

const endpoint =
  'https://www.googleapis.com/customsearch/v1/siterestrict?cx={cx}&key={key}';

const cx = '5204c164979744d30';
const key = 'AIzaSyAI4atAz3I5ujXCjoEXRvdwqcYn3AIsCA8';

const url = endpoint.replace('{cx}', cx).replace('{key}', key);

const GoogleSearch = async (
  query: string | null,
  startIndex: string | null
): Promise<ISearchResults> => {
  let requestUrl = `${url}&q=${query}`;

  if (startIndex) {
    requestUrl = requestUrl + `&start=${startIndex}`;
  }

  const response = await fetch(requestUrl);

  if (!response.ok) {
    throw new Error(`There was an error searching for ${query}`);
  }

  return (await response.json()) as ISearchResults;
};

export default GoogleSearch;
