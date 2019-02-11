import {OBDField} from './OBDField';

const integer = (unit: string, value: string | number) => `${Math.round(<number>value)} ${unit}`;

export const RPM = new OBDField('Engine RPM', 'rpm', 0);
export const VEHICLESPEED = new OBDField('Vehicle Speed', 'km/h', 0);
export const FUELTANKLEVEL = new OBDField('Fuel Tank Level', '%', 0, integer);
