import {Observable, Operator, Subscriber, TeardownLogic} from 'rxjs';
import {OBDEvent} from '../model/OBDEvent';
import {OBDOuterSubscriber} from '../model/OBDOuterSubscriber';

export function oxygenSensorSTFT(sensor: number) {
	return function (source: Observable<OBDEvent>): Observable<OBDEvent> {
		return source.lift(new OxygenSensorSTFTOperator(sensor));
	}
}

class OxygenSensorSTFTOperator implements Operator<OBDEvent, OBDEvent> {
	constructor(public sensor: number) {
	}

	call(subscriber: Subscriber<OBDEvent>, source: Observable<OBDEvent>): TeardownLogic {
		return source.subscribe(new OxygenSensorSTFTSubscriber(subscriber, this.sensor));
	}
}

class OxygenSensorSTFTSubscriber extends OBDOuterSubscriber {

	constructor(destination: Subscriber<OBDEvent>, public sensor: number) {
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
		return `01 ${['14', '15', '16', '17', '18', '19', '1A', '1B'][this.sensor - 1]} 1\r`;
	}

	/**
	 * Return the name of the OBD Field on OBD Data object.
	 * @returns the name of the OBD Field on OBD Data object.
	 */
	field(): string[] {
		return [`oxygenSensorVoltage${this.sensor}`, `oxygenSensorShortTermFuelTrim${this.sensor}`];
	}

	/**
	 * Parse the OBD response.
	 * @param bytes the response read from OBD.
	 * @returns the parsed response.
	 */
	parse(bytes: string[]): number[] {
		return [parseInt(bytes[2], 16) / 200, (parseInt(bytes[3], 16) * 1.28) - 100];
	}

}
