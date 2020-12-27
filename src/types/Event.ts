export interface IEvent {
	embedOptions: {
		title: string;
		color?: string;
		description: string;
		thumbnail?: string;
		image?: string;
		sender?: string;
		senderAvatar?: string;
		footer?: string;
	};
	eventLinks?: {
		reaction: string;
		description?: string;
		event: IEvent;
	};
	result?: {
		experience?: number;
	};
}
