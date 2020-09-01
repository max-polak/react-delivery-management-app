
// Top Bar Component - got buttons navigation and clock //
class TopBar extends React.Component{

	constructor(props){
		super(props);

		this.restartApp = props.restartApp;
	}

	render(){
		return(
			<div id="top-bar">
				<div id="nav">
					<a className="button round transparent information" onClick={this.openInfoBox}>
						Information
					</a>
					<a className="button round transparent reload" onClick={this.restartApp}>
						Reload
					</a>
				</div>
				<Clock />
			</div>
		);
	}

	// opens the info box //
	openInfoBox(){
		document.getElementById("info-box").className = "information";
	}
}

// Clock Component
class Clock extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {date: new Date()};
	}

	// Start the timer //
	componentDidMount(){
		this.timeId = setInterval( () => this.tick(), 1000);
	}

	// Remove the timer //
	componentWillUnmount(){
		clearInterval(this.timeId);
	}

	// get new time //
	tick(){
		this.setState({
			date: new Date()
		});
	}

	render(){
		return(
			<div id="clock">
				<p>{this.state.date.toLocaleTimeString()}</p>
			</div>
		);
	}
}
