export interface ICallEvent {
    [key: string]: any;
}

export interface IUpdateCallEvent {
    id: string;
    state: number;
    type: number;
}

export interface IStatistics {
    finalCount: string;
    finalPass: string;
    techCount: string;
    techPass: string;
    introCount: string;
    introPass: string;
    userId: string;
    username: string;
}

export interface IStatisticsDetail {
    name: string;
    total: number;
    pass: number;
}
