import React, { Component } from 'react'
import LoginForm from './components/LoginForm'
import NavBar from './components/NavBar'
import MainRoutes from './components/MainRoutes'
export class App extends Component {
  state ={ 
    username: '', 
    password: '', 
    email: '', 
    confirmationCode: '',
    loggedIn: false,
    currentUsername: ''
  }
  componentDidMount(){
    const getAuthExpire = localStorage.getItem('authExpires')
    if(getAuthExpire !== null){
      this.setState({ loggedIn: true})
    }
  }
  userLoggedIn = () => {
    this.setState({
      loggedIn: true
    })
  }
  updateUsername = (currentUsername) => {
    this.setState({
      currentUsername: currentUsername
    })
    localStorage.setItem("username", currentUsername)
  }
  logUserOut = (loginStatus) => {
    this.setState({
      loggedIn: loginStatus
    })
    localStorage.clear()
  }
  render() {
    const  { 
      username, 
      password, 
      email, 
      confirmationCode, 
      loggedIn,
      currentUsername} = this.state
    return (
      <div>
        { loggedIn && 
        <React.Fragment>
          <NavBar 
          logUserOut={this.logUserOut}
          currentUsername={currentUsername}
           /> <MainRoutes />
        </React.Fragment>
        }
        {!loggedIn && <LoginForm
        updateUsername={this.updateUsername}
        userLoggedIn={this.userLoggedIn}
        loggedIn={loggedIn}
        userName={username}
        password={password}
        email={email}
        confirmationCode={confirmationCode}
         />}
      </div>
    )
  }
}

export default App
