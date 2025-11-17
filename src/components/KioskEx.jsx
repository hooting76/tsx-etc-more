import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, CreditCard, Clock, CheckCircle, Package } from 'lucide-react';

const CafeKiosk = () => {
  const [cart, setCart] = useState([]);
  const [screen, setScreen] = useState('menu'); // menu, payment, complete
  const [orders, setOrders] = useState([]);
  const [viewMode, setViewMode] = useState('kiosk'); // kiosk, kitchen, display

  const menuItems = [
    { id: 1, name: '아메리카노', price: 4500, category: '커피', image: '☕' },
    { id: 2, name: '카페라떼', price: 5000, category: '커피', image: '☕' },
    { id: 3, name: '카푸치노', price: 5000, category: '커피', image: '☕' },
    { id: 4, name: '바닐라라떼', price: 5500, category: '커피', image: '☕' },
    { id: 5, name: '녹차라떼', price: 5500, category: '차', image: '🍵' },
    { id: 6, name: '딸기스무디', price: 6000, category: '스무디', image: '🍓' },
    { id: 7, name: '망고스무디', price: 6000, category: '스무디', image: '🥭' },
    { id: 8, name: '초코케이크', price: 6500, category: '디저트', image: '🍰' },
    { id: 9, name: '치즈케이크', price: 6500, category: '디저트', image: '🍰' },
  ];

  const categories = ['전체', '커피', '차', '스무디', '디저트'];
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const filteredMenu = selectedCategory === '전체' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, delta) => {
    setCart(cart.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(0, item.quantity + delta) }
        : item
    ).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handlePayment = () => {
    setScreen('payment');
  };

  const completeOrder = () => {
    const orderNumber = Math.floor(Math.random() * 1000);
    const newOrder = {
      id: orderNumber,
      items: [...cart],
      total: getTotalPrice(),
      status: 'pending', // pending, preparing, complete
      time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
    };
    
    setOrders([...orders, newOrder]);
    setScreen('complete');
    
    setTimeout(() => {
      setCart([]);
      setScreen('menu');
      setSelectedCategory('전체');
    }, 3000);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const deleteOrder = (orderId) => {
    setOrders(orders.filter(order => order.id !== orderId));
  };

  // 키오스크 화면
  if (viewMode === 'kiosk') {
    if (screen === 'complete') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-8">
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-md">
            <div className="text-6xl mb-6">✅</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">주문이 완료되었습니다!</h2>
            <p className="text-gray-600 text-lg mb-2">주문번호: {orders[orders.length - 1]?.id}</p>
            <p className="text-gray-500">잠시 후 처음 화면으로 돌아갑니다...</p>
            <button
              onClick={() => setViewMode('display')}
              className="mt-6 text-sm text-blue-600 hover:underline"
            >
              주문 현황 보기
            </button>
          </div>
        </div>
      );
    }

    if (screen === 'payment') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">결제하기</h2>
                <button
                  onClick={() => setViewMode('kitchen')}
                  className="text-sm text-blue-600 hover:underline"
                >
                  주방 화면 보기
                </button>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">주문 내역</h3>
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center py-3 border-b">
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <span className="text-gray-500 ml-2">x {item.quantity}</span>
                    </div>
                    <span className="font-semibold">{(item.price * item.quantity).toLocaleString()}원</span>
                  </div>
                ))}
                <div className="flex justify-between items-center py-4 text-xl font-bold">
                  <span>총 금액</span>
                  <span className="text-amber-600">{getTotalPrice().toLocaleString()}원</span>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={completeOrder}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <CreditCard size={24} />
                  카드 결제
                </button>
                <button
                  onClick={completeOrder}
                  className="w-full bg-gray-700 hover:bg-gray-800 text-white font-bold py-4 rounded-xl transition-colors"
                >
                  현금 결제
                </button>
                <button
                  onClick={() => setScreen('menu')}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-4 rounded-xl transition-colors"
                >
                  이전으로
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="container mx-auto p-6">
          <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-bold text-amber-600">☕ Cafe Kiosk</h1>
                <p className="text-gray-600 mt-2">메뉴를 선택해주세요</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('kitchen')}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
                >
                  주방 화면
                </button>
                <button
                  onClick={() => setViewMode('display')}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm"
                >
                  대기 화면
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
                      selectedCategory === category
                        ? 'bg-amber-500 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-amber-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {filteredMenu.map(item => (
                  <div
                    key={item.id}
                    onClick={() => addToCart(item)}
                    className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-xl hover:scale-105 transition-all"
                  >
                    <div className="text-6xl text-center mb-4">{item.image}</div>
                    <h3 className="font-bold text-lg text-center mb-2">{item.name}</h3>
                    <p className="text-amber-600 font-bold text-center text-xl">{item.price.toLocaleString()}원</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
                <div className="flex items-center gap-2 mb-6">
                  <ShoppingCart className="text-amber-500" size={28} />
                  <h2 className="text-2xl font-bold">장바구니</h2>
                </div>

                {cart.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">장바구니가 비어있습니다</p>
                ) : (
                  <>
                    <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                      {cart.map(item => (
                        <div key={item.id} className="border-b pb-4">
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-semibold">{item.name}</span>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="bg-gray-200 hover:bg-gray-300 rounded-lg p-1"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="w-8 text-center font-semibold">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="bg-amber-500 hover:bg-amber-600 text-white rounded-lg p-1"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                            <span className="font-bold">{(item.price * item.quantity).toLocaleString()}원</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4 mb-6">
                      <div className="flex justify-between items-center text-xl font-bold">
                        <span>총 금액</span>
                        <span className="text-amber-600">{getTotalPrice().toLocaleString()}원</span>
                      </div>
                    </div>

                    <button
                      onClick={handlePayment}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-xl transition-colors"
                    >
                      결제하기
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 주방 화면
  if (viewMode === 'kitchen') {
    const pendingOrders = orders.filter(o => o.status === 'pending');
    const preparingOrders = orders.filter(o => o.status === 'preparing');
    const completeOrders = orders.filter(o => o.status === 'complete');

    return (
      <div className="min-h-screen bg-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-800 rounded-2xl p-6 mb-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">🍳 주방 디스플레이</h1>
            <button
              onClick={() => setViewMode('kiosk')}
              className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
            >
              키오스크로 돌아가기
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 대기 중 */}
            <div>
              <div className="bg-red-600 text-white px-4 py-3 rounded-t-xl font-bold flex items-center gap-2">
                <Clock size={20} />
                대기 중 ({pendingOrders.length})
              </div>
              <div className="space-y-4 bg-gray-800 p-4 rounded-b-xl min-h-96">
                {pendingOrders.map(order => (
                  <div key={order.id} className="bg-gray-700 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-2xl font-bold text-white">#{order.id}</span>
                      <span className="text-gray-400 text-sm">{order.time}</span>
                    </div>
                    <div className="space-y-2 mb-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="text-white">
                          <span className="font-semibold">{item.name}</span>
                          <span className="text-gray-400 ml-2">x {item.quantity}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => updateOrderStatus(order.id, 'preparing')}
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 rounded-lg"
                    >
                      조리 시작
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 조리 중 */}
            <div>
              <div className="bg-yellow-600 text-white px-4 py-3 rounded-t-xl font-bold flex items-center gap-2">
                <Package size={20} />
                조리 중 ({preparingOrders.length})
              </div>
              <div className="space-y-4 bg-gray-800 p-4 rounded-b-xl min-h-96">
                {preparingOrders.map(order => (
                  <div key={order.id} className="bg-gray-700 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-2xl font-bold text-white">#{order.id}</span>
                      <span className="text-gray-400 text-sm">{order.time}</span>
                    </div>
                    <div className="space-y-2 mb-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="text-white">
                          <span className="font-semibold">{item.name}</span>
                          <span className="text-gray-400 ml-2">x {item.quantity}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => updateOrderStatus(order.id, 'complete')}
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg"
                    >
                      완료
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 완료 */}
            <div>
              <div className="bg-green-600 text-white px-4 py-3 rounded-t-xl font-bold flex items-center gap-2">
                <CheckCircle size={20} />
                완료 ({completeOrders.length})
              </div>
              <div className="space-y-4 bg-gray-800 p-4 rounded-b-xl min-h-96">
                {completeOrders.map(order => (
                  <div key={order.id} className="bg-gray-700 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-2xl font-bold text-white">#{order.id}</span>
                      <span className="text-gray-400 text-sm">{order.time}</span>
                    </div>
                    <div className="space-y-2 mb-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="text-white">
                          <span className="font-semibold">{item.name}</span>
                          <span className="text-gray-400 ml-2">x {item.quantity}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => deleteOrder(order.id)}
                      className="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 rounded-lg"
                    >
                      픽업 완료
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 고객용 대기 화면
  if (viewMode === 'display') {
    const preparingOrders = orders.filter(o => o.status === 'preparing');
    const completeOrders = orders.filter(o => o.status === 'complete');

    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-100 to-orange-200 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-bold text-amber-600">📢 주문 현황</h1>
              <button
                onClick={() => setViewMode('kiosk')}
                className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
              >
                주문하기
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 준비 중 */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-yellow-600 mb-6 flex items-center gap-2">
                <Clock size={28} />
                준비 중
              </h2>
              <div className="space-y-4">
                {preparingOrders.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">준비 중인 주문이 없습니다</p>
                ) : (
                  preparingOrders.map(order => (
                    <div key={order.id} className="bg-yellow-50 border-2 border-yellow-400 rounded-2xl p-6">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-yellow-600 mb-2">#{order.id}</div>
                        <div className="text-gray-600">{order.time}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* 완료 */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-green-600 mb-6 flex items-center gap-2">
                <CheckCircle size={28} />
                픽업 대기
              </h2>
              <div className="space-y-4">
                {completeOrders.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">픽업 대기 중인 주문이 없습니다</p>
                ) : (
                  completeOrders.map(order => (
                    <div key={order.id} className="bg-green-50 border-2 border-green-400 rounded-2xl p-6 animate-pulse">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-green-600 mb-2">#{order.id}</div>
                        <div className="text-gray-600">{order.time}</div>
                        <div className="text-green-600 font-semibold mt-2">🔔 완료되었습니다!</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default CafeKiosk;