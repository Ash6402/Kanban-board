export type types = 'todo' | 'done' | 'work-in-progress' ;

export interface Item{
    title: string,
    description: string,
    type: types,
    id?: string,
}


