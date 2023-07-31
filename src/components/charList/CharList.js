import './charList.scss';
import { useEffect, useRef, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const CharList = (props) => {
  
  const {loading, error, clearError, getAllCharacters} = useMarvelService();

  const [charList, setCharList] = useState([])
  const [newItemLoading, setNewItemLoading] = useState(false)
  const [offset, setOffset] = useState(210)

  const onCharListLoaded = (newCharList) => {
    setCharList((charList) => [...charList, ...newCharList])
    setNewItemLoading(() => false)
    setOffset((offset) => offset + 9)
  }

  useEffect(() => {
    onRequest(offset, true);
  }, [])

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true)
    getAllCharacters(offset)
      .then(onCharListLoaded)
  }

  const itemRefs = useRef([])

  const focusOnItem = (id) => {
    itemRefs.current.forEach(item => item.classList.remove('char__item_selected'))
    itemRefs.current[id].classList.add('char__item_selected')
    itemRefs.current[id].focus()
  }

  const renderItems = (arr) => {
    return arr.map((item, i) => {
      return (
        <li className="char__item"
          tabIndex={0}
          ref={el => itemRefs.current[i] = el}
          key={item.id} 
          onClick={() => {
            props.onActiveCharChange(item.id)
            focusOnItem(i)
          }} 
          onKeyPress={(e) => {
            if (e.key === ' ' || e.key === "Enter") {
                props.onActiveCharChange(item.id);
                focusOnItem(i);
            }
          }}>
          <img src={item.thumbnail} alt="abyss"/>
          <div className="char__name">{item.name}</div>
        </li>
      )
    })
  }
  const items = renderItems(charList)
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newItemLoading ? <Spinner /> : null;

  return (
    <div className="char__list">
      <ul className="char__grid">
        {errorMessage}
        {spinner}
        {items}
      </ul>
      <button 
        className="button button__main button__long"
        disabled={newItemLoading}
        onClick={() => onRequest(offset)} >
        <div className="inner">load more</div>
      </button>
    </div>
  )
}

export default CharList;