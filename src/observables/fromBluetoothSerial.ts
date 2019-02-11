import {Observable} from "rxjs";

/**
 * Observable adapter to list bluetooth devices.
 */
export const fromBluetoothSerialList = () => new Observable<BluetoothSerialDevice[]>(subscriber => {
	// declare successful handler
	const next = (value: BluetoothSerialDevice[]) => {
		subscriber.next(value);
		subscriber.complete();
	};

	// declare failure handler
	const error = (message: string) => subscriber.error(message);

	// invoke Cordova plugin.
	bluetoothSerial.list(next, error);
});


/**
 * Declare the Bluetooth Serial for Cordova plugin Bluetooth Serial.
 * https://www.npmjs.com/package/cordova-plugin-bluetooth-serial
 */

export interface BluetoothSerialDevice {
	id: string;
	uuid?: string;
	name?: string;
	address?: string;
	class?: number;
	rssi?: number;
}

type BluetoothSerialCallback = (message: string) => void;

export interface FromBluetoothSerial {
	/**
	 * Declare the List connection method.
	 */
	list: (success: (devices: BluetoothSerialDevice[]) => void, failure?: BluetoothSerialCallback) => void;

	/**
	 * Declare the connect connection method.
	 */
	connect: (device: string, success: BluetoothSerialCallback, failure?: BluetoothSerialCallback) => void;

	/**
	 * Declare the disconnect connection method.
	 */
	disconnect: (success?: BluetoothSerialCallback, failure?: BluetoothSerialCallback) => void;

	/**
	 * Declare the write connection method.
	 */
	write: (data: Uint8Array | string, success?: BluetoothSerialCallback, failure?: BluetoothSerialCallback) => void;

	/**
	 * Declare the subscribe connection method.
	 */
	subscribe: (delimiter: string, next: (data: any) => void, failure?: BluetoothSerialCallback) => void;

	/**
	 * Declare the unsubscribe connection method.
	 */
	unsubscribe: (success?: BluetoothSerialCallback, failure?: BluetoothSerialCallback) => void;
}

declare var bluetoothSerial: FromBluetoothSerial;
