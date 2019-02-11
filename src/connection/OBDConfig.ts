import {EMPTY, Observable, of} from 'rxjs';
import {OBDConnection} from './OBDConnection';
import {BluetoothSerialDevice} from "../observables";

export interface OBDConfig {
	host?: string;
	port?: number;
	device?: BluetoothSerialDevice;
	pullingInterval: number;
	connection: OBDConnection;
}

export class DummyOBDConnection extends OBDConnection {

	open(config: any): Observable<any> {
		console.log('DummyOBDConnection.open');
		return EMPTY;
	}

	send(): Observable<any> {
		console.log('DummyOBDConnection.send');
		return EMPTY;
	}

	onData(): Observable<string> {
		return of('dummy connection, you must config an OBDConnection\r>');
	}

	close(): Observable<any> {
		console.log('DummyOBDConnection.close');
		return EMPTY;
	}
}

export const defaultOBDWifiConfig: OBDConfig = {
	host: '192.168.0.10',
	port: 35000,
	pullingInterval: 1000,
	connection: new DummyOBDConnection()
};

