import {Observable} from 'rxjs/Observable';
import {Operator} from 'rxjs/Operator';
import {Subscriber} from 'rxjs/Subscriber';
import {TeardownLogic} from 'rxjs/Subscription';
import {OBDEvent} from '../model/OBDEvent';
import {OBDOuterSubscriber} from '../model/OBDOuterSubscriber';

export function fuelTankLevel() {
	return function (source: Observable<OBDEvent>): Observable<OBDEvent> {
		return source.lift(new FuelTankLevelOperator());
	}
}

class FuelTankLevelOperator implements Operator<OBDEvent, OBDEvent> {
	call(subscriber: Subscriber<OBDEvent>, source: Observable<OBDEvent>): TeardownLogic {
		return source.subscribe(new FuelTankLevelSubscriber(subscriber));
	}
}

class FuelTankLevelSubscriber extends OBDOuterSubscriber {

	constructor(destination: Subscriber<OBDEvent>) {
		super(destination);
	}

	/**
	 * Return the string representation of the OBD Read command.
	 * @returns {string} the string representation of the OBD Read command
	 */
	command(): string {
		return '012F\r';
	}

	/**
	 * Return the name of the OBD Field on OBD Data object.
	 * @returns {string} the name of the OBD Field on OBD Data object.
	 */
	field(): string {
		return 'fuelTankLevel';
	}

	/**
	 * Parse the OBD response.
	 * @param {string[]} bytes the response read from OBD.
	 * @returns {number | string} the parsed response.
	 */
	parse(bytes: string[]): number | string {
		return parseInt(bytes[2], 16) * 100 / 255;
	}

}