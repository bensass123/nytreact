// Include React
var React = require("react");

// Here we include all of the sub-components


// Create the Parent Component
var Results = React.createClass({

    getInitialState: function(){
        return {
            saved: []
        }
    },

    delete: function(date, url, title) {
        console.log(date, url, title);
        fetch("/api/saved/", {
            method: "delete",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            //make sure to serialize your JSON body
            body: JSON.stringify({
                date: date,
                url: url,
                title: title
            })
        })
        .then( (response) => { 
            console.log('response from fetch/delete of saved.js')
            console.log(response);
            

        });
    },

    

    componentDidMount: function() {
      fetch('/api/saved')
        .then(res => res.json())
        .then(res => {
          this.setState({ saved: res });
          console.log(this.state.saved);  
        });
    },

    render: function() {
        return (
        <div className='row'>
            <div className="col-lg-12">
				<div className="panel panel-primary">
                    <div className="panel-heading">
                        <h2>Saved Articles</h2>
                        <h3>Click X to delete from Favorites</h3>
                    </div>
                    <div className="panel-body text-center">
                        <ul style={{'listStyleType':'none'}}>  
                            {this.state.saved.map((res, i) => {
                                return <div key={i}><button type='button' id={res.title} ><li><h3>{res.title}</h3><ul><li>{res.url}</li><li>{res.date}</li></ul></li></button><button id={res.url +'del'} onClick={()=> {this.delete(res.date, res.url, res.title); location.reload();}}>X</button></div>;
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        )}
})

module.exports = Results;