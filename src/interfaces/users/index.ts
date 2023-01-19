export interface IUserRequest {
    name: string;
    email: string;
    password: string;
    isAdm: boolean;
}

export interface IUserAddress {
    street: string;
    state: string;
    zipCode?: string;
    user: IUserRequest;
}

export interface IAddressUpdate {
    street?: string;
    state?: string;
    zipCode?: string;
}

export interface IUserUpdate {
    name?: string;
    email?: string;
    password?: string;
    isAdm?: boolean;
}

export interface IUserLogin {
    email: string;
    password: string;
}

export interface ITechRequest {
    name: string;
}

export interface IProjectData {
    name: string;
    description?: string;
    technologies: ITechData[];
}

export interface ITechData {
    id?: number;
}
