import {OBDField} from './OBDField';

const integer = (unit: string, value: string | number) => `${Math.round(<number>value)} ${unit}`;
const rowData = (unit: string, value: string | number) => <string>value;

/* tslint:disable:no-unused-variable */
export const FUEL_SYSTEM_STATUS = new OBDField('0103', 'Fuel System Status', '', '', rowData);
export const CALCULATED_ENGINE_LOAD = new OBDField('0104', 'Calculated Engine Load', '%', 0, integer);
export const ENGINE_COOLANT_TEMPERATURE = new OBDField('0105', 'Engine Coolant Temperature', '°C', 0, integer);
export const SHORT_TERM_FUEL_TRIM_B1 = new OBDField('0106', 'Short Term Fuel Trim B1', '%', 0, integer);
export const LONG_TERM_FUEL_TRIM_B1 = new OBDField('0107', 'Long Term Fuel Trim B1', '%', 0, integer);
export const SHORT_TERM_FUEL_TRIM_B2 = new OBDField('0108', 'Short Term Fuel Trim B2', '%', 0, integer);
export const LONG_TERM_FUEL_TRIM_B2 = new OBDField('0109', 'Long Term Fuel Trim B2', '%', 0, integer);
export const FUEL_PRESSURE = new OBDField('010A', 'Fuel Pressure', 'kPa', 0);
export const INTAKE_MANIFOLD_ABSOLUTE_PRESSURE = new OBDField('010B', 'Intake Manifold Absolute Pressure', 'kPa', 0);
export const TIMING_ADVANCE = new OBDField('010E', 'Timing Advance', '° before TDC', 0, rowData);
export const INTAKE_AIR_TEMPERATURE = new OBDField('010F', 'Intake Air Temperature', '°C', 0);
export const MASS_FLOW_SENSOR = new OBDField('0110', 'Mass Flow Sensor', 'grams/sec', 0);
export const RPM = new OBDField('010C', 'Engine RPM', 'rpm', 0, integer);
export const VEHICLE_SPEED = new OBDField('010D', 'Vehicle Speed', 'km/h', 0);
export const THROTTLE_POSITION = new OBDField('0111', 'Throttle Position', '%', 0, integer);
export const FUEL_TANK_LEVEL = new OBDField('012F', 'Fuel Tank Level', '%', 0, integer);
export const ETHANOL_LEVEL = new OBDField('0152', 'Ethanol Level', '%', 0, integer);
export const ENGINE_FUEL_RATE = new OBDField('015E', 'Engine Fuel Rate', 'L/h', 0);

export const VEHICLE_IDENTIFIER = new OBDField('0902', 'Vehicle Identifier', '', '', rowData);
