var React = require("react");
var Layout = require('./layout/layout');

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
            return <li className="font-weight-bold"><a href = {link}>* {item.content} *</a><br></br>Created : {item.time_created}</li>
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
    <Layout title='Home'>
            <div className = 'container'>
            <div><h1>{currentUser}'s List</h1></div>
            <div className = 'row'>
            <form method="get" action="/newPost">
            <button className  = 'mr-2 ml-3 btn btn-outline-success' type="submit">Create New Post</button>
            </form>
            <form method="get" action="/logout">
            <button className = 'btn btn-outline-danger' type="submit">Log Out</button>
            </form>
            </div>
            <div><h5>Choose category:</h5></div>
            <div className = 'row'>
                <form className = 'd-inline col-8'method="post" id = 'select' action="/category">
                <select className="custom-select" name='cat'>
                <option value = 'default'>Choose Category.</option>
                {allCategories}
                </select>
                <button className = 'd-inline btn btn-outline-primary' type="submit">Sort Posts</button>
                </form>
            </div>
            <div><ul>{listItems}</ul></div>  
            </div>  
            </Layout>
    );
  }
}

module.exports = Home;