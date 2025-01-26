export interface Converter {
	getScreenPosition(dataPosition: Vector): Vector;
	getDataPosition(screenPosition: Vector): Vector;
}
