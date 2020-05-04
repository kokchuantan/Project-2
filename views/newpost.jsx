var React = require("react");
var Layout = require('./layout/layout');

class newPost extends React.Component {
  render() 
  {
    const allCategories = this.props.categories.map((category)=>{
    return <option value={category.id}>{category.name}</option>
      });
    return (
    <Layout title='New Post'>
      <div className =  'container'>
    <form method="POST" action='/newPost'>
        <p>New Post:</p>
        <input type="text" name="content"/>
        <select className="custom-select" name='cat'>
            {allCategories}
        </select>
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" name ='urgent'value='1'/>
            <label className="form-check-label" for="inlineCheckbox1">Urgent</label>
        </div>
        <input className = 'btn btn-primary' type="submit" value="Post"/>
    </form>
    <a className ='btn btn-outline-info' href = '/home'>Back to List</a>
    </div>
    </Layout>
);
  }
}

module.exports = newPost;