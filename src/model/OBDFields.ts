import {OBDField} from './OBDField';

const integer = (unit: string, value: string | number) => `${Math.round(<number>value)} ${unit}`;

export const ETHANOL_LEVEL = new OBDField('52', 'Ethanol Level', '%', 0, integer);
export const FUEL_TANK_LEVEL = new OBDField('2F', 'Fuel Tank Level', '%', 0, integer);
export const RPM = new OBDField('0C', 'Engine RPM', 'rpm', 0);
export const VEHICLE_SPEED = new OBDField('0D', 'Vehicle Speed', 'km/h', 0);
