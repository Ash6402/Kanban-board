export type types = 'todo' | 'work-in-progress' | 'done';

export interface Item{
    title: string,
    description: string,
    type: types,
    id?: string,
}


