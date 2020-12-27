export interface IEvent {
	eventName?: string;
	embedOptions: {
		title: string;
		color?: string;
		description: string;
		thumbnail?: string;
		image?: string;
		author?: string;
		authorAvatar?: string;
	};
	eventLinks?: [
		{
			reaction: string;
			title: string;
			description: string;
			event: IEvent[];
		}
	];
	result?: {
		experience?: number;
	};
}
