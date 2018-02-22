import {OBDField} from './OBDField';

/**
 * OBD Data representations.
 */
export class OBDData {
	/**
	 * The representation of RPM.
	 */
	rpm?: OBDField;

	/**
	 * The representation of Vehicle Speed.
	 */
	vehicleSpeed?: OBDField;
}