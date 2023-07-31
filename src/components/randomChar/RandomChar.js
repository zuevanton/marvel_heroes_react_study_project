import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const RandomChar = () => {
	const {loading, error, getCharacter, clearError} =  useMarvelService();
	const [char, setChar] = useState(null)

	useEffect(() => {
		updateChar();
		const timerId = setInterval(updateChar, 100000);

		return () => {
			clearInterval(timerId)
		}
	}, [])

	const onCharLoaded = (char) => {
		setChar(char)
	}

	const updateChar = () => {
		clearError()
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000); 
		getCharacter(id).then(onCharLoaded)
	}

	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || error || !char) ? <View char={char}/> : null;

	return (
		<div className="randomchar">
			{errorMessage}
			{spinner}
			{content}
			<div className="randomchar__static">
				<p className="randomchar__title">
						Random character for today!<br/>
						Do you want to get to know him better?
				</p>
				<p className="randomchar__title">
						Or choose another one
				</p>
				<button className="button button__main" onClick={updateChar}>
						<div className="inner">try it</div>
				</button>
				<img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
			</div>
		</div>
	)
    
}

const View = ({char}) => {
	const {name, description, thumbnail, homepage, wiki} = char;
	const isImgAvailable = !thumbnail.includes('image_not_available');
	const imgClasses = `randomchar__img ${isImgAvailable ? '' : 'randomchar__img_notavailable'}`

	return (
		<div className="randomchar__block">
			<img src={thumbnail} alt="Random character" className={imgClasses} />
			<div className="randomchar__info">
				<p className="randomchar__name">{name}</p>
				<p className="randomchar__descr">
						{description ? description.length > 200 ? description.slice(0, 199) + '...': description : 'Описание не найдено.'}
				</p>
				<div className="randomchar__btns">
					<a href={homepage} className="button button__main">
							<div className="inner">homepage</div>
					</a>
					<a href={wiki} className="button button__secondary">
							<div className="inner">Wiki</div>
					</a>
				</div>
			</div>
		</div>
	)
}

export default RandomChar;