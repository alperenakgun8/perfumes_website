import type { User } from "../../users/api/types";

export type Rating = 0 | 1 | 2 | 3 | 4 | 5;

export interface Comment {
    _id?: string,
    user_id: User,
    perfume_id: string,
    content: string,
    created_at: Date,
    rating: Rating
}

export interface AddComment {
    user_id: string,
    perfume_id: string,
    content: string,
    rating: number
}