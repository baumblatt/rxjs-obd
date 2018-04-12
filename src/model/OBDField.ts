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
	 * @param label The label.
	 * @param unit The unit.
	 * @param value The initial value.
	 */
	constructor(public label: string, public unit: string, public value: string | number) {
		this.formatted = `${value} ${unit}`;
	}
}