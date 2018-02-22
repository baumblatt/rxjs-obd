import {OperatorFunction} from 'rxjs/interfaces';
import {Observable} from 'rxjs/Observable';
import {Operator} from 'rxjs/Operator';
import {Subscriber} from 'rxjs/Subscriber';
import {TeardownLogic} from 'rxjs/Subscription';
import {OBDData} from '../model/OBDData';
import {OBDEvent} from '../model/OBDEvent';


export function pluckODBData(): OperatorFunction<OBDEvent, OBDData> {
	return function (source: Observable<OBDEvent>): Observable<OBDData> {
		return source.lift(new PluckODBDataOperator());
	}
}

class PluckODBDataOperator implements Operator<OBDEvent, OBDData> {
	call(subscriber: Subscriber<OBDData>, source: Observable<OBDEvent>): TeardownLogic {
		return source.subscribe(new PluckODBDataSubscriber(subscriber));
	}
}

class PluckODBDataSubscriber extends Subscriber<OBDEvent> {
	constructor(destination: Subscriber<OBDData>) {
		super(destination);
	}

	protected _next(event: OBDEvent) {
		event.done(event.data);
		this.destination.next(event.data);
	}
}