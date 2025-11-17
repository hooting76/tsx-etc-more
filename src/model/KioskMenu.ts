export type MenuCategory = '전체' | '커피' | '차' | '스무디' | '디저트';

export type KioskMenu = {
    id: number;
    name: string;
    price: number;
    category: MenuCategory;
    image: string;
}[];