import {Observable, Subscriber, Subscription} from 'rxjs';
import {interval} from 'rxjs/observable/interval';
import {TeardownLogic} from 'rxjs/Subscription';
import {OBDConnection} from '../connection/OBDConnection';
import {defaultOBDWifiConfig, OBDWifiConfig} from '../connection/OBDWifiConfig';
import {OBDData} from '../model/OBDData';
import {OBDEvent} from '../model/OBDEvent';

export class FromOBDWifiObservable extends Observable<OBDEvent> {

	/**
	 * The connection connection to ELM 327 OBD Reader.
	 */
	private connection: OBDConnection;

	/**
	 * Last OBD Data emitted.
	 */
	private data: OBDData;

	/**
	 * Flag of indicate that a pull loop is running.
	 */
	private running: boolean;

	/**
	 * Static constructor to be exported in the rxjs-obd.
	 * @param {OBDWifiConfig} config
	 * @returns {Observable<OBDEvent>} The observable of OBDEvents.
	 */
	static createWifi(config = defaultOBDWifiConfig): Observable<OBDEvent> {
		return new FromOBDWifiObservable(config);
	}

	constructor(private config?: OBDWifiConfig) {
		super();
	}

	done(data: OBDData) {
		this.data = {...data};
		this.running = false;
	}

	dispatchNext(id: number, subscriber: Subscriber<OBDEvent>) {
		if (!this.running) {
			this.running = true;
			const data = {...this.data};
			subscriber.next(new OBDEvent(id, this.connection, this.done.bind(this), data));
		}
	}

	protected _subscribe(subscriber: Subscriber<OBDEvent>): TeardownLogic {
		let unsubscribe: () => void;

		const {host, port, pullingInterval, connection} = this.config;
		this.connection = connection;

		this.connection.open({host, port}).subscribe({
			error: (error) => subscriber.error(error),
			complete: () => {
				// connected
				const subscription = interval(pullingInterval).subscribe((id) => this.dispatchNext(id, subscriber));

				unsubscribe = () => {
					connection.close();
					subscription.unsubscribe();
				};

				subscriber.add(new Subscription(unsubscribe));
			}
		});
	}

}