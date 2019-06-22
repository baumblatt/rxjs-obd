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
	 * The representation of Calculated Engine Load.
	 */
	calculatedEngineLoad?: OBDField;

	/**
	 * The representation of Engine Coolant Temperature.
	 */
	engineCoolantTemperature?: OBDField;

	/**
	 * The representation of Ethanol Level.
	 */
	ethanolLevel?: OBDField;

	/**
	 * The representation of Fuel Pressure.
	 */
	fuelPressure?: OBDField;

	/**
	 * The representation of Fuel Tank Level.
	 */
	fuelTankLevel?: OBDField;

	/**
	 * The representation of Fuel System Status.
	 */
	fuelSystemStatus?: OBDField;

	/**
	 * The representation of Intake Manifold Absolute Pressure.
	 */
	intakeManifoldAbsolutePressure?: OBDField;

	/**
	 * The representation of RPM.
	 */
	rpm?: OBDField;

	/**
	 * The representation of Timing Advance.
	 */
	timingAdvance?: OBDField;

	/**
	 * The representation of Vehicle Identifier.
	 */
	vehicleIdentifier?: OBDField;

	/**
	 * The representation of Vehicle Speed.
	 */
	vehicleSpeed?: OBDField;
}
