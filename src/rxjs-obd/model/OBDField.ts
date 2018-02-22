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
	 * @param {string} label The label.
	 * @param {string} unit The unit.
	 * @param {string | number} value The initial value.
	 */
	constructor(public label: string, public unit: string, public value: string | number) {
		this.formatted = `${value} ${unit}`;
	}
}