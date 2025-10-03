import type { User } from "../../users/api/types";

export interface TopicsComment {
    _id?: string,
    user_id: User,
    topic_id: string,
    content: string,
    created_at: Date
}

export interface AddTopicsComment {
    user_id: string,
    topic_id: string,
    content: string
}