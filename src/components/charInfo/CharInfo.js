import { Component } from 'react';
import './charInfo.scss';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';

class CharInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      char: null,
      loading: false,
      error: false
    }
  }

  marvelService = new MarvelService();

  onCharLoaded = (char) => {
    this.setState({
      char,
      loading: false
    })
  }

  onCharLoading = () => {
    this.setState({
      loading: true
    })
  }

  createChar = () => {
    if(!this.props.activeChar) return;
    this.onCharLoading();
    this.marvelService
      .getCharacter(this.props.activeChar)
      .then(this.onCharLoaded)
      .catch(this.onError)
  }

  onError = () => {
		this.setState({
			loading: false,
			error: true
		})
	}

  componentDidMount() {
    this.createChar()
  }

  componentDidUpdate(prevProps) {
    if(this.props.activeChar !== prevProps.activeChar){
      this.createChar()
    }
  }

  renderComicsList(list) {
    
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

  render() {
    const {error, loading} = this.state;

    if (error) {
      return <ErrorMessage />
    } else if (loading) {
      return <Spinner />
    } else if (!this.state.char){
      return (<div className="char__info"><Skeleton /></div>)
    }

    const {char: {thumbnail, name, description, homepage, wiki, comics}} = this.state;

    const comicsList = this.renderComicsList(comics);

    return (
      <div className="char__info">
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
      </div>
    )
  }
}



export default CharInfo;