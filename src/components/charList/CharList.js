import './charList.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

class CharList extends Component {
  constructor(props) {
    super(props)
  }


  marvelService = new MarvelService();

  state = {
    charList: [],
    loading: true,
    error: false,
    activeChar: this.props.activeChar
  }

  onCharListLoaded = (charList) => {
    // const charList = [...this.state.charList, ...newChars]
    this.setState({
      charList,
      loading: false
    })
  }

  onCharClick = (id) => {
    this.props.onActiveCharChange(id);
  }

  componentDidMount() {
    this.marvelService
      .getAllCharacters()
      .then(this.onCharListLoaded)
      .catch(res => console.log(res))
  }

  render() {
    const {charList, loading, error} = this.state;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;

    const items = charList.map(char => {
      return (
        <li className="char__item" key={char.id} onClick={() => this.onCharClick(char.id)}>
          <img src={char.thumbnail} alt="abyss"/>
          <div className="char__name">{char.name}</div>
        </li>
      )
    })

    return (
      <div className="char__list">
        <ul className="char__grid">
          {errorMessage}
          {spinner}
          {!(errorMessage && spinner) ? items : null}
        </ul>
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    )
  }
}

export default CharList;