/**
 * OBD Field representation.
 */
export class OBDField {

	/**
	 * The value followed by the unit as string.
	 */
	public formatted: string;

	/**
	 * The OBD Field constructor.
	 * @param code The code.
	 * @param label The label.
	 * @param unit The unit.
	 * @param value The initial value.
	 * @param formatter projector to format the value.
	 */
	constructor(public code: string, public label: string, public unit: string, public value: string | number,
				public formatter?: (unit: string, value: string | number) => string) {
		this.formatted = formatter ? formatter(unit, value) : `${value} ${unit}`;
	}
}
