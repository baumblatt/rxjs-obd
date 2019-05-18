import {Observable, Operator, OperatorFunction, Subscriber, TeardownLogic} from 'rxjs';
import {OBDData} from '../model';
import {OBDEvent} from '../model/OBDEvent';


export function pluckOBDData(): OperatorFunction<OBDEvent, OBDData> {
	return function (source: Observable<OBDEvent>): Observable<OBDData> {
		return source.lift(new PluckOBDDataOperator());
	}
}

class PluckOBDDataOperator implements Operator<OBDEvent, OBDData> {
	call(subscriber: Subscriber<OBDData>, source: Observable<OBDEvent>): TeardownLogic {
		return source.subscribe(new PluckOBDDataSubscriber(subscriber));
	}
}

class PluckOBDDataSubscriber extends Subscriber<OBDEvent> {
	constructor(destination: Subscriber<OBDData>) {
		super(destination);
	}

	protected _next(event: OBDEvent) {
		event.next(event.data);
		this.destination.next(event.data);
	}
}
