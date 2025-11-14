// detail types
export type Address = {
    city: string;
    detail: string;
    zipCode?: number;
}
export type Menu = {
    name: string;
    detail: string;
}

export type Mine = {
    name:string;
    category:string;
    address: Address;
    menu:Menu[];
}

export type AddressWithoutZip = Omit<Address, 'zipCode'>
// Omit is a part of type utility that removes specified keys from a type 

export type MineOnlyName = Pick<Mine, 'name'>
// Pick is a part of type utility that picks specified keys from a type

export type ApiResponse<T> = {
    data: T[],
    totalPages: number,
    page: number,
}

export type MineResponse = ApiResponse<Mine>
// generic type example

