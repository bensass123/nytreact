// Include React
var React = require("react");
var QB = require('./QueryBuilder.js');

// Here we include all of the sub-components


// Create the Parent Component
var Search = React.createClass({
    getInitialState: function() {
        return {
                topicVal: 'na',
                startVal: '01012000',
                endVal:   '01012017',
                query: 'https://api.nytimes.com/svc/search/v2/articlesearch.json'};
    },

    setAndRunQuery: function(){
         var q = QB.buildUrl('https://api.nytimes.com/svc/search/v2/articlesearch.json',{
            'api-key': "dcb0f7ba1b4c4be5942adcefdb549ea1",
            'q': this.state.topicVal,
            'begin_date': this.state.startVal,
            'end_date': this.state.endVal
        })
        console.log(q);
        this.setState({
            query: q
        });
        setTimeout(()=>{
            this.runSearch();
        }, 250);
        
    },

    updateTopic: function(evt){
        this.setState({
            topicVal: evt.target.value
        })
        setTimeout(()=>{
            console.log(this.state.topicVal);
        }, 200)
    },

    updateStartYr: function(evt){
        this.setState({
            startVal: evt.target.value
        })
        setTimeout(()=>{
            console.log(this.state.startVal);
        }, 200)
    },

    updateEndYr: function(evt){
        this.setState({
            endVal: evt.target.value
        })
        setTimeout(()=>{
            console.log(this.state.endVal);
        }, 200)
    },

    runSearch: function() {
      console.log(this.state.query);
      fetch(this.state.query)
        .then(res => res.json())
        .then(results => {

          this.props.setResults(results.response.docs);
        });
    },

    render: function() {
        
        return (
        <div className='row'>
            <div className="col-lg-12">
				<div className="panel panel-primary">
                    <div className="panel-heading">
                        <h2>Search</h2>
                    </div>
                    <div className="panel-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="topic">Topic</label>
                                <input type="text" defaultValue={this.state.topicVal} onChange={this.updateTopic} className="form-control" id="topic" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="startyr">Start Year</label>
                                <input type="text" defaultValue={this.state.startVal} onChange={this.updateStartYr} className="form-control" id="startyr" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="endyr">End Year</label>
                                <input type="text" defaultValue={this.state.endVal} onChange={this.updateEndYr} className="form-control" id="endyr" />
                            </div>
                            <button type="button" className="btn btn-default" onClick={this.setAndRunQuery}>Submit</button>
                        </form>


                    </div>
                </div>
            </div>
        </div>
        
        );
    }
});


module.exports = Search;