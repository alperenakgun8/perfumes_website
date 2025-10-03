import type { User } from "../../users/api/types";

export interface Topic {
    _id?: string,
    title: string,
    content: string,
    user_id: User,
    created_at: Date
}

export interface AddTopic {
    title: string,
    content: string,
    user_id: string
}
