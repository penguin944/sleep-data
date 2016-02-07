/**
 * Created by Mike on 1/17/2016.
 */

export enum DataGroup {
	STR, // Summary Database
	BRP, // High Resolution Graph Data
	EVE, // Event Annotations
	CSL,
	PLD, // Low Resolution Graph Data
	SAD  // Pulse Oximetry Data
}

export type SignalType = string;

export class PLDSignalType {
	public static SNORE_INDEX = 'Snore Index';
	public static THERAPY_PRESSURE = 'Therapy Pres';
	public static INSPIRATORY_PRESSURE = 'Insp Pres';
	public static MINUTE_VENTILATION = 'MV';
	public static RESPIRATORY_RATE = 'RR';
	public static TIDAL_VOLUME = 'Vt';
	public static LEAK_RATE = 'Leak';
	public static FLOW_LIMITATION_INDEX = 'FFL Index';
	public static MASK_PRESSURE = 'Mask Pres';
	public static EXPIRATORY_PRESSURE = 'Exp Pres';
	public static IN_EXPIRATORY_RATIO = 'I:E';
}

export class BRPSignalType {
	public static FLOW = 'Flow';
	public static MASK_PRESSURE = 'Mask Pres';
	public static RESPIRATORY_EVENT = 'Resp Event';
}
