import {OBDConnection} from '../connection/OBDConnection';
import {OBDData} from './OBDData';

import * as fromFields from './OBDFields';

/**
 * OBD Event that will be used in the internal part of the rxjs-obd stream.
 */
export class OBDEvent {

	/**
	 * Event identifier;
	 */
	private _id: number;

	/**
	 * The connection connection to ELM 327 OBD Reader.
	 */
	private _connection: OBDConnection;

	/**
	 * Constructor for OBD Events, only rxjs-obd observables should use it.
	 *
	 * @param {number} id The event identifier.
	 * @param {OBDConnection} connection The connection to ELM 327 OBD Reader.
	 * @param {Function} _done The done function to be called only by pluckODBData from rxjs-obd.
	 * @param {OBDData} _data The previous ODB data (Optional).
	 */
	constructor(id: number, connection: OBDConnection, private _done: Function, private _data = new OBDData()) {
		this._id = id;
		this._connection = connection;
	}

	/**
	 * Update a field of the public OBD Data.
	 * @param {string} name The field name.
	 * @param {number | string} value the new value of field.
	 */
	update(name: string, value: number | string) {
		const field = fromFields[name.toUpperCase()];
		const formatted = `${value} ${field.unit}`;

		this._data[name] = {
			...field,
			value,
			formatted
		}
	}

	/**
	 * The done function to be called only by pluckODBData from rxjs-obd.
	 */
	done(data: OBDData) {
		this._done(data);
	}

	/**
	 * Return the event id.
	 * @returns {number} the event id.
	 */
	get id(): number {
		return this._id;
	}

	/**
	 * Return the internal connection connection to be used by rxjs-obd operators only.
	 * @returns {OBDConnection} The connection connection to ELM 327 OBD Reader.
	 */
	get connection(): OBDConnection {
		return this._connection;
	}

	/**
	 * Return the public data of the rxjs-obd observables.
	 * @returns {OBDData} The public data.
	 */
	get data(): OBDData {
		return this._data;
	}

}
