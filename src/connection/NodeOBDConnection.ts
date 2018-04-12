import * as net from 'net';
import {Observable} from 'rxjs/Observable';
import {empty} from 'rxjs/observable/empty';
import {Subject} from 'rxjs/Subject';
import {OBDConnection} from './OBDConnection';

/**
 * The wrapper net.Socket connection.
 */
export class NodeOBDConnection implements OBDConnection {
	/**
	 * Wrapped net.Socket instance.
	 */
	private socket: net.Socket;

	/**
	 * Subject of data incomming from OBD Reader connection.
	 */
	private data$: Subject<string>;

	/**
	 * Open connection to OBD Reader.
	 * @returns the observable of opening connection.
	 */
	open(config: { port: number, host: string }): Observable<any> {
		const {port, host} = config;
		const subject = new Subject();

		this.socket = net.connect(port, host, () => {
			this.data$ = new Subject<string>();
			this.socket.on('data', (input) => this.data$.next(input.toString('utf8')));

			subject.complete();
		});

		this.socket.on('error', (error) => subject.error(error));

		return subject.asObservable();
	}

	/**
	 * Send a command to OBD Reader.
	 * @returns the observable of send operation.
	 * The events emitted are ignored, wait for complete (successful) or error (failure).
	 */
	send(command: string): Observable<any> {
		this.socket.write(command);
		return empty();
	}

	/**
	 * Listener for data received from OBD Reader.
	 * @returns Observable of data received from OBD Reader.
	 */
	onData(): Observable<string> {
		return this.data$.asObservable();
	}

	/**
	 * Close and dispose resources of OBD Reader connection.
	 * @returns the observable of close operation.
	 * The events emitted are ignored, wait for complete (successful) or error (failure).
	 */
	close(): Observable<any> {
		this.data$.complete();
		this.socket.end();
		this.socket.destroy();
		return empty();
	}

}