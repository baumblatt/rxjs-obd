import {Observable} from 'rxjs/Observable';

export abstract class OBDConnection {
	/**
	 * Open connection to OBD Reader.
	 * @returns the observable of opening connection.
	 * The events emitted are ignored, wait for complete (successful) or error (failure).
	 */
	abstract open(config: any): Observable<any>;

	/**
	 * Send a command to OBD Reader.
	 * @returns the observable of send operation.
	 * The events emitted are ignored, wait for complete (successful) or error (failure).
	 */
	abstract send(command: string): Observable<any>;

	/**
	 * Listener for data received from OBD Reader.
	 * @returns Observable of data received from OBD Reader.
	 */
	abstract onData(): Observable<string>;

	/**
	 * Close and dispose resources of OBD Reader connection.
	 * @returns the observable of close operation.
	 * The events emitted are ignored, wait for complete (successful) or error (failure).
	 */
	abstract close(): Observable<any>;
}