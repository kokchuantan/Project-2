var React = require("react");
var Layout = require('./layout/layout');

class Post extends React.Component {
  render() 
  {
    const link = "/post/"+this.props.post[0].id+"?_method=put";
    const postLink = '/post/' + this.props.post[0].id;
    var currentUser = this.props.user.charAt(0).toUpperCase() + this.props.user.slice(1);

    if(this.props.post[0].urgent === 1){
      var urgentButton = <div className ="form-check form-check-inline">
      <input className ="form-check-input" type="checkbox" id="inlineCheckbox1" name ='urgent'value="1" checked/>
      <label className ="form-check-label" for="inlineCheckbox1">Urgent</label>
    </div>;
    }else {
      var urgentButton = <div className ="form-check form-check-inline">
      <input className ="form-check-input" type="checkbox" id="inlineCheckbox1" name ='urgent'value="1"/>
      <label className ="form-check-label" for="inlineCheckbox1">Urgent</label>
    </div>;
    }
    return (
        <Layout title = 'Post'>
        <div className  = 'containter ml-3'>
            <div><h1>{currentUser}'s List</h1></div>
            <h5>Edit post</h5>
            <form method="POST" action={link}>
            <p>Post:</p>
            <input name="content" value={this.props.post[0].content}/>
            <br></br>
            {urgentButton}
            <div className ="form-check form-check-inline">
              <input className ="form-check-input" type="checkbox" id="inlineCheckbox2" name = 'completed'value="true"/>
              <label className ="form-check-label" for="inlineCheckbox2">Completed</label>
            </div>
            <br></br>
            <input className  = 'btn btn-outline-success'type="submit" value="submit"/>
            </form>
            <a href={postLink}>Return to post.</a>
        </div>
        </Layout>
);
  }
}

module.exports = Post;