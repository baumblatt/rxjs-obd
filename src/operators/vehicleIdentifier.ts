import {Observable, Operator, Subscriber, TeardownLogic} from 'rxjs';
import {OBDEvent} from '../model/OBDEvent';
import {OBDOuterSubscriber} from '../model/OBDOuterSubscriber';

export function vehicleIdentifier() {
	return function (source: Observable<OBDEvent>): Observable<OBDEvent> {
		return source.lift(new VehicleIdentifierOperator());
	}
}

class VehicleIdentifierOperator implements Operator<OBDEvent, OBDEvent> {
	call(subscriber: Subscriber<OBDEvent>, source: Observable<OBDEvent>): TeardownLogic {
		return source.subscribe(new VehicleIdentifierSubscriber(subscriber));
	}
}

class VehicleIdentifierSubscriber extends OBDOuterSubscriber {

	constructor(destination: Subscriber<OBDEvent>) {
		super(destination);
	}

	/**
	 * Return the frequency of execution of this command.
	 * @return that this command must be executed every pulse.
	 */
	pulse(): number {
		return 0;
	}

	/**
	 * Return the string representation of the OBD Read command.
	 * @returns the string representation of the OBD Read command
	 */
	command(): string {
		return '09 02\r';
	}

	/**
	 * Return the name of the OBD Field on OBD Data object.
	 * @returns the name of the OBD Field on OBD Data object.
	 */
	field(): string {
		return 'vehicleIdentifier';
	}

	/**
	 * Parse the OBD response.
	 * @param bytes the response read from OBD.
	 * @returns the parsed response.
	 */
	parse(bytes: string[]): number | string {
		let result = "";

		for (let byte of bytes) {
			result += String.fromCharCode(parseInt(byte, 2));
		}

		return result.replace(/\0/g, '');
	}

}
