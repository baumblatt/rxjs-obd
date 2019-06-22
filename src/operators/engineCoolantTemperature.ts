import {Observable, Operator, Subscriber, TeardownLogic} from 'rxjs';
import {OBDEvent} from '../model/OBDEvent';
import {OBDOuterSubscriber} from '../model/OBDOuterSubscriber';

export function engineCoolantTemperature() {
	return function (source: Observable<OBDEvent>): Observable<OBDEvent> {
		return source.lift(new EngineCoolantTemperatureOperator());
	}
}

class EngineCoolantTemperatureOperator implements Operator<OBDEvent, OBDEvent> {
	call(subscriber: Subscriber<OBDEvent>, source: Observable<OBDEvent>): TeardownLogic {
		return source.subscribe(new EngineCoolantTemperatureSubscriber(subscriber));
	}
}

class EngineCoolantTemperatureSubscriber extends OBDOuterSubscriber {

	constructor(destination: Subscriber<OBDEvent>) {
		super(destination);
	}

	/**
	 * Return the frequency of execution of this command.
	 * @return that this command must be executed every pulse.
	 */
	pulse(): number {
		return 1;
	}

	/**
	 * Return the string representation of the OBD Read command.
	 * @returns the string representation of the OBD Read command
	 */
	command(): string {
		return '01 05 1\r';
	}

	/**
	 * Return the name of the OBD Field on OBD Data object.
	 * @returns the name of the OBD Field on OBD Data object.
	 */
	field(): string {
		return 'engineCoolantTemperature';
	}

	/**
	 * Parse the OBD response.
	 * @param bytes the response read from OBD.
	 * @returns the parsed response.
	 */
	parse(bytes: string[]): number | string {
		return parseInt(bytes[2], 16) - 40;
	}

}
