import {Obs3AcyclingRecordings} from '../../../../src/types/schemas/obs%3AcyclingRecordings';

export const enum OBS_WEBSOCKET_CONNECTION_STATUS {
	CONNECTED = 'connected',
	CONNECTING = 'connecting',
	DISCONNECTED = 'disconnected',
	ERROR = 'error'
}

export interface OBSWebsocketStatus {
	ip: string;
	port: number;
	password: string;
	status: OBS_WEBSOCKET_CONNECTION_STATUS;
}

const {customElement, property} = Polymer.decorators;
const cyclingRecordingsRep = nodecg.Replicant<Obs3AcyclingRecordings>('obs:cyclingRecordings');

/**
 * @customElement
 * @polymer
 * @appliesMixin Polymer.MutableData
 */
@customElement('ui-obs-status-item')
export default class UiObsStatusItem extends Polymer.MutableData(Polymer.Element) {
	@property({type: String})
	namespace: string;

	@property({type: String, reflectToAttribute: true})
	status: string;

	_websocket: OBSWebsocketStatus;
	_cyclingRecordings: boolean;

	static get observers() {
		return [
			'_updateStatus(_websocket.status, _cyclingRecordings)'
		];
	}

	ready() {
		super.ready();
		cyclingRecordingsRep.on('change', newVal => {
			this._cyclingRecordings = newVal;
		});
	}

	_transformsNamespace(namespace: string) {
		return namespace.slice(0, -3);
	}

	_updateStatus(websocketStatus: OBS_WEBSOCKET_CONNECTION_STATUS, cyclingRecordings: boolean) {
		this.status = this._calcStatus(websocketStatus, cyclingRecordings);
	}

	_calcStatus(websocketStatus: OBS_WEBSOCKET_CONNECTION_STATUS, cyclingRecordings: boolean) {
		if (websocketStatus === 'connected') {
			return cyclingRecordings ? 'cycling' : websocketStatus;
		}

		return websocketStatus;
	}
}
