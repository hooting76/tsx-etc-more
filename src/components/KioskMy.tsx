import React, { useState } from "react";

// 타입 import
import type { KioskMenu, MenuCategory } from '../model/KioskMenu'


// 메뉴 리스트 세팅
const KioskMyProps:KioskMenu = [
    { id: 1, name: '아메리카노', price: 4500, category: '커피', image: '☕' },
    { id: 2, name: '카페라떼', price: 5000, category: '커피', image: '☕' },
    { id: 3, name: '카푸치노', price: 5000, category: '커피', image: '☕' },
    { id: 4, name: '바닐라라떼', price: 5500, category: '커피', image: '☕' },
    { id: 5, name: '녹차라떼', price: 5500, category: '차', image: '🍵' },
    { id: 6, name: '딸기스무디', price: 6000, category: '스무디', image: '🍓' },
    { id: 7, name: '망고스무디', price: 6000, category: '스무디', image: '🥭' },
    { id: 8, name: '초코케이크', price: 6500, category: '디저트', image: '🍰' },
    { id: 9, name: '치즈케이크', price: 6500, category: '디저트', image: '🍰' },
]


const KioskMy:React.FC = () => {
    // 메뉴 정보 + type import
    const [menuData, setMenuData] = useState<KioskMenu>(KioskMyProps);
    const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('전체');

    const [cart, setCart] = useState<KioskMenu>([]);
    const [screen, setScreen] = useState<string>('menu');
    const [order, setOrder] = useState<KioskMenu>([]);

    const filteredMenu = 
        (selectedCategory === '전체' 
            ? menuData 
            : menuData.filter(item => item.category === selectedCategory));

    return (
        <></>
    );
}
export default KioskMy;