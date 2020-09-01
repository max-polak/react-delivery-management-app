
class InfoBox extends React.Component{

	constructor(props){
		super(props);

		// only start app once //
		this.appStarted = false;

		// bind call to restartApp to parent method //
		this.restartApp = props.restartApp;
			
		// bind this to closeInformationBox method //
		this.closeInformationBox = this.closeInformationBox.bind(this);

		// Set empty states for actions messages //
		this.state = {
			actionHeader: "",
			actionMessage: ""
		};
	}

	// method to update actions state variables //
	actionsMessage(header,message){
		
		this.setState({
			actionHeader: header,
			actionMessage: message
		});
		
		document.getElementById("info-box").className = "actions";

	}

	// method to close information box and start the app //
	closeInformationBox(){

		// close the info box //
		document.getElementById("info-box").className = "hide";
		
		// start the app if not already started
		if(!this.appStarted){
			this.appStarted = true;
			this.restartApp();
			document.getElementById("my-app").className = "started";
		}
	}

	render(){
		return(
			<div id="info-box" className="information">
				<div className="outer-wrapper">
					<div className="inner-wrapper">

						<div className="information-msg">
							<h2>Welcome</h2>
							<p>This is React Delivery App Demo by Maksym Jakubowski.</p>
							<p>Its using 3 React Components - App, InfoBar and Driver to communicate between each other.</p>
							<p>Every 5 seconds it stimulates an update and a driver to complete his current delivery task.</p>
							<div className="buttons">
								<a className="button blue" onClick={this.closeInformationBox}>Okay</a>
								<a className="button transparent" href="https://github.com/" target="_blank">Show source code</a>
							</div>
						</div>

						<div className="app-finished-msg">
							<h2>Completed</h2>
							<p>All drivers have completed their daily tasks.</p>
							<p>What would you like to do?</p>
							<div className="buttons">
								<a className="button blue" onClick={this.restartApp}>Reload the app</a>
								<a className="button transparent" href="https://github.com/" target="_blank">Show source code</a>
								<a className="button red" onClick={this.closeInformationBox}>Close this</a>
							</div>
						</div>

						<div className="actions-msg">
							<h2>{this.state.actionHeader}</h2>
							<p dangerouslySetInnerHTML={{__html: this.state.actionMessage}}></p>
							<div className="buttons">
							<a className="button blue" onClick={this.closeInformationBox}>Okay</a>
							</div>
						</div>

					</div>
				</div>
			</div>
		);
	}

}