import {EMPTY, Observable, Subject} from 'rxjs';
import {OBDConnection} from './OBDConnection';
import {BluetoothSerialDevice} from "../observables";
import {FromBluetoothSerial} from "../observables/fromBluetoothSerial";

declare var bluetoothSerial: FromBluetoothSerial;


/**
 * The wrapper of Bluetooth Serial plugin for Cordova.
 */
export class BluetoothOBDConnection extends OBDConnection {
	/**
	 * Subject of data incoming from OBD Reader connection.
	 */
	private data$: Subject<string>;

	/**
	 * Open connection to OBD Reader.
	 * @returns the observable of opening connection.
	 */
	open(config: { device: BluetoothSerialDevice }): Observable<any> {
		const subject = new Subject();

		const {device} = config;

		bluetoothSerial.connect(device.id,
			() => {
				this.data$ = new Subject<string>();

				bluetoothSerial.subscribe('\r>', (data: string) => {
					this.data$.next(data);
				}, (error: any) => {
					this.close();
					subject.error(error);
				});

				subject.complete();

			},
			(error: any) => subject.error(error)
		);

		return subject.asObservable();
	}

	/**
	 * Close and dispose resources of OBD Reader connection.
	 * @returns the observable of close operation.
	 * The events emitted are ignored, wait for complete (successful) or error (failure).
	 */
	close(): Observable<any> {
		this.data$.complete();
		bluetoothSerial.unsubscribe();
		bluetoothSerial.disconnect();
		return EMPTY;
	}

	/**
	 * Listener for data received from OBD Reader.
	 * @returns Observable of data received from OBD Reader.
	 */
	onData(): Observable<string> {
		return this.data$.asObservable();
	}

	/**
	 * Send a command to OBD Reader.
	 * @returns the observable of send operation.
	 * The events emitted are ignored, wait for complete (successful) or error (failure).
	 */
	send(command: string): Observable<any> {
		const subject = new Subject();

		bluetoothSerial.write(command,
			() => subject.complete(),
			(error: any) => subject.error(error)
		);

		return subject.asObservable();
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
