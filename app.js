var Button = React.createClass({
    render: function () {
        return (<button onClick={this.props.reveal}>{this.props.number}</button> )
    }
})

var Buttons = React.createClass({

    render: function () {

        var submitGuess = this.props.submitGuess;
        var arr = [1, 2, 3, 4];
        var buttons = arr.map(function (num, i) {
            //TODO: get buttons beeps working
            var link = 'https://s3.amazonaws.com/freecodecamp/simonSound' + num +'.mp3';
            var id = "btn" + num  + "Sound";
            return (
                    <div>
                        <audio id={id} src={link}></audio>
                        <button onClick={submitGuess.bind(null, num)} key={i + 1}>{num}</button>
                    </div>
                )
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
            guessStage: 0,
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

        console.log('cpuTotal:', s.cpuTotal);
        this.cpuRevealsOneMore();
        this.setState(s);
    },

    componentDidMount: function () {
        this.init();
    },

    cpuRevealsOneMore: function () {
        var s = this.state;
        s.cpuRevealed.push(s.cpuTotal[s.roundNumber]);
        console.log('cpuRevealed:', s.cpuRevealed);
        this.setState(s);
    },

    playSound: function (num) {
        switch(num) {
            case 1:
                var btn1Sound = document.getElementById("btn1Sound");
                btn1Sound.play()
                break;
            case 2:
                var btn2Sound = document.getElementById("btn2Sound");
                btn2Sound.play()
                break;
            case 3:
                var btn3Sound = document.getElementById("btn3Sound");
                btn3Sound.play()
                break;
            case 4:
                var btn4Sound = document.getElementById("btn4Sound");
                btn4Sound.play()
                break;
            default:
                break;

        }
    },

    handleUserInput: function (num) {

        this.playSound(num);

        // User clicked one of the buttons
        var s = this.state;
        s.userSubmitted.push(num);

        console.log('userSubmitted:', s.userSubmitted);

        if (s.userSubmitted[s.guessStage] !== s.cpuRevealed[s.guessStage]) {
        // User selected wrong answer
            console.log('You fucked up');
            s.cpuRevealed = [];
            s.userSubmitted = [];
            s.roundNumber = 0;
            this.cpuRevealsOneMore();
            s.guessStage = 0;
        } else {
        // User selected correct answer
            ++s.guessStage;
        }

        if (_.isEqual(s.userSubmitted, s.cpuRevealed) && s.userSubmitted.length === s.cpuTotal.length) {
        // User won
            console.log('You Win!');
            this.disableButtons();

        } else if (_.isEqual(s.userSubmitted, s.cpuRevealed)) {
        // User got a round correct
            s.userSubmitted = [];
            s.guessStage = 0;
            s.roundNumber++;
            this.cpuRevealsOneMore();
        }

        this.setState(s);
    },

    render: function () {
        return (<Buttons submitGuess={this.handleUserInput} />)
    }
});

ReactDOM.render(<Main/>, document.getElementById('root'));