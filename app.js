var Button = React.createClass({
    render: function () {
        return (<button onClick={this.props.reveal}>{this.props.number}</button> )
    }
})

var Buttons = React.createClass({

    render: function () {

        var submitGuess = this.props.submitGuess;
        var arr = [1, 2, 3, 4];
        var buttons = arr.map(function (num) {
            return <button onClick={submitGuess.bind(null, num)}>{num}</button>
        });

        return (
            <div>
                {buttons}
            </div>
        )
    }
});

var Main = React.createClass({

    getInitialState: function () {
        return {
            cpuTotal: [],
            cpuRevealed: [],
            roundNumber: 0,
            userSubmitted: []
        }
    },

    enableButtons: function () {
        $('button').attr('disabled', false);
    },

    disableButtons: function () {
        $('button').attr('disabled', true);
    },

    init: function () {
        var s = this.state;
        this.enableButtons();
        var arr = [];
        var arrayLength = 5;

        for (var i = 0; i < arrayLength; i++) {
            arr.push(Math.floor(Math.random() * 4) + 1);
        }

        s.cpuTotal = arr;

        console.log('cpuTotal:', this.state.cpuTotal);
        this.cpuRevealsOneMore();
        this.setState(s);
    },

    componentDidMount: function () {
        this.init();
    },

    cpuRevealsOneMore: function () {
        var s = this.state;
        s.cpuRevealed.push(s.cpuTotal[s.roundNumber]);
        s.roundNumber++;
        console.log('cpuRevealed:', s.cpuRevealed);
        this.setState(s);
    },


    handleUserInput: function (num) {
        var s = this.state;
        s.userSubmitted.push(num);
        console.log('userSubmitted:', s.userSubmitted);

        // User won
        if (_.isEqual(s.userSubmitted, s.cpuRevealed) && s.userSubmitted.length === s.cpuTotal.length) {
            console.log('You Win!');
            this.disableButtons();

        // User got a guess correct
        } else if (_.isEqual(s.userSubmitted, s.cpuRevealed)) {
            s.userSubmitted = [];
            this.cpuRevealsOneMore();
        }
        this.setState(s);
    },

    render: function () {
        return (<Buttons submitGuess={this.handleUserInput} />)
    }
});

ReactDOM.render(<Main/>, document.getElementById('root'));