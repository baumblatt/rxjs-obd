import {OBDField} from './OBDField';

/**
 * OBD Data representations.
 */
export class OBDData {

	/**
	 * Constructor of OBD data.
	 * @param timestamp The timestamp of data.
	 */
	constructor(public timestamp: number = new Date().getTime()) {
	}

	/**
	 * The representation of Fuel Tank Level.
	 */
	ethanolLevel?: OBDField;

	/**
	 * The representation of Fuel Tank Level.
	 */
	fuelTankLevel?: OBDField;

	/**
	 * The representation of RPM.
	 */
	rpm?: OBDField;

	/**
	 * The representation of Vehicle Speed.
	 */
	vehicleSpeed?: OBDField;
}
