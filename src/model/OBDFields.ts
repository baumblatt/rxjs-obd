import {OBDField} from './OBDField';

const integer = (unit: string, value: string | number) => `${Math.round(<number>value)} ${unit}`;

export const FUEL_SYSTEM_STATUS = new OBDField('0103', 'Fuel System Status', '', '');
export const RPM = new OBDField('010C', 'Engine RPM', 'rpm', 0, integer);
export const VEHICLE_SPEED = new OBDField('010D', 'Vehicle Speed', 'km/h', 0);
export const FUEL_TANK_LEVEL = new OBDField('012F', 'Fuel Tank Level', '%', 0, integer);
export const ETHANOL_LEVEL = new OBDField('0152', 'Ethanol Level', '%', 0, integer);

export const VEHICLE_IDENTIFIER = new OBDField('0902', 'Vehicle Identifier', '', '');
