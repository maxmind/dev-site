interface IItems {
  cacheId: string;
  htmlSnippet: string;
  htmlTitle: string;
  link: string;
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
  }
  spelling?: {
    correctedQuery: string;
  }
}

const endpoint =
  'https://www.googleapis.com/customsearch/v1/siterestrict?cx={cx}&key={key}';

const cx = 'cde039a7678700a13';
const key = 'AIzaSyAI4atAz3I5ujXCjoEXRvdwqcYn3AIsCA8';

const url = endpoint
  .replace('{cx}', cx)
  .replace('{key}', key);


const GoogleSearch =
  async (query: string, startIndex: string | null): Promise<ISearchResults> => {
    let requestUrl = `${url}&q=${query}`;

    if (startIndex) {
      requestUrl = requestUrl + `&start=${startIndex}`;
    }
    const response = await fetch(requestUrl);

    if (!response.ok) {
      throw new Error(`There was an error searching for ${query}`);
    }

    return await response.json() as ISearchResults;
  };

export default GoogleSearch;
