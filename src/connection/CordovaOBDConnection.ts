import {Observable} from 'rxjs/Observable';
import {empty} from 'rxjs/observable/empty';
import {Subject} from 'rxjs/Rx';
import {OBDConnection} from './OBDConnection';

/**
 * Declare the Socket for Cordova plugin Socket For Cordova.
 * https://www.npmjs.com/package/sockets-for-cordova.
 */
declare class Socket {
	/***
	 * Declare the open connection method.
	 */
	open(host: string, port: number, success: Function, error: Function): void;

	/***
	 * Declare the write connection method.
	 */
	write(data: Uint8Array, success: Function, error: Function): void;

	/***
	 * Declare the onData connection method.
	 */
	onData(data: Uint8Array): void;

	/***
	 * Declare the shutdownWrite connection method.
	 */
	shutdownWrite(): void;

	/***
	 * Declare the close connection method.
	 */
	close(): void;
}

/**
 * The wrapper of Socket for Cordova plugin Socket For Cordova.
 */
export class CordovaOBDConnection extends OBDConnection {

	/**
	 * Wrapped Cordova Socket instance.
	 */
	private socket: Socket;

	/**
	 * Subject of data incomming from OBD Reader connection.
	 */
	private data$: Subject<string>;

	/**
	 * Open connection to OBD Reader.
	 * @returns the observable of opening connection.
	 */
	open(config: any): Observable<any> {
		const {port, host} = config;
		const subject = new Subject();

		this.socket = new Socket();
		this.socket.open(host, port,
				() => {
					this.data$ = new Subject<string>();

					this.socket.onData = (data: Uint8Array) => {
						this.data$.next(CordovaOBDConnection.unmarshall(data));
					};

					subject.complete()
				},
				(error: any) => subject.error(error)
		);

		return subject.asObservable();
	}

	/**
	 * Send a command to OBD Reader.
	 * @returns the observable of send operation.
	 * The events emitted are ignored, wait for complete (successful) or error (failure).
	 */
	send(command: string): Observable<any> {
		const subject = new Subject();

		this.socket.write(CordovaOBDConnection.marshall(command),
				() => subject.complete(),
				(error: any) => subject.error(error)
		);

		return subject.asObservable();
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
		this.socket.shutdownWrite();
		setTimeout(this.socket.close());
		return empty();
	}

	/**
	 * Marshall the string data into bytes array.
	 * @param data the string data.
	 * @returns the bytes array.
	 */
	static marshall(data: string): Uint8Array {
		if (!data) {
			return new Uint8Array(0);
		}

		let bytes = new Uint8Array(data.length);

		for (let i = 0; i < bytes.length; i++) {
			bytes[i] = data.charCodeAt(i);
		}

		return bytes;
	}

	/**
	 * Unmarshall the bytes array into data string.
	 * @param bytes the bytes array.
	 * @returns the string data.
	 */
	static unmarshall(bytes: Uint8Array): string {
		return String.fromCharCode.apply(null, bytes);
	}

}


