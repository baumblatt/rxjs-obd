import {Observable} from 'rxjs/Observable';
import {Operator} from 'rxjs/Operator';
import {Subscriber} from 'rxjs/Subscriber';
import {TeardownLogic} from 'rxjs/Subscription';
import {OBDEvent} from '../model/OBDEvent';
import {OBDOuterSubscriber} from '../model/OBDOuterSubscriber';

const RPM_COMMAND = '010C\r';

export function rpm() {
	return function (source: Observable<OBDEvent>): Observable<OBDEvent> {
		return source.lift(new RPMOperator());
	}
}

class RPMOperator implements Operator<OBDEvent, OBDEvent> {
	call(subscriber: Subscriber<OBDEvent>, source: Observable<OBDEvent>): TeardownLogic {
		return source.subscribe(new RPMSubscriber(subscriber));
	}
}

class RPMSubscriber extends OBDOuterSubscriber {

	constructor(destination: Subscriber<OBDEvent>) {
		super(destination);
	}

	/**
	 * Return the string representation of the OBD Read command.
	 * @returns {string} the string representation of the OBD Read command
	 */
	command(): string {
		return RPM_COMMAND;
	}

	/**
	 * Return the name of the OBD Field on OBD Data object.
	 * @returns {string} the name of the OBD Field on OBD Data object.
	 */
	field(): string {
		return 'rpm';
	}

	/**
	 * Parse the OBD response.
	 * @param {string[]} bytes the response read from OBD.
	 * @returns {number | string} the parsed response.
	 */
	parse(bytes: string[]): number | string {
		const a: number = parseInt(bytes[2], 16) * 256;
		const b: number = parseInt(bytes[3], 16);

		return (a + b) / 4;
	}

}