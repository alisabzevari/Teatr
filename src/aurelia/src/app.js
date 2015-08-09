export class Welcome {
	heading = "Welcome to the Aurelia";
	firstName = "Ali";
	lastName = "Sabzevari";

	get fullName() {
		return `${this.firstName} ${this.lastName}`;
	}
	
	submit() {
		alert(`Welcome, ${this.fullName}!`);
	}
}