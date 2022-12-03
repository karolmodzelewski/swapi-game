import { SelectedResource } from '../features/game/types/selected-resource.type';

export interface SwapiResourceResponse {
    message: string;
    result: Result;
}

interface Result {
    description: string;
    properties: SelectedResource;
    uid: string;
}
