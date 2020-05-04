var React = require("react");

class newPost extends React.Component {
  render() 
  {
    const allCategories = this.props.categories.map((category)=>{
    return <option value={category.id}>{category.name}</option>
      });
    return (
    <html lang="en">
    <head>
        <title>New Post</title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        <link rel="stylesheet" href="/styles.css"></link>
          <link href='http://fonts.googleapis.com/css?family=Merienda+One' rel='stylesheet' type='text/css'></link>
          <link href='http://fonts.googleapis.com/css?family=Cookie' rel='stylesheet' type='text/css'></link>
          <link href='http://fonts.googleapis.com/css?family=Berkshire+Swash' rel='stylesheet' type='text/css'></link>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
        </head>
    <body>
    <form method="POST" action='/newPost'>
        <p>New Post:</p>
        <input type="text" name="content"/>
        <select class="custom-select" name='cat'>
            {allCategories}
        </select>
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox1" name ='urgent'value='1'/>
            <label class="form-check-label" for="inlineCheckbox1">Urgent</label>
        </div>
        <input class = 'btn btn-primary' type="submit" value="Post"/>
    </form>
    <a class ='btn btn-outline-info' href = '/home'>Back to List</a>
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        </body>
    </html>
);
  }
}

module.exports = newPost;