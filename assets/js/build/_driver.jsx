
// Driver Component //
class Driver extends React.Component{

	constructor(props){
		super(props);
		this.driverName = props.driverName;

		// bind call to driverTasksCompleted to parent method //
		this.driverTasksCompleted = props.driverTasksCompleted;

		// bind call to actionsMessage to parent method //
		this.actionsMessage = props.actionsMessage;

		// Generate Job Numbers //
		var jobNumbersTaken = [];
		var jobNumbersArray = [];

		for(var i=200; i > 100; i--){
			var job = "DELI-033" + i;
			jobNumbersArray.push(job);
		}

		var i = 0;
		var driverJobNumbers = [];

		while(i < 5){

			var newJobNumber = jobNumbersArray[Math.floor(Math.random() * jobNumbersArray.length)];
			if( jobNumbersTaken.indexOf(newJobNumber) == -1){
				
				jobNumbersTaken.push(newJobNumber);
				driverJobNumbers.push(newJobNumber);
				i++;
			}
		}

		// Set State Variables //
		this.state = {
			jobNumbers: driverJobNumbers,
			completedJobsNum: 0,
			completedJobs: "-",
			currentJob: driverJobNumbers[0]
		};

	}

	// set interval to refresh every 5 seconds //
	componentDidMount(){
		this.timeId = setInterval( () => this.tick(), 5000);
	}

	// remove the interval when destroying the component //
	componentWillUnmount(){
		clearInterval(this.timeId);
	}

	// method to refresh the data //
	tick(){

		// randomise job completed - has 75% chance //
		var rand = Math.floor(Math.random() * 5);
		if( rand != 4){

			// increment completed tasks //
			this.setState({
				completedJobsNum: this.state.completedJobsNum+1
			});

			// if completed less then 5 tasks, give new //
			if(this.state.completedJobsNum+1 <= 5){

				// Previous job //
				var previousJobs = this.state.completedJobs;
				var previousCurrentJob = this.state.currentJob;

				// Set new job //
				var newJobNumber = this.state.jobNumbers[this.state.completedJobsNum];

				// If this was first job //
				if( previousJobs == "-"){

					this.setState({
						completedJobs: previousCurrentJob,
						currentJob: newJobNumber 
					});

				}else{
					var previousJobs = this.state.completedJobs;
					this.setState({
						completedJobs: previousJobs + "<p>" + previousCurrentJob + "</p>",
						currentJob: newJobNumber
					});

				}

			// if all tasks completed - call parent method driverTasksCompleted() //
			}else{
				clearInterval(this.timeId);

				var previousJobs = this.state.completedJobs;
				var previousCurrentJob = this.state.currentJob;

				this.setState({
					completedJobs: previousJobs + "<p>" + previousCurrentJob + "</p>",
					currentJob: "-"
				});
				
				this.driverTasksCompleted();
			}

			
		}
	}

	// calls parent method to call InfoBox method to print message //
	sendDriverMessage(driverName){
		this.actionsMessage("Message", "Your message to " + driverName + " was sent.");
	}

	// calls parent method to call InfoBox method to print message //
	callDriver(driverName){
		this.actionsMessage("Call", "Driver " + driverName + " has received your call.");
	}

	// calls parent method to call InfoBox method to print schedules //
	viewSchedule(props){
		this.actionsMessage("Schedule", "Today's schedule for " + this.driverName + ": <br>" + this.state.jobNumbers);
	}

	render(){
		return(
			<tr>
				<td>{this.driverName}</td>
				<td className="completed-jobs" dangerouslySetInnerHTML={{__html: this.state.completedJobs}}></td>
				<td>{this.state.currentJob}</td>
				<td className="actions">
					<div>
						<a onClick={() => this.viewSchedule()}>View Schedule</a>
					</div>
					<div>
						<a onClick={() => this.sendDriverMessage(this.driverName)}>Send Message</a>
					</div>
					<div>
						<a onClick={() => this.callDriver(this.driverName)}>Call Mobile</a>
					</div>
				</td>
			</tr>
		);
	}
}