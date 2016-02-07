/**
 * Created by Mike on 1/17/2016.
 */

export type SignalId = string;

export interface Signal {
	signalId: SignalId;
	units: string;
	samplesPerPeriod: number;
	samples: number[];
}