import {OBDData} from '../model';

export const isSupportedPID = (data: OBDData, pid: string) => {
	const integer = parseInt(pid, 16);

	// the PIDs that has the bitwise flags of supported PIDs
	if (integer % 0x20 == 0) {
		return true;
	}

	const segment = Math.floor(integer / 0x20) * 0x20;

	const bitmap = data.supportedPIDs[`segment${segment == 0 ? '00' : segment.toString(16)}`];
	const bit = Math.pow(2, 0x20 - (integer % 0x20));
	
	return (bitmap & bit) !== 0;
};
