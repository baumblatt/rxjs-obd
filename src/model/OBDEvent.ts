import {Subject} from 'rxjs';
import {OBDConnection} from '../connection';
import {OBDData} from './OBDData';

import * as fromFields from './OBDFields';

/**
 * OBD Event that will be used in the internal part of the rxjs-obd stream.
 */
export class OBDEvent {

	/**
	 * Constructor for OBD Events, only rxjs-obd observables should use it.
	 *
	 * @param _id The event identifier.
	 * @param _connection The connection to ELM 327 OBD Reader.
	 * @param _subject The subject to be notified only by pluckODBData from rxjs-obd.
	 * @param _data The previous ODB data (Optional).
	 */
	constructor(private _id: number, private _connection: OBDConnection, private _subject: Subject<OBDData>, private _data = new OBDData()) {
	}

	/**
	 * Update a field of the public OBD Data.
	 * @param name The field name.
	 * @param value the new value of field.
	 */
	update(name: string, value: number | string) {
		const field = fromFields[name.toUpperCase()];
		const formatted = field.formatter ? field.formatter(field.unit, value) : `${value} ${field.unit}`;

		const {label, unit} = field;

		this._data[name] = {label, unit, value, formatted};
	}

	/**
	 * The subject to be notified only by pluckODBData from rxjs-obd.
	 */
	next(data: OBDData) {
		this._subject.next(data);
	}

	/**
	 * Return the event id.
	 * @returns the event id.
	 */
	get id(): number {
		return this._id;
	}

	/**
	 * Return the internal connection connection to be used by rxjs-obd operators only.
	 * @returns The connection connection to ELM 327 OBD Reader.
	 */
	get connection(): OBDConnection {
		return this._connection;
	}

	/**
	 * Return the public data of the rxjs-obd observables.
	 * @returns The public data.
	 */
	get data(): OBDData {
		return this._data;
	}

}
