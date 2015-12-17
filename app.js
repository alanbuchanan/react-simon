var Button = React.createClass({
    render: function () {
        return (<button onClick={this.props.reveal}>{this.props.number}</button> )
    }
})

var Buttons = React.createClass({

    render: function () {

        console.log(this.props);

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
        $('button').attr('disabled', 'false');
    },

    disableButtons: function () {
        $('button').attr('disabled', 'true');
    },

    init: function () {
        this.enableButtons();
        var arr = [];
        var arrayLength = 5;

        for (var i = 0; i < arrayLength; i++) {
            arr.push(Math.floor(Math.random() * 4) + 1);
        }

        this.state.cpuTotal = arr;
        console.log('cpuTotal:', this.state.cpuTotal);
        this.cpuRevealsOneMore();
    },

    componentDidMount: function () {
        this.init();
    },

    cpuRevealsOneMore: function () {
        this.state.cpuRevealed.push(this.state.cpuTotal[this.state.roundNumber]);
        this.state.roundNumber++;
        console.log('cpuRevealed:', this.state.cpuRevealed);
    },

    handleUserInput: function (num) {
        this.state.userSubmitted.push(num);
        console.log('userSubmitted:', this.state.userSubmitted);

        // User won
        if (_.isEqual(this.state.userSubmitted, this.state.cpuRevealed) && this.state.userSubmitted.length === this.state.cpuTotal.length) {

            console.log('You Win!');
            this.disableButtons();

        // User got a guess correct
        } else if (_.isEqual(this.state.userSubmitted, this.state.cpuRevealed)) {
            this.state.userSubmitted = [];
            this.cpuRevealsOneMore();
        }
    },

    render: function () {
        return (<Buttons submitGuess={this.handleUserInput} />)
    }
});

ReactDOM.render(<Main/>, document.getElementById('root'));