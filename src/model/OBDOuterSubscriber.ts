import {from, Subscriber} from 'rxjs';
import {tap} from "rxjs/internal/operators/tap";
import {map, mergeMap, take} from 'rxjs/operators';
import {OuterSubscriber} from '../internal/OuterSubscriber';
import {obdReader} from '../operators/obdReader';
import {OBDEvent} from './OBDEvent';

const OBD_OUTPUT_DELIMITER = '\r';

export abstract class OBDOuterSubscriber extends OuterSubscriber<OBDEvent, OBDEvent> {

	protected constructor(destination: Subscriber<OBDEvent>) {
		super(destination);
	}

	/**
	 * Return the string representation of the OBD Read command.
	 * For example use '010C\r' for Engine RPM.
	 * @returns the string representation of the OBD Read command
	 */
	abstract command(): string;

	/**
	 * Return the name of the OBD Field on OBD Data object.
	 * For example use 'rpm' for Engine RPM.
	 * @returns the name of the OBD Field on OBD Data object.
	 */
	abstract field(): string;

	/**
	 * Parse the OBD response.
	 * @param bytes the response read from OBD.
	 * @returns the parsed response.
	 */
	abstract parse(bytes: string[]): number | string;

	/**
	 * Send the command to OBD Reader and try to read the response.
	 * @param event The OBD reader event loop.
	 */
	protected _next(event: OBDEvent) {
		const self = this;

		event.connection.send(this.command()).subscribe({
			error: (error: any) => self.destination.error(error),
			complete: () => self.read(event)
		});
	}

	/**
	 * Read one return from OBD, parse and update event.
	 * @param event the OBD reader event loop.
	 */
	read(event: OBDEvent) {
		event.connection.onData().pipe(
			tap(data => console.log('data', data)),
			mergeMap((data: string) => from(data.split(OBD_OUTPUT_DELIMITER))),
			obdReader(),
			take(1),
			map((result: string[]) => this.parse(result)),
		).subscribe(
			(value: number | string) => {
				event.update(this.field(), value);
				this.destination.next(event);
			},
			(error: any) => this.destination.error(error)
		);
	}
}
