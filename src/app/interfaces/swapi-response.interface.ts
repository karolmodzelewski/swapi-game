export interface SwapiResponse {
    message: string;
    total_records: number;
    total_pages: number;
    previous: string;
    next: string;
    results: Result[];
}

interface Result {
    uid: string;
    name: string;
    url: string;
}
