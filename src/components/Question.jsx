import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getQuestionsFromApi, getTokenFromLocalStorage } from '../services';
import Timer from './Timer';
import { sendScore } from '../action';
import decodeEntity from '../services/decode';

class Question extends Component {
  state = {
    questions: [{
      question: '',
      incorrect_answers: [],
      correct_answer: '',
      category: '',
    }],
    index: 0,
    response: false,
    hidden: true,
    correct: '',
    dificuldade: '',
    seconds: 30,
  }

  async componentDidMount() {
    this.codeInterval = 0;
    await this.fetchApiSetState();
    this.startTimer();
  }

  startTimer = () => {
    const { seconds } = this.state;
    const sec = 1000;
    if (seconds > 0) {
      this.codeInterval = setInterval(this.countMinus, sec);
    }
  }

  countMinus = () => {
    const { seconds } = this.state;
    this.setState({ seconds: seconds - 1 });
    if (seconds === 1) {
      this.stopTimer();
      this.setState({ response: true, hidden: false });
    }
  }

  stopTimer = () => {
    clearInterval(this.codeInterval);
  }

  handleClick = (correct, item) => {
    this.stopTimer(this.codeInterval);
    const { dispatch } = this.props;
    const { dificuldade, seconds } = this.state;
    const score = 10;
    const dificuldades = {
      hard: 3,
      medium: 2,
      easy: 1,
    };
    this.setState({ response: true, hidden: false });
    if (correct === item) {
      if (dificuldade === 'easy') return dispatch(sendScore(score + (seconds * 1), 1));
      if (dificuldade === 'medium') return dispatch(sendScore(score + (seconds * 2), 1));
      if (dificuldade === 'hard') {
        return dispatch(sendScore(score + (seconds * dificuldades
          .hard), +1));
      }
    }
    if (correct !== item) return dispatch(sendScore(0, 0));
  }

  fetchApiSetState = async () => {
    const { history } = this.props;
    const { index } = this.state;
    const tokenID = getTokenFromLocalStorage();
    const results = await getQuestionsFromApi(tokenID);
    const response = await results.response_code;
    const invalid = 3;
    const code = response === invalid;

    if (code) {
      console.log('paginaInicial');
      return history.push('/');
    }
    const questions = results.results;
    const sortedQuestions = this.sortOptions(questions, index);
    const correctAnswer = results.results[index].correct_answer;

    return this.setState({
      questions,
      sortedQuestions,
      correct: correctAnswer,
      dificuldade: results.results[index].difficulty,
    });
  }

  sortOptions = (questions, index) => {
    const num = 0.5;
    const random = Math.random() - num;
    const arrayOptions = [
      ...questions[index].incorrect_answers, questions[index].correct_answer,
    ].sort(() => random);
    return arrayOptions;
  }

  handleClassName = (item, correctAnswer) => {
    const { response } = this.state;
    if (!response) {
      return '';
    }
    if (item === correctAnswer) {
      return 'correct';
    }
    return 'wrong';
  }

  handleNext = async () => {
    clearInterval(this.codeInterval);
    const { index, questions } = this.state;
    const { history } = this.props;
    const maxIndex = 4;
    if (index === maxIndex) {
      console.log('enviar localStorage');
      return history.push('/feedback');
    }
    this.setState({ index: index + 1,
      hidden: true,
      response: false,
      seconds: 30,
    });
    const sort = await this.sortOptions(questions, index + 1);
    const correctAnswer = questions[index + 1].correct_answer;
    this.setState({ sortedQuestions: sort, correct: correctAnswer });
    this.startTimer();
  }

  createMarkup = () => ({ __html: 'First &middot; Second' })

  render() {
    const {
      questions,
      index, sortedQuestions, response, hidden, correct, seconds } = this.state;

    return (
      <>
        <Timer start={ this.startTimer } sec={ seconds } />
        <div className="div-question">
          <div className="div-question-category">
            <div>
              <p>Category: </p>
              <span data-testid="question-category">{questions[index].category}</span>
            </div>
            <p data-testid="question-text">{decodeEntity(questions[index].question)}</p>
          </div>
          <div className="awnser-options" data-testid="answer-options">
            {
              (sortedQuestions
              && sortedQuestions.map((item, i) => (
                <button
                  onClick={ () => this.handleClick(correct, item) }
                  value={ item }
                  className={
                    this.handleClassName(item, questions[index]
                      .correct_answer, response)
                  }
                  data-testid={
                    item === questions[index].correct_answer ? 'correct-answer'
                      : `wrong-answer-${i}`
                  }
                  type="button"
                  key={ i }
                  disabled={ response }
                >
                  {decodeEntity(item)}
                </button>
              ))
              )
            }
          </div>

        </div>
        {!hidden
          && (
            <button
              onClick={ this.handleNext }
              data-testid="btn-next"
              type="button"
              hidden={ hidden }
            >
              Next
            </button>
          ) }

      </>
    );
  }
}

Question.propTypes = {
  history: PropTypes.object,
  questions: PropTypes.array,
}.irRequired;

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  picture: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Question);
