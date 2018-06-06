import {EMPTY, Observable, of} from 'rxjs';
import {OBDConnection} from './OBDConnection';

export interface OBDWifiConfig {
	host: string;
	port: number;
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

export const defaultOBDWifiConfig: OBDWifiConfig = {
	host: '192.168.0.10',
	port: 35000,
	pullingInterval: 1000,
	connection: new DummyOBDConnection()
};

