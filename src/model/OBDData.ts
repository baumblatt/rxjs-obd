import {OBDField} from './OBDField';

/**
 * OBD Data representations.
 */
export class OBDData {

	/**
	 * The timestamp of the start of each event (before first field read).
	 */
	timestamp?: number;

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
	 * The representation of Vehicle Identifier.
	 */
	vehicleIdentifier?: OBDField;

	/**
	 * The representation of Vehicle Speed.
	 */
	vehicleSpeed?: OBDField;
}
