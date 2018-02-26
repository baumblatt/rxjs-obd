import {OperatorFunction} from 'rxjs/interfaces';
import {Observable} from 'rxjs/Observable';
import {Operator} from 'rxjs/Operator';
import {Subscriber} from 'rxjs/Subscriber';
import {TeardownLogic} from 'rxjs/Subscription';

enum OBD_OUTPUT_MESSAGE_TYPES {
	MODE_01 = '41',
}

const OBD_PROMPT: string = '>';

export function obdReader(): OperatorFunction<string, string[]> {
	return function (source: Observable<string>): Observable<string[]> {
		return source.lift(new OBDReaderOperator());
	}
}

class OBDReaderOperator implements Operator<string, string[]> {
	call(subscriber: Subscriber<string[]>, source: any): TeardownLogic {
		return source.subscribe(new OBDReaderSubscriber(subscriber));
	}
}

class OBDReaderSubscriber extends Subscriber<string> {

	/**
	 * Internal buffer of bytes received from OBD.
	 * @type {string[]}
	 */
	memento: string[] = [];

	/**
	 * Interal buffer of the entire output for debug propose.
	 */
	buffer: string = '';

	constructor(destination: Subscriber<string[]>) {
		super(destination);
	}

	protected _next(data: string) {
		this.buffer += data;

		if (OBDReaderSubscriber.hasPrompt(data)) {
			const bytes = this.memento;

			if (OBDReaderSubscriber.isOutput(bytes, OBD_OUTPUT_MESSAGE_TYPES.MODE_01)) {
				this.destination.next(bytes);
			} else {
				this.destination.error(`Prompt received without data. Last call ${JSON.stringify(data)} and the entire output was ${JSON.stringify(this.buffer)}`);
			}

			//clear buffers
			this.memento = [];
			this.buffer = '';
		} else if (data) {
			const bytes = OBDReaderSubscriber.getByteGroupings(data);

			if (OBDReaderSubscriber.isOutput(bytes, OBD_OUTPUT_MESSAGE_TYPES.MODE_01)) {
				this.memento = bytes;
			}
		}
	}

	/**
	 * Determines if the passed buffer/string has a prompt.
	 * that indicates it has been completed.
	 * @param   {String} data the returned data.
	 * @return  {Boolean} flag indicating if the data has a prompt.
	 */
	static hasPrompt(data: string) {
		// Basically, we check that the a newline has started
		return data.indexOf(OBD_PROMPT) !== -1;
	}

	/**
	 * Determines if the passed buffer is an output of desired mode.
	 * @param {string[]} bytes the buffer returned by OBD
	 * @param {OBD_OUTPUT_MESSAGE_TYPES} mode the desired mode.
	 * @returns {(string[] | number) | boolean} Flag indicating that is a valid result.
	 */
	static isOutput(bytes: string[], mode: OBD_OUTPUT_MESSAGE_TYPES) {
		return bytes && bytes.length && bytes[0] === mode;
	}

	/**
	 * Convert the returned bytes into their pairs if possible, or return null.
	 * @param  {String} str the returned bytes.
	 * @return {Array|null} the returned bytes into their pairs if possible, or return null.
	 */
	static getByteGroupings(str: string): Array<string> | null {
		// Remove white space (if any exists) and get byte groups as pairs
		return str.replace(/\ /g, '').match(/.{1,2}/g);
	}
}
