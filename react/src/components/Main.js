// Include React
var React = require("react");

// Here we include all of the sub-components
var Results = require("./Results");
var Search = require("./Search");
var Saved = require("./Saved");


// Create the Parent Component
var Main = React.createClass({

    setResults: function(res) {
        var ta = [];
        var ua = [];
        var da = [];

        for (var i = 0; i < res.length; i++) {
            ta.push(res[i].headline.main);
            ua.push(res[i].web_url);
            da.push(res[i].pub_date);
        }

        this.setState({
            titleArr: ta,
            urlArr: ua,
            dateArr: da,
            fullResults: res
        })
    },

    getInitialState: function(){
        return {
            show1: true,
            show2: true,
            titleArr: [],
            urlArr: [],
            dateArr: [],
            fullResults: {}
         };
    },

    onClick1: function(){
        console.log('1');
            if (this.state.show1) {
                this.setState({show1: false});
            }
            else{
                this.setState({show1: true});
            }
    },
    onClick2: function(){
        console.log('2');
            if (this.state.show2) {
                this.setState({show2: false});
            }
            else{
                this.setState({show2: true});
            }
    },

    render: function() {
        return (

        <div className="container">

            <div className="row">
                <div className="jumbotron">
                    <h2><strong>NEW YORK TIMES SEARCH</strong></h2>
                    <p><em>React to this news!</em></p>
                    
                </div>
            </div>
            {this.state.show1 ? <Search setResults={this.setResults} /> : null}
            {this.state.show2 ? <Results titleArr={this.state.titleArr} urlArr={this.state.urlArr} dateArr={this.state.dateArr} fullResults={this.state.fullResults}/> : null}
            <Saved />
        </div>
        
        );
    }
});


module.exports = Main;