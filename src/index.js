import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import { calculateWinner } from './utils'

function Square(props) {
	return (
		<button className="square" onClick={() => props.onClick()}>{props.value}</button>
	)
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square 
				value={this.props.squares[i]}
				onClick={() => this.props.onClick(i)}
			/>
        )
    }
    render() {
        return (
            <div>
				<div className="board-row">
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>
				<div className="board-row">
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>
				<div className="board-row">
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>
			</div>
        )
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
            setpNumber: 0,
        }
    }
    handClick(i) {
        let history = this.state.history.slice(0, this.state.setpNumber + 1),
            current = history[history.length - 1],
            squares = current.squares.slice()
        if (calculateWinner(squares) || squares[i]) return
        squares[i] = this.state.xIsNext ? 'X' : 'O'
        this.setState({
            history: history.concat([{ squares }]),
            xIsNext: !this.state.xIsNext,
            setpNumber: history.length,
        })
    }
    jumpTo(step) {
        this.setState({
            setpNumber: step,
            xIsNext: step % 2 === 0,
        })
    }
    render() {
        let history = this.state.history,
            current = history[this.state.setpNumber],
            winner = calculateWinner(current.squares)
        let moves = history.map((step, move) => {
            let desc = move ? `Go to move # ${move}` : 'Go to game start'
            return (
                <li key={move}>
					<button onClick={() => this.jumpTo(move)}>{desc}</button>
				</li>
            )
        })
        let status
        if (winner) status = `Winner： ${winner}`
        else status = 'Next player： ' + (this.state.xIsNext ? 'X' : 'O')
        return (
            <div>
				<div className="game">
					<Board 
					squares={current.squares}
					onClick={i => this.handClick(i)} />
				</div>
				<div className="game-info">
					<div> {status} </div>
					<ol>{moves}</ol>
				</div>
			</div>
        )
    }
}

ReactDOM.render(<Game />, document.getElementById('root'))