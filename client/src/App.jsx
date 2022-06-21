import './App.css'
import React from 'react'
import {Link} from 'react-router-dom'
import $ from 'jquery'
import Edit from './Edit'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { info: false }
  }
  componentDidMount() {
    this.getInfo()
  }
  getInfo() {
    fetch('http://localhost:3001/todos')
    .then(x => x.json()).then(data => this.setState({info: data}))
  }
  check = (e) => {
    if (e.key == 'Enter') {
      $.post(
        'http://localhost:3001/todos',
        { data: e.target.value }
      )
      this.getInfo()
    }
  }
  delet = (e) => {
    this.getInfo()
  }
  render() {
    if (this.state.info) {
      return <div>
        <div id="create-container">
          Create new todo:
          <input
            type="text"
            placeholder="What must you do?"
            id="create-input"
            onKeyPress={this.check}
          />
        </div>
        <div id="todos">
          {
            this.state.info.map(todo => <div className="todo" key={todo.id}>
              {todo.data}
              <svg id={todo.id} className="btn" onclick={this.delet} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
              <Link to="#" element={<Edit/>}/>
              <svg id={todo.id} className="btn" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
              </Link>
            </div>)
          }
        </div>
      </div>
    }
    else return <h1>Loading...</h1>
  }
}

export default App
