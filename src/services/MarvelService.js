import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const {loading, request, error, clearError} = useHttp()

  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  const _apiKey = 'apikey=2fa302891526a157b1de6d19b90a0feb';
  const _baseOffset = 210;
  const _baseComicsOffset = 10;

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
    return res.data.results.map(transformCharacter);
  }

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)
    return transformCharacter(res.data.results[0])
  }

  const transformCharacter = (char) => {
    return {
      name: char.name,
      description: char.description,
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      id: char.id,
      comics: char.comics.items
    }
  }

  const getAllComics = async (offset = _baseComicsOffset) => {
    const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
    return res.data.results.map(transformComics)
  }

  const getComic = async (comicId) => {
    const res = await request(`${_apiBase}comics/${comicId}?${_apiKey}`)
    return transformComics(res.data.results[0])
  }

  const transformComics = comics => {
    return {
      id: comics.id,
      thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
      url: comics.urls[0].url,
      name: comics.title,
      price: comics.prices[0].price,
      description: comics.description || 'there is no description',
      pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'no info about num of pages',
      language: comics.textObjects.language || 'en-us',
      
    }
  }

  return {loading, error, getAllCharacters, getCharacter, clearError, getAllComics, getComic}
}

export default useMarvelService;