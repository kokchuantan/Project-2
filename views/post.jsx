var React = require("react");

class Post extends React.Component {
  render() 
  {
    const editLink = '/post/'+ this.props.post[0].id +"/edit";
    const deleteLink = "/post/"+ this.props.post[0].id+ "?_method=delete";
    const post = this.props.post[0].content;
    var currentUser = this.props.user.charAt(0).toUpperCase() + this.props.user.slice(1);
    return (
    <html lang="en">
    <head>
        <title>Post</title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
        </head>
    <body>
        <div class = 'containter ml-3'>
            <div><h1>{currentUser}'s List</h1></div>
            <div>{post}</div>
            <div class = 'row ml-1'>
            <a class = 'btn btn-outline-info'href={editLink}>Edit Post</a>
              <form method="POST" action={deleteLink}>
                <input class ='btn btn-outline-danger' type="submit" value="delete post"/>
            </form>
            </div>
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