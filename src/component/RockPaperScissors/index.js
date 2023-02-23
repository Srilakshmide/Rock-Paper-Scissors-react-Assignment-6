import {Component} from 'react'
import {RiCloseLine} from 'react-icons/ri'

import 'reactjs-popup/dist/index.css'
import Popup from 'reactjs-popup'

import GameOptions from '../GameOptions'
import './index.css'

const gameStatusConstant = {
  inProgress: 'IN_PROGRESS',
  win: 'WIN',
  lost: 'LOST',
  draw: 'DRAW',
}

class RockPaperScissors extends Component {
  state = {
    userChoice: '',
    gameChoice: '',
    score: 0,
    gameStatus: gameStatusConstant.inProgress,
  }

  onClickPlayAgain = () => {
    this.setState({gameStatus: gameStatusConstant.inProgress})
  }

  setUserChoice = id => {
    this.setState(
      {userChoice: id, gameChoice: this.getGameChoice()},
      this.evaluateGame,
    )
  }

  getGameChoice = () => {
    const {choicesList} = this.props
    const gameChoiceList = choicesList.map(choice => choice.id)
    const randomIndex = Math.floor(Math.random() * 3)
    return gameChoiceList[randomIndex]
  }

  evaluateGame = () => {
    const {userChoice, gameChoice} = this.state
    if (userChoice === gameChoice) {
      this.setState({gameStatus: gameStatusConstant.draw})
    } else if (userChoice === 'ROCK') {
      if (gameChoice === 'SCISSORS') {
        this.setState(prevState => ({
          gameStatus: gameStatusConstant.win,
          score: prevState.score + 1,
        }))
      } else {
        this.setState(prevState => ({
          gameStatus: gameStatusConstant.lost,
          score: prevState.score - 1,
        }))
      }
    } else if (userChoice === 'PAPER') {
      if (gameChoice === 'ROCK') {
        this.setState(prevState => ({
          gameStatus: gameStatusConstant.win,
          score: prevState.score + 1,
        }))
      } else {
        this.setState(prevState => ({
          gameStatus: gameStatusConstant.lost,
          score: prevState.score - 1,
        }))
      }
    } else if (userChoice === 'SCISSORS') {
      if (gameChoice === 'PAPER') {
        this.setState(prevState => ({
          gameStatus: gameStatusConstant.win,
          score: prevState.score + 1,
        }))
      } else {
        this.setState(prevState => ({
          gameStatus: gameStatusConstant.lost,
          score: prevState.score - 1,
        }))
      }
    }
  }

  renderInProgressView = () => {
    const {choicesList} = this.props
    return (
      <ul className="list-container">
        {choicesList.map(eachItem => (
          <GameOptions
            key={eachItem.id}
            gameDetails={eachItem}
            setUserChoice={this.setUserChoice}
          />
        ))}
      </ul>
    )
  }

  renderGameWonView = () => {
    const {userChoice, gameChoice} = this.state
    const {choicesList} = this.props

    const userChoiceObjList = choicesList.filter(
      choice => choice.id === userChoice,
    )
    const userChoiceObj = userChoiceObjList[0]

    const gameChoiceObjList = choicesList.filter(
      choice => choice.id === gameChoice,
    )
    const gameChoiceObj = gameChoiceObjList[0]

    return (
      <div className="responsive-container">
        <div className="game-result-container">
          <div className="selected-option-container">
            <p className="user-text">YOU</p>
            <img
              className="user-choice-image"
              src={userChoiceObj.imageUrl}
              alt="your choice"
            />
          </div>
          <div className="selected-option-container">
            <p className="user-text">OPPONENT</p>
            <img
              className="user-choice-image"
              src={gameChoiceObj.imageUrl}
              alt="opponent choice"
            />
          </div>
        </div>
        <p className="result-text">YOU WON</p>
        <button
          type="button"
          onClick={this.onClickPlayAgain}
          className="play-again-button"
        >
          PLAY AGAIN
        </button>
      </div>
    )
  }

  renderGameLostView = () => {
    const {userChoice, gameChoice} = this.state
    const {choicesList} = this.props
    const userChoiceObjList = choicesList.filter(
      choice => choice.id === userChoice,
    )
    const userChoiceObj = userChoiceObjList[0]

    const gameChoiceObjList = choicesList.filter(
      choice => choice.id === gameChoice,
    )
    const gameChoiceObj = gameChoiceObjList[0]

    return (
      <div className="responsive-container">
        <div className="game-result-container">
          <div className="selected-option-container">
            <p className="user-text">YOU</p>
            <img
              className="user-choice-image"
              src={userChoiceObj.imageUrl}
              alt="your choice"
            />
          </div>
          <div className="selected-option-container">
            <p className="user-text">OPPONENT</p>
            <img
              className="user-choice-image"
              src={gameChoiceObj.imageUrl}
              alt="opponent choice"
            />
          </div>
        </div>
        <p className="result-text">YOU LOSE</p>
        <button
          className="play-again-button"
          type="button"
          onClick={this.onClickPlayAgain}
        >
          PLAY AGAIN
        </button>
      </div>
    )
  }

  renderGameDrawView = () => {
    const {userChoice, gameChoice} = this.state
    const {choicesList} = this.props
    const userChoiceObjList = choicesList.filter(
      choice => choice.id === userChoice,
    )
    const userChoiceObj = userChoiceObjList[0]

    const gameChoiceObjList = choicesList.filter(
      choice => choice.id === gameChoice,
    )
    const gameChoiceObj = gameChoiceObjList[0]

    return (
      <div className="responsive-container">
        <div className="game-result-container">
          <div className="selected-option-container">
            <p className="user-text">YOU</p>
            <img
              className="user-choice-image"
              src={userChoiceObj.imageUrl}
              alt="your choice"
            />
          </div>
          <div className="selected-option-container">
            <p className="user-text">OPPONENT</p>
            <img
              className="user-choice-image"
              src={gameChoiceObj.imageUrl}
              alt="opponent choice"
            />
          </div>
        </div>
        <p className="result-text">IT IS DRAW</p>
        <button
          className="play-again-button"
          type="button"
          onClick={this.onClickPlayAgain}
        >
          PLAY AGAIN
        </button>
      </div>
    )
  }

  renderGameView = () => {
    const {gameStatus} = this.state
    switch (gameStatus) {
      case gameStatusConstant.inProgress:
        return this.renderInProgressView()
      case gameStatusConstant.win:
        return this.renderGameWonView()
      case gameStatusConstant.lost:
        return this.renderGameLostView()
      case gameStatusConstant.draw:
        return this.renderGameDrawView()

      default:
        return null
    }
  }

  render() {
    const {score} = this.state

    return (
      <div className="app-container">
        <div className="result-container">
          <div className="options-container">
            <h1 className="option">
              ROCK
              <br />
              PAPER
              <br />
              SCISSORS
            </h1>
          </div>
          <div className="score-card">
            <p className="score-text">Score</p>
            <p className="score">{score}</p>
          </div>
        </div>
        <div className="game-view-container">{this.renderGameView()}</div>
        <div className="popup-container">
          <Popup
            modal
            trigger={
              <button className="trigger-button" type="button">
                Rules
              </button>
            }
          >
            {close => (
              <div className="popup-body">
                <img
                  className="popUp-image"
                  src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                  alt="rules"
                />
                <button
                  type="button"
                  className="close-btn"
                  onClick={() => close()}
                >
                  <RiCloseLine type="button" />
                </button>
              </div>
            )}
          </Popup>
        </div>
      </div>
    )
  }
}

export default RockPaperScissors
