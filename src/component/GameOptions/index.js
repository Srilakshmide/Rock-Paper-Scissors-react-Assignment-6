import './index.css'

const GameOptions = props => {
  const {gameDetails, setUserChoice} = props
  const {id, imageUrl} = gameDetails

  const onClickGameOption = () => setUserChoice(id)

  return (
    <li className="list-options">
      <button
        className="option-button"
        type="button"
        onClick={onClickGameOption}
        data-testid={`${id.toLowerCase()}Button`}
      >
        <img className="option-image" src={imageUrl} alt={id} />
      </button>
    </li>
  )
}

export default GameOptions
