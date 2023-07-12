export type CloudflareTunnel = {
    id:          string;
    name:        string;
    created_at:  Date;
    deleted_at:  Date;
    connections: Connection[];
}

export type Connection = {
    colo_name:            ColoName;
    id:                   string;
    is_pending_reconnect: boolean;
    origin_ip:            string;
    opened_at:            Date;
}

export enum ColoName {
    Ams = "AMS",
    Bru = "BRU",
    Iad = "IAD",
    Lax = "LAX",
    Ord = "ORD",
    Sjc = "SJC",
}