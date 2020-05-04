var React = require("react");
var Layout = require('./layout/layout');

class Post extends React.Component {
  render() 
  {
    const editLink = '/post/'+ this.props.post[0].id +"/edit";
    const deleteLink = "/post/"+ this.props.post[0].id+ "?_method=delete";
    if(this.props.post[0].time_completed){
      var post = <del>{this.props.post[0].content}</del>
      var time = <div>Completed on {this.props.post[0].time_completed}</div>
      var edit = '';
    }
    else{
      var post = <div>{this.props.post[0].content}</div>
      var time = <div>Created on {this.props.post[0].time_created}</div>
      var edit = <a className = 'btn btn-outline-info'href={editLink}>Edit Post</a>
    }
    var currentUser = this.props.user.charAt(0).toUpperCase() + this.props.user.slice(1);
    return (
    <Layout title = 'Post'>
        <div className = 'container ml-3'>
            <div><h1>{currentUser}'s List</h1></div>
            <h5>{post}</h5>
            <h5>{time}</h5>
            <div className = 'row ml-1'>
            {edit}
            <form method="POST" action={deleteLink}>
                <input className ='btn btn-outline-danger' type="submit" value="delete post"/>
            </form>
            </div>
            <a href= '/'>Return to list.</a>
        </div>
        </Layout>
);
  }
}

module.exports = Post;