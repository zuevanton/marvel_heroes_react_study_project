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
    newItemLoading: false,
    offset: 210
  }

  onCharListLoading = () => {
    this.setState({
      newItemLoading: true
    })
  }

  onCharListLoaded = (newCharList) => {
    this.setState(({offset, charList}) => ({
      charList: [...charList, ...newCharList],
      loading: false,
      newItemLoading: false,
      offset: offset + 9
    }))
  }

  onCharClick = (id) => {
    this.props.onActiveCharChange(id);
  }

  componentDidMount() {
    console.log('mounted')
    this.onRequest();
  }

  onRequest = offset => {
    this.onCharListLoading();
    this.marvelService
      .getAllCharacters(offset)
      .then(this.onCharListLoaded)
      .catch(res => console.log(res))
  }

  render() {
    const {charList, loading, error, newItemLoading, offset} = this.state;
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
        <button 
          className="button button__main button__long"
          disabled={newItemLoading}
          onClick={() => this.onRequest(offset)} >
          <div className="inner">load more</div>
        </button>
      </div>
    )
  }
}

export default CharList;