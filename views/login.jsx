var React = require("react");
var Layout = require('./layout/layout');

class Login extends React.Component {
  render() 
  {
    return (
    <Layout title = 'Login'>
    <div className = 'container'>
    <form method="POST" action='/login'>
          <h1>Login</h1>
          <p>Username: </p>
          <input type="text" name="username"/>
          <p>Password: </p>
            <input type="password" name="password"/>
            <input type="submit" value="Log In"/>
    </form>
    </div>
    </Layout>  
);
  }
}

module.exports = Login;