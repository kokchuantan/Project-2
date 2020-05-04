var React = require("react");

class Home extends React.Component {
  render() 
  {
    var currentUser = this.props.user.charAt(0).toUpperCase() + this.props.user.slice(1);
    const listItems = this.props.list.map((item)=>{
        var link = 'post/' + item.id;
        if(item.time_completed){
          return <li><del><a href = {link}>{item.content}</a></del><br></br>Completed : {item.time_completed}</li>
        }
        else{
          if (item.urgent === 1){
            return <li class="font-weight-bold"><a href = {link}>* {item.content} *</a><br></br>Created : {item.time_created}</li>
          }
          else{
            return <li><a href = {link}>{item.content}</a><br></br>Created : {item.time_created}</li>
          }
        }
    });
    const allCategories = this.props.categories.map((category)=>{
      return <option value={category.id}>{category.name}</option>
        });
    return (
    <html lang="en">
        <head>
            <title>Home Page</title>
            <meta charset="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
            <link rel="stylesheet" href="/styles.css"></link>
            <link href='http://fonts.googleapis.com/css?family=Merienda+One' rel='stylesheet' type='text/css'></link>
            <link href='http://fonts.googleapis.com/css?family=Cookie' rel='stylesheet' type='text/css'></link>
            <link href='http://fonts.googleapis.com/css?family=Berkshire+Swash' rel='stylesheet' type='text/css'></link>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
        </head>
        <body>
            <div class = 'container'>
            <div><h1>{currentUser}'s List</h1></div>
            <div class = 'row'>
            <form method="get" action="/newPost">
            <button class  = 'mr-2 ml-3 btn btn-outline-success' type="submit">Create New Post</button>
            </form>
            <form method="get" action="/logout">
            <button class = 'btn btn-outline-danger' type="submit">Log Out</button>
            </form>
            </div>
            <div><h5>Choose category:</h5></div>
            <div class = 'row'>
                <form class = 'd-inline col-8'method="post" id = 'select' action="/category">
                <select class="custom-select" name='cat'>
                <option value = 'default'>Choose Category.</option>
                {allCategories}
                </select>
                <button class = 'd-inline btn btn-outline-primary' type="submit">Sort Posts</button>
                </form>
            </div>
            <div><ul>{listItems}</ul></div>  
            </div>  
            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        </body>
    </html>
    );
  }
}

module.exports = Home;