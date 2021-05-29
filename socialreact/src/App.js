import React, {useRef, useState, useEffect, useMemo} from 'react';

import './App.css';
import firestore from './firebase.config';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      users: [],
      messages: [],
      loginMessage: '',
    };
  }

  componentDidUpdate() {
    console.log("Update")
    console.log("users", this.state.users)
  }

  toggleVisible = (username, password) => {
    let matches = false;
    this.state.users.forEach(user => {
      if(user.username === username && user.password === password){
        matches = true;
      }
    });
    if(matches){
      this.setState(state => ({ loggedIn: !state.loggedIn }));
      this.fetchMessages();
    }else{
      console.log("Failed");
      this.setState(state => ({ loginMessage: 'Incorrect Username or Password' }));
    }
  };

  fetchUsers = async() => {
    const response = firestore.collection('users');
    const data = await response.get();
    data.forEach(item=>{
      this.setState(state => ({ users: [...state.users, item.data()] }));
    });
  };

  fetchMessages = async() => {
    const response = firestore.collection('messages');
    const data = await response.get();
    data.forEach(item=>{
      this.setState(state => ({ messages: [...state.messages, item.data()] }));
    });
  };

  render() {
    return (
      <>
      <Button onClick={this.toggleVisible} >
            Toggle
          </Button>
        {this.state.loggedIn ? <HomePage users={this.state.users} messages={this.state.messages} /> : <LoginPage users={this.state.users} toggle={this.toggleVisible} getData={this.fetchUsers} message={this.state.loginMessage} />}
      </>
    );
  }
}

function LoginPage(props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // useEffect(() => {
  //   props.toggle(username, password);
  // }, [props.users]);

  return (
    <div className="App">
      <header className="App-header">
        <form className="form1" noValidate autoComplete="off">
          <TextField id="outlined-basic" label="Username" variant="outlined" onChange={
            event => setUsername(event.target.value)
          } />
          <TextField id="outlined-basic" label="Password" variant="outlined" onChange={
            event => setPassword(event.target.value)
          } />
          <Button onClick={() => { 
                  //alert('clicked');
                  props.getData();
                  //props.toggle(username, password);
                }
              }>
            Login
          </Button>
        </form>
        <p>{props.message}</p>
      </header>
    </div>
  );
}

function HomePage(props){
  return (
    <div className="App">
      <header className="App-header">
        <form className="form1" noValidate autoComplete="off">
          <Button onClick={() => { alert('Your Home!') }} onCvariant="contained">
            Welcome Home!
          </Button>
          {console.log(props.users)}
          {
            props.messages && props.messages.map(message => {
              return(
                <div>
                  <h4>{message.body}</h4>
                  <p>by {message.user}</p>
                </div>
              )
            })
          }
        </form>
      </header>
    </div>
  );
}

export default App;
