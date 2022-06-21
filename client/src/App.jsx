import './App.css'
import React from 'react'
import $ from 'jquery'

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
      this.getInfo() // move to the callback?
    }
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
          {this.state.info.map(todo => <p className="todo" key={todo.id}>{todo.data}</p>)}
        </div>
      </div>
    }
    else return <h1>Loading...</h1>
  }
}

export default App
