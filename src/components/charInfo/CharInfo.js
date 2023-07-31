import { useEffect, useState } from 'react';
import './charInfo.scss';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';

const CharInfo = (props) => {

  const [char, setChar] = useState(null)
  const {loading, error, getCharacter, clearError} = useMarvelService();

  const onCharLoaded = (char) => {
    setChar(char)
  }

  const createChar = () => {
    if(!props.activeChar) return;
    clearError()
    getCharacter(props.activeChar)
      .then(onCharLoaded)
  }

  useEffect(() => {
    createChar();
  }, [props.activeChar])

  const renderComicsList = (list) => {
    
    if(list.length === 0) return 'комиксов не найдено'
    
    const comicsList = list.map((item, i) => {
      return (
        <li className="char__comics-item" key={i}>
          {item.name}
        </li>
      )
    })

    return (
      <ul className="char__comics-list">
        {comicsList}
      </ul>
    )
  }

  const renderContent = () => {
    if (!char){
      return (<div className="char__info"><Skeleton /></div>)
    }
    if (error) {
      return <ErrorMessage />
    } 
    if (loading) {
      return <Spinner />
    } 

    const {thumbnail, name, description, homepage, wiki, comics} = char;
    const comicsList = renderComicsList(comics);
    
    return (
      <>
        <div className="char__basics">
          <img src={thumbnail} alt="abyss"/>
          <div>
            <div className="char__info-name">{name}</div>
            <div className="char__btns">
              <a href={homepage} className="button button__main">
                <div className="inner">homepage</div>
              </a>
              <a href={wiki} className="button button__secondary">
                <div className="inner">Wiki</div>
              </a>
            </div>
          </div>
        </div>
        <div className="char__descr">
          {description ? description : "описание отсутствует"}
        </div>
        <div className="char__comics">Comics:</div>
        {comicsList}
      </>
    )
  }

  return (
    <div className="char__info">
      {renderContent()}
    </div>
  )
}



export default CharInfo;