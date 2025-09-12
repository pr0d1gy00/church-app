export interface EventData {
	title: string;
	eventDate: Date;
	description: string | null;
	location: string | null;
	createdBy: number;
	notifyAll: boolean;
}
export interface Event {
    id:          number;
    title:       string;
    eventDate:   string;
    description: string | null;
    location:    string | null;
    createdBy:   number;
    notifyAll:   boolean;
    createdAt:   string;
    updatedAt:   string;
    deletedAt:   string | null;
}

export interface EventsApiResponse {
    events:  Event[];
    message: string;
}


export interface EventCreator {
    id:    number;
    name:  string;
    email: string;
    role:  string;
}

export interface EventByIdApiResponse {
	event:EventByIdDataApiResponse;
    message:       string;
}
export interface EventByIdDataApiResponse {
	 id:            number;
    title:         string;
    eventDate:     string;
    description:   string | null;
    location:      string | null;
    createdBy:     number;
    notifyAll:     boolean;
    createdAt:     string;
    updatedAt:     string;
    deletedAt:     string | null;
    creator:       EventCreator;
    subscriptions: EventSubscription[]
}
export interface EventSubscription {
	id:        number;
	eventId:   number;
	userId:    number;
	user:{
		id:    number;
		name:  string;
		email: string;
		role:  string;
	}
}