import {interval, Observable, Subject, Subscriber, Subscription} from 'rxjs';
import {defaultOBDWifiConfig} from '../connection';
import {supportedPIDs} from '../internal/operators/supportedPIDs';
import {OBDData} from '../model';
import {OBDEvent} from '../model/OBDEvent';

export const fromOBD = (config = defaultOBDWifiConfig) => new Observable<OBDEvent>((subscriber: Subscriber<OBDEvent>) => {

	/**
	 * The connection connection to ELM 327 OBD Reader.
	 */
	const {pullingInterval, connection} = config;

	/**
	 * Last OBD Data emitted.
	 */
	let data: OBDData;

	/**
	 * Flag of indicate that a pull loop is running.
	 */
	let running = false;

	/**
	 * Internal pulling (interval) subscription.
	 */
	let subscription: Subscription;

	/**
	 * Subject to observe the pluck moment.
	 */
	const subject = new Subject<OBDData>();

	subject.subscribe(
		(value: OBDData) => {
			data = {...value};
			running = false;
		}
	);


	const dispatchNext = (id: number, subscriber: Subscriber<OBDEvent>) => {
		if (!running) {
			running = true;
			subscriber.next(new OBDEvent(id, connection, subject, {...data}));
		}
	};

	connection.open(config).subscribe({
		error: (error) => subscriber.error(error),
		complete: () => {
			// connected
			subscription = interval(pullingInterval).subscribe((id) => dispatchNext(id, subscriber));
		}
	});

	return () => {
		if (!!connection) {
			connection.close();
		}

		if (!!subscription) {
			subscription.unsubscribe();
		}
	};

}).pipe(
	supportedPIDs('00'),
	supportedPIDs('20'),
	supportedPIDs('40'),
	supportedPIDs('60'),
);
