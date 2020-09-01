
// Main App Component //
class MyApp extends React.Component{

	constructor(props){
		
		super(props);
		const me = this;

		this.state = {
			driversDailyCompleted : 0,
			driversIndexKey: 7
		};

		// Create Ref to child InfoBox Component to call its actionsMessage method //
		this.infoBox = React.createRef();
		
		// driver names array //
		this.driversArray = [
			"Andrzej Kowalczyk",
			"Krzysztof Nowosad",
			"Maciej Szafraniak",
			"Mariusz Laskowski",
			"Cezary Szturo",
			"Jacek Piastowski",
			"Waldek Witkowski"
		];

		// drivers react elements array //
		this.driversElements = [];
	}

	render(){
		return(
			<div className="content-wrapper">
				<InfoBox ref={this.infoBox} restartApp={this.restartApp} />
				<div className="app-wrapper">

					<TopBar restartApp={this.restartApp}/>

					<div id="today-date">
						<h3>Delivery Management App Demo</h3>
					</div>

					<div id="delivery-table-wrapper">
					
						<table id="delivery-table">
							<thead>
								<tr>
									<th>Driver Name</th>
									<th>Tasks Completed</th>
									<th>Current Task</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{this.driversElements}
							</tbody>
						</table>
					</div>
					
				</div>
			</div>
		);
	}
	
	// Define methods with arrow to allow this to point to parent // 

	// method called from Driver when completed all daily tasks //
	driverTasksCompleted = () => {
		this.setState({
			driversDailyCompleted: this.state.driversDailyCompleted+1
		});

		if(this.state.driversDailyCompleted == 7){
			document.getElementById("info-box").className = "app-finished";
		}
	}
	
	// method called from Driver passing message to InfoBox  //
	actionsMessage = (header,message) => {
		this.infoBox.current.actionsMessage(header,message);
	}

	// Method to start and restart the app functionality // 
	restartApp = () => {

		// use const variable to bind this to passed methods //
		const me = this;

		// Empty drivers react elements array and repopulate, set new index keys to force React to refresh //
		me.driversElements = [];
		var startIndex = this.state.driversIndexKey;

		this.driversArray.forEach(function(driver, index){
			me.driversElements.push(
				<Driver 
					actionsMessage={me.actionsMessage} 
					driverTasksCompleted={me.driverTasksCompleted} 
					key={startIndex+index+1} 
					driverName={driver} 
				/>
			);
		});

		// reset state, and set new index // 
		this.setState({
			driversDailyCompleted: 0,
			driversIndexKey: startIndex+7
		});

		// close the info box //
		document.getElementById("info-box").className = "hide";

		this.forceUpdate();
	}

}

// wait for window to load, then init app //
(function() {
	
	// Init App //
	ReactDOM.render(
		<MyApp />,
		document.getElementById("my-app")
	);

})();