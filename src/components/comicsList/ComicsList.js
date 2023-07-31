import './comicsList.scss';
import useMarvelService from '../../services/MarvelService';
import { useEffect, useState } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';


const ComicsList = () => {
  const {loading, error, getAllComics} = useMarvelService();
  const [comicsList, setComicsList] = useState([])
  const [offset, setOffset] = useState(10)
  const [newItemLoading, setNewItemLoading] = useState(false)

  const onComicsListLoaded = (newComicsList) => {
    setComicsList(() => [...comicsList, ...newComicsList])
    setOffset(() => offset + 8)
    setNewItemLoading(false)
  }

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllComics(offset).then(onComicsListLoaded);
  }
  
  useEffect(() => {
    setNewItemLoading(true)
    onRequest(offset, true)
  }, [])
  
  const renderItems = (arr) => {
    const items = arr.map(item => {
      return (
        <li className="comics__item" key={item.id}>
          <a href={item.url}>
            <img src={item.thumbnail} alt={item.name} className="comics__item-img"/>
            <div className="comics__item-name">{item.name}</div>
            <div className="comics__item-price">{item.price}$</div>
          </a>
        </li>
      )
    })
    return (
      <ul className="comics__grid">
        {items}
      </ul>
    )
  }

  const items = renderItems(comicsList)
  const errorMessage = error ? <ErrorMessage/>: null;
  const spinner = loading && !newItemLoading ? <Spinner /> : null;
  return (
    <div className="comics__list">
      {spinner}
      {errorMessage}
      {items}
      <button className="button button__main button__long" onClick={() => onRequest(offset)}>
          <div className="inner">load more</div>
      </button>
    </div>
  )
}

export default ComicsList;