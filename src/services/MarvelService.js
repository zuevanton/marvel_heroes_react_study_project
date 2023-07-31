import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const {loading, request, error, clearError} = useHttp()

  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  const _apiKey = 'apikey=2fa302891526a157b1de6d19b90a0feb';
  const _baseOffset = 210;

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

  return {loading, error, getAllCharacters, getCharacter, clearError}
}

export default useMarvelService;