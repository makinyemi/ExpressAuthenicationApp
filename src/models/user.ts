export interface User {
    username: string
    email: string
    password?: string
}

export let users: User[] = []
