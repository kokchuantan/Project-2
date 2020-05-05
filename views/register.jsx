var React = require("react");
var Layout = require('./layout/layout');

class Register extends React.Component {
  render() 
  {
    return (
    <Layout title='Register'>
      <div className = 'container'>
    <form method="POST" action='/register'>
          <h1>Registration</h1>
          <p>Username: </p>
          <input type="text" name="username"/>
          <p>Password: </p>
            <input type="password" name="password"/>
            <input type="submit" value="Register"/>
    </form>
    <div><a href = '/login'>Already a user? Log in here!</a></div>
    </div>
    </Layout>
);
  }
}

module.exports = Register;