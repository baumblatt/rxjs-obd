import {interval, Observable, Subscriber, Subscription, TeardownLogic} from 'rxjs';
import {defaultOBDWifiConfig, OBDConfig, OBDConnection} from '../connection';
import {OBDData} from '../model';
import {OBDEvent} from '../model/OBDEvent';

export class FromOBDObservable extends Observable<OBDEvent> {

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
	 * @param config
	 * @returns The observable of OBDEvents.
	 */
	static create(config = defaultOBDWifiConfig): Observable<OBDEvent> {
		return new FromOBDObservable(config);
	}

	constructor(private config?: OBDConfig) {
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

	_subscribe(subscriber: Subscriber<OBDEvent>): TeardownLogic {
		let unsubscribe: () => void;

		const {pullingInterval, connection} = this.config;
		this.connection = connection;

		this.connection.open(this.config).subscribe({
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
