import {Observable, Operator, Subscriber, TeardownLogic} from 'rxjs';
import {OBDEvent} from '../model/OBDEvent';
import {OBDOuterSubscriber} from '../model/OBDOuterSubscriber';

export function ethanolLevel() {
	return function (source: Observable<OBDEvent>): Observable<OBDEvent> {
		return source.lift(new EthanolLevelOperator());
	}
}

class EthanolLevelOperator implements Operator<OBDEvent, OBDEvent> {
	call(subscriber: Subscriber<OBDEvent>, source: Observable<OBDEvent>): TeardownLogic {
		return source.subscribe(new EthanolLevelSubscriber(subscriber));
	}
}

class EthanolLevelSubscriber extends OBDOuterSubscriber {

	constructor(destination: Subscriber<OBDEvent>) {
		super(destination);
	}

	/**
	 * Return the frequency of execution of this command.
	 * @return that this command must be executed every 5 pulses.
	 */
	pulse(): number {
		return 5;
	}

	/**
	 * Return the string representation of the OBD Read command.
	 * @returns the string representation of the OBD Read command
	 */
	command(): string {
		return '01 52 1\r';
	}

	/**
	 * Return the name of the OBD Field on OBD Data object.
	 * @returns the name of the OBD Field on OBD Data object.
	 */
	field(): string {
		return 'ethanolLevel';
	}

	/**
	 * Parse the OBD response.
	 * @param bytes the response read from OBD.
	 * @returns the parsed response.
	 */
	parse(bytes: string[]): number | string {
		return parseInt(bytes[2], 16) * 100 / 255;
	}

}
