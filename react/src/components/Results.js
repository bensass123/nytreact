// Include React
var React = require("react");

// Here we include all of the sub-components


// Create the Parent Component
var Results = React.createClass({

    poster: function(date, url, title) {
        console.log(date, url, title);
        fetch("/api/saved/", {
            method: "post",
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
            console.log('response from fetch of results.js')
            console.log(response);
        });
    },
    

    displayHelper: function(res){
        var html = '';
        for (var i = 0; i < res.length; i++){
            html += ' --------    Title: ' + res[i].headline.main + '  URL: ' + res[i].web_url + '  Date Submitted: ' + res[i].pub_date + '--------   ';
        }
        
        return html;
    },

    


    

    

    render: function() {
        return (
        <div className='row'>
            <div className="col-lg-12">
				<div className="panel panel-primary">
                    <div className="panel-heading">
                        <h2>Results</h2>
                        <h3>Click to save to Favorites</h3>
                    </div>
                    <div className="panel-body text-center">
                        <ul style={{'listStyleType':'none'}}>  
                            {this.props.titleArr.map((res, i) => {
                                return <div  key={i}><button type='button' id={res} onClick={()=> {this.poster(this.props.dateArr[i], this.props.urlArr[i], res); location.reload();}}><li><h3>{res}</h3><ul><li>{this.props.urlArr[i]}</li><li>{this.props.dateArr[i]}</li></ul></li></button><button type='button' onClick={()=>{window.open(this.props.urlArr[i])}}>Go to Article</button></div>;
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        );
    }
})

module.exports = Results;