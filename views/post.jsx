var React = require("react");

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
      var edit = <a class = 'btn btn-outline-info'href={editLink}>Edit Post</a>
    }
    var currentUser = this.props.user.charAt(0).toUpperCase() + this.props.user.slice(1);
    return (
    <html lang="en">
    <head>
        <title>Post</title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        <link rel="stylesheet" href="/styles.css"></link>
          <link href='http://fonts.googleapis.com/css?family=Merienda+One' rel='stylesheet' type='text/css'></link>
          <link href='http://fonts.googleapis.com/css?family=Cookie' rel='stylesheet' type='text/css'></link>
          <link href='http://fonts.googleapis.com/css?family=Berkshire+Swash' rel='stylesheet' type='text/css'></link>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
        </head>
    <body>
        <div class = 'container ml-3'>
            <div><h1>{currentUser}'s List</h1></div>
            {post}
            {time}
            <div class = 'row ml-1'>
            {edit}
            <form method="POST" action={deleteLink}>
                <input class ='btn btn-outline-danger' type="submit" value="delete post"/>
            </form>
            </div>
            <a href= '/'>Return to list.</a>
        </div>
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        </body>
    </html>
);
  }
}

module.exports = Post;