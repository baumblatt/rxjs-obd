import {OBDField} from './OBDField';

const integer = (unit: string, value: string | number) => `${Math.round(<number>value)} ${unit}`;
const rowData = (unit: string, value: string | number) => <string>value;
const commandedSecondaryAirStatus = (value: string | number) => {
	switch (value) {
		case 1:
			return 'Upstream';
		case 2:
			return 'Downstream of catalytic converter';
		case 3:
			return 'From the outside atmosphere or off';
		case 4:
			return 'Pump commanded on for diagnostics';
		default:
			return '';
	}
};

/* tslint:disable:no-unused-variable */
export const FUEL_SYSTEM_STATUS = new OBDField('0103', 'Fuel System Status', '', '', rowData);
export const CALCULATED_ENGINE_LOAD = new OBDField('0104', 'Calculated Engine Load', '%', 0, integer);
export const ENGINE_COOLANT_TEMPERATURE = new OBDField('0105', 'Engine Coolant Temperature', '°C', 0, integer);
export const SHORT_TERM_FUEL_TRIM_B1 = new OBDField('0106', 'Short Term Fuel Trim B1', '%', 0, integer);
export const LONG_TERM_FUEL_TRIM_B1 = new OBDField('0107', 'Long Term Fuel Trim B1', '%', 0, integer);
export const SHORT_TERM_FUEL_TRIM_B2 = new OBDField('0108', 'Short Term Fuel Trim B2', '%', 0, integer);
export const LONG_TERM_FUEL_TRIM_B2 = new OBDField('0109', 'Long Term Fuel Trim B2', '%', 0, integer);
export const RPM = new OBDField('010C', 'Engine RPM', 'rpm', 0, integer);
export const VEHICLE_SPEED = new OBDField('010D', 'Vehicle Speed', 'km/h', 0);
export const MASS_FLOW_SENSOR = new OBDField('0110', 'Mass Flow Sensor', 'grams/sec', 0);
export const FUEL_PRESSURE = new OBDField('010A', 'Fuel Pressure', 'kPa', 0);
export const INTAKE_MANIFOLD_ABSOLUTE_PRESSURE = new OBDField('010B', 'Intake Manifold Absolute Pressure', 'kPa', 0);
export const TIMING_ADVANCE = new OBDField('010E', 'Timing Advance', '° before TDC', 0, rowData);
export const INTAKE_AIR_TEMPERATURE = new OBDField('010F', 'Intake Air Temperature', '°C', 0);
export const THROTTLE_POSITION = new OBDField('0111', 'Throttle Position', '%', 0, integer);
export const COMMANDED_SECONDARY_AIR_STATUS = new OBDField('0112', 'Commanded Secondary Air Status', '', 1, commandedSecondaryAirStatus);
export const OXYGEN_SENSOR_VOLTAGE_1 = new OBDField('0114', 'Oxygen Sensor Voltage 1', 'volts', 0);
export const OXYGEN_SENSOR_VOLTAGE_2 = new OBDField('0115', 'Oxygen Sensor Voltage 2', 'volts', 0);
export const OXYGEN_SENSOR_VOLTAGE_3 = new OBDField('0116', 'Oxygen Sensor Voltage 3', 'volts', 0);
export const OXYGEN_SENSOR_VOLTAGE_4 = new OBDField('0117', 'Oxygen Sensor Voltage 4', 'volts', 0);
export const OXYGEN_SENSOR_VOLTAGE_5 = new OBDField('0118', 'Oxygen Sensor Voltage 5', 'volts', 0);
export const OXYGEN_SENSOR_VOLTAGE_6 = new OBDField('0119', 'Oxygen Sensor Voltage 6', 'volts', 0);
export const OXYGEN_SENSOR_VOLTAGE_7 = new OBDField('011A', 'Oxygen Sensor Voltage 7', 'volts', 0);
export const OXYGEN_SENSOR_VOLTAGE_8 = new OBDField('011B', 'Oxygen Sensor Voltage 8', 'volts', 0);
export const OXYGEN_SENSOR_SHORT_TERM_FUEL_TRIM_1 = new OBDField('0114', 'Oxygen Sensor Short Term Fuel Trim 1', '%', 0);
export const OXYGEN_SENSOR_SHORT_TERM_FUEL_TRIM_2 = new OBDField('0115', 'Oxygen Sensor Short Term Fuel Trim 2', '%', 0);
export const OXYGEN_SENSOR_SHORT_TERM_FUEL_TRIM_3 = new OBDField('0116', 'Oxygen Sensor Short Term Fuel Trim 3', '%', 0);
export const OXYGEN_SENSOR_SHORT_TERM_FUEL_TRIM_4 = new OBDField('0117', 'Oxygen Sensor Short Term Fuel Trim 4', '%', 0);
export const OXYGEN_SENSOR_SHORT_TERM_FUEL_TRIM_5 = new OBDField('0118', 'Oxygen Sensor Short Term Fuel Trim 5', '%', 0);
export const OXYGEN_SENSOR_SHORT_TERM_FUEL_TRIM_6 = new OBDField('0119', 'Oxygen Sensor Short Term Fuel Trim 6', '%', 0);
export const OXYGEN_SENSOR_SHORT_TERM_FUEL_TRIM_7 = new OBDField('011A', 'Oxygen Sensor Short Term Fuel Trim 7', '%', 0);
export const OXYGEN_SENSOR_SHORT_TERM_FUEL_TRIM_8 = new OBDField('011B', 'Oxygen Sensor Short Term Fuel Trim 8', '%', 0);
export const DISTANCE_TRAVELED_MIL = new OBDField('0121', 'Distance Traveled MIL', 'km', 0);
export const FUEL_TANK_LEVEL = new OBDField('012F', 'Fuel Tank Level', '%', 0, integer);
export const ETHANOL_LEVEL = new OBDField('0152', 'Ethanol Level', '%', 0, integer);
export const ENGINE_FUEL_RATE = new OBDField('015E', 'Engine Fuel Rate', 'L/h', 0);

export const VEHICLE_IDENTIFIER = new OBDField('0902', 'Vehicle Identifier', '', '', rowData);
