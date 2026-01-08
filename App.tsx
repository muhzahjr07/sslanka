
import React, { useState, useEffect, useMemo } from 'react';
import { GoogleGenAI } from "@google/genai";
import Header from './components/Header';
import Footer from './components/Footer';
import { SERVICES, PRODUCTS, EXECUTIVES, HISTORY } from './constants';
import { Product, Service, CartItem } from './types';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    name: '',
    address: '',
    phone: '',
    paymentMethod: 'Cash on Delivery'
  });
  
  // AI State
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiGrounding, setAiGrounding] = useState<any[]>([]);

  // Derived state
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesCategory = filterCategory === 'All' || p.category === filterCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [filterCategory, searchTerm]);

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.retailPrice * item.quantity), 0);
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    // Visual feedback
    setActiveSection('cart');
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleAiAsk = async () => {
    if (!aiPrompt.trim()) return;
    setIsAiLoading(true);
    setAiResponse('');
    setAiGrounding([]);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `I am looking for IT hardware or services in Sri Lanka. User asked: ${aiPrompt}. 
                  Context: Smart Solutions Lanka offers Laptops, Networking (UDR, MikroTik), maintenance, etc. 
                  Provide a brief, expert recommendation. If you suggest a model, tell the user why it is good for the Sri Lankan climate or business environment.`,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });
      
      setAiResponse(response.text || "I'm sorry, I couldn't process that request.");
      setAiGrounding(response.candidates?.[0]?.groundingMetadata?.groundingChunks || []);
    } catch (err) {
      setAiResponse("I'm having trouble searching the web right now. Please try again or contact our sales team.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const submitOrder = () => {
    const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();
    const orderItems = cart.map(i => `${i.name} x${i.quantity} (${formatCurrency(i.retailPrice * i.quantity)})`).join('\n');
    
    let message = `*NEW ORDER - Smart Solutions Lanka*\n`;
    message += `Order ID: #${orderId}\n`;
    message += `Customer: ${checkoutData.name}\n`;
    message += `Phone: ${checkoutData.phone}\n`;
    message += `Address: ${checkoutData.address}\n`;
    message += `Items:\n${orderItems}\n\n`;
    message += `Total: ${formatCurrency(cartTotal)}\n`;
    message += `Payment: ${checkoutData.paymentMethod}\n`;
    message += `Delivery: 2-3 Days\n`;
    
    if (checkoutData.paymentMethod === 'WhatsApp Payment Slip') {
      message += `\n_Please attach your payment slip to this message._`;
    }

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/94779980801?text=${encodedMessage}`, '_blank');
    
    setCart([]);
    setIsCheckingOut(false);
    setActiveSection('home');
    alert("Order submitted! Redirecting to WhatsApp for confirmation.");
  };

  const categories = ['All', 'Laptops', 'Desktops', 'Accessories', 'Networking', 'Software'];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} cartCount={cart.length} />

      <main className="flex-grow pt-20">
        {/* Home Section */}
        {activeSection === 'home' && (
          <div>
            <section className="relative h-[85vh] flex items-center overflow-hidden">
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1920" 
                  className="w-full h-full object-cover brightness-50" 
                  alt="Hero Background"
                />
              </div>
              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
                <div className="max-w-2xl">
                  <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                    Your Digital <span className="text-blue-500">Advantage</span>
                  </h1>
                  <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed">
                    Sri Lanka's premium tech hub. Delivering genuine products and expert support to your doorstep in 2-3 working days.
                  </p>
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <button 
                      onClick={() => setActiveSection('store')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl"
                    >
                      Shop Hardware
                    </button>
                    <button 
                      onClick={() => setActiveSection('services')}
                      className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-bold transition-all"
                    >
                      Browse Services
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* AI Assistant Promo */}
            <section className="py-24 bg-white">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-[2.5rem] p-10 md:p-16 text-white shadow-2xl relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                        <i className="fa-solid fa-wand-magic-sparkles"></i>
                      </div>
                      <span className="font-bold tracking-widest uppercase text-xs">AI Tech Advisor</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Need help picking the right gear?</h2>
                    <p className="text-blue-100 mb-8 text-lg">Our Gemini-powered assistant scans the web for current benchmarks and local availability to help you decide.</p>
                    
                    <div className="flex bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20">
                      <input 
                        type="text" 
                        value={aiPrompt}
                        onChange={(e) => setAiPrompt(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAiAsk()}
                        placeholder="e.g. Best laptop for Revit under 500k in SL?"
                        className="bg-transparent border-none flex-grow px-4 text-white placeholder-blue-200 focus:ring-0"
                      />
                      <button 
                        onClick={handleAiAsk}
                        disabled={isAiLoading}
                        className="bg-white text-blue-700 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors flex items-center"
                      >
                        {isAiLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Ask Advisor'}
                      </button>
                    </div>

                    {aiResponse && (
                      <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/10">
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{aiResponse}</p>
                        {aiGrounding.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-white/10">
                            <p className="text-[10px] text-blue-200 font-bold uppercase mb-2">Sources:</p>
                            <div className="flex flex-wrap gap-2">
                              {aiGrounding.map((chunk, idx) => chunk.web && (
                                <a key={idx} href={chunk.web.uri} target="_blank" className="text-[10px] bg-white/10 hover:bg-white/20 px-2 py-1 rounded truncate max-w-[150px]">
                                  {chunk.web.title}
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Store Section */}
        {activeSection === 'store' && (
          <section className="py-20 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                  <div>
                    <h1 className="text-4xl font-bold mb-2">Professional Hardware</h1>
                    <p className="text-gray-500">Genuine items. Expertly configured. Delivered in 2-3 days.</p>
                  </div>
                  <div className="relative max-w-md w-full">
                    <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    <input 
                      type="text" 
                      placeholder="Search laptops, networking, monitors..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-2xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-blue-600 focus:border-transparent shadow-sm"
                    />
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setFilterCategory(cat)}
                      className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                        filterCategory === cat 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                        : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-400'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredProducts.map(product => (
                  <div key={product.id} className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-blue-200 shadow-sm hover:shadow-xl transition-all group flex flex-col">
                    <div className="relative h-52">
                      <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-blue-600 shadow-sm">
                          {product.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <h3 className="font-bold text-gray-900 mb-2 text-lg line-clamp-1" title={product.name}>{product.name}</h3>
                      <p className="text-xs text-gray-500 mb-6 h-10 line-clamp-2">{product.description}</p>
                      
                      <div className="mb-6 space-y-1.5 flex-grow">
                        {product.specs.slice(0, 3).map((spec, idx) => (
                          <div key={idx} className="flex items-center text-[10px] text-gray-400">
                            <div className="w-1 h-1 bg-blue-500 rounded-full mr-2"></div>
                            {spec}
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                        <span className="text-xl font-bold text-gray-900">
                          {formatCurrency(product.retailPrice)}
                        </span>
                        <button 
                          onClick={() => addToCart(product)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-all text-xs font-bold"
                        >
                          <i className="fa-solid fa-plus mr-2"></i>Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-gray-200">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                    <i className="fa-solid fa-box-open text-4xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-400">No matching products found</h3>
                  <p className="text-gray-400 mt-2">Try a different search term or category.</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Cart & Checkout View */}
        {activeSection === 'cart' && (
          <section className="py-20 min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-4xl font-bold mb-10 flex items-center">
                <i className="fa-solid fa-cart-shopping text-blue-600 mr-4"></i>
                Your Shopping Cart
              </h1>

              {cart.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-[3rem] shadow-sm">
                  <i className="fa-solid fa-basket-shopping text-6xl text-gray-100 mb-6"></i>
                  <h3 className="text-2xl font-bold text-gray-900">Your cart is empty</h3>
                  <p className="text-gray-500 mt-2 mb-8">Looks like you haven't added anything yet.</p>
                  <button 
                    onClick={() => setActiveSection('store')}
                    className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
                  >
                    Go to Store
                  </button>
                </div>
              ) : !isCheckingOut ? (
                <div className="space-y-6">
                  <div className="bg-white rounded-[2rem] shadow-sm overflow-hidden border border-gray-100">
                    {cart.map(item => (
                      <div key={item.id} className="p-6 border-b border-gray-50 flex items-center justify-between last:border-0">
                        <div className="flex items-center space-x-6">
                          <img src={item.imageUrl} className="w-20 h-20 object-cover rounded-2xl" alt="" />
                          <div>
                            <h4 className="font-bold text-lg">{item.name}</h4>
                            <p className="text-blue-600 font-bold">{formatCurrency(item.retailPrice)}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6">
                          <div className="flex items-center bg-gray-50 rounded-xl p-1">
                            <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-colors">
                              <i className="fa-solid fa-minus text-xs"></i>
                            </button>
                            <span className="w-10 text-center font-bold">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-colors">
                              <i className="fa-solid fa-plus text-xs"></i>
                            </button>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-gray-500 font-medium">Subtotal</span>
                      <span className="text-2xl font-bold text-gray-900">{formatCurrency(cartTotal)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-8 pb-8 border-b border-gray-50">
                      <span className="text-gray-500 font-medium">Delivery Fee</span>
                      <span className="text-green-600 font-bold uppercase text-sm tracking-widest">FREE (Limited Time)</span>
                    </div>
                    <button 
                      onClick={() => setIsCheckingOut(true)}
                      className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center"
                    >
                      Proceed to Checkout <i className="fa-solid fa-arrow-right ml-3"></i>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100">
                    <h3 className="text-2xl font-bold mb-8">Delivery Details</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                        <input 
                          type="text" 
                          placeholder="Your name"
                          className="w-full bg-gray-50 border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-blue-600"
                          value={checkoutData.name}
                          onChange={(e) => setCheckoutData({...checkoutData, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Address</label>
                        <textarea 
                          rows={3}
                          placeholder="House No, Street, City"
                          className="w-full bg-gray-50 border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-blue-600"
                          value={checkoutData.address}
                          onChange={(e) => setCheckoutData({...checkoutData, address: e.target.value})}
                        ></textarea>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                        <input 
                          type="tel" 
                          placeholder="+94 7X XXX XXXX"
                          className="w-full bg-gray-50 border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-blue-600"
                          value={checkoutData.phone}
                          onChange={(e) => setCheckoutData({...checkoutData, phone: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100">
                      <h3 className="text-2xl font-bold mb-8">Payment Method</h3>
                      <div className="space-y-4">
                        {['Cash on Delivery', 'Bank Transfer', 'WhatsApp Payment Slip'].map(method => (
                          <button
                            key={method}
                            onClick={() => setCheckoutData({...checkoutData, paymentMethod: method})}
                            className={`w-full p-5 rounded-2xl text-left border-2 transition-all flex items-center justify-between ${
                              checkoutData.paymentMethod === method 
                              ? 'border-blue-600 bg-blue-50' 
                              : 'border-gray-100 hover:border-gray-200'
                            }`}
                          >
                            <span className={`font-bold ${checkoutData.paymentMethod === method ? 'text-blue-700' : 'text-gray-600'}`}>
                              {method}
                            </span>
                            {checkoutData.paymentMethod === method && <i className="fa-solid fa-circle-check text-blue-600"></i>}
                          </button>
                        ))}
                      </div>

                      {checkoutData.paymentMethod === 'Bank Transfer' && (
                        <div className="mt-6 p-4 bg-gray-50 rounded-xl text-xs space-y-1 text-gray-600 border border-gray-100">
                          <p className="font-bold">HNB Bank - Bambalapitiya</p>
                          <p>Account: 1234 5678 9012</p>
                          <p>Name: Smart Solutions Lanka Pvt Ltd</p>
                        </div>
                      )}

                      <div className="mt-10 pt-8 border-t border-gray-100">
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-500">Order Summary</span>
                          <span className="font-bold">{formatCurrency(cartTotal)}</span>
                        </div>
                        <div className="flex justify-between mb-8">
                          <span className="text-gray-500">Estimated Delivery</span>
                          <span className="text-blue-600 font-bold">2-3 Days</span>
                        </div>
                        <button 
                          onClick={submitOrder}
                          disabled={!checkoutData.name || !checkoutData.address || !checkoutData.phone}
                          className="w-full bg-green-600 text-white py-5 rounded-2xl font-bold shadow-xl hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Confirm & Submit Order
                        </button>
                        <button 
                          onClick={() => setIsCheckingOut(false)}
                          className="w-full mt-4 text-gray-400 font-bold py-2 hover:text-gray-600 transition-colors"
                        >
                          Back to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Other sections (Services, About, Contact) from original but truncated for brevity in this block */}
        {activeSection === 'services' && (
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mb-20">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Expert IT <span className="text-blue-600">Services</span></h1>
                <p className="text-lg text-gray-600">Beyond selling hardware, we ensure your infrastructure runs flawlessly 24/7.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {SERVICES.map(service => (
                  <div key={service.id} className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-2xl transition-all group flex flex-col h-full">
                    <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <i className={`fa-solid ${service.icon} text-2xl`}></i>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                    <p className="text-gray-600 mb-8 flex-grow">{service.description}</p>
                    <div className="border-t border-gray-100 pt-6">
                      <span className="text-sm font-semibold text-blue-600">Certified Support</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeSection === 'about' && (
          <section className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                <div>
                  <h2 className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4">Our Journey</h2>
                  <h1 className="text-5xl font-bold text-gray-900 mb-8 leading-tight">Leading the Tech <br/>Revolution in SL.</h1>
                  <p className="text-lg text-gray-600 mb-8">Established in 2019, Smart Solutions Lanka has grown from a local service provider to a nationwide distributor of enterprise-grade IT solutions.</p>
                  
                  <div className="space-y-6">
                    {HISTORY.map((h, i) => (
                      <div key={i} className="flex space-x-4">
                        <div className="font-bold text-blue-600">{h.year}</div>
                        <div>
                          <h4 className="font-bold">{h.title}</h4>
                          <p className="text-sm text-gray-500">{h.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800" className="rounded-[3rem] shadow-2xl" alt="Office" />
              </div>
            </div>
          </section>
        )}

        {activeSection === 'contact' && (
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                <div>
                  <h1 className="text-5xl font-bold mb-10">Connect <span className="text-blue-600">Now</span></h1>
                  <p className="text-xl text-gray-600 mb-12">Visit our hub in Bambalapitiya or reach out for priority support.</p>
                  
                  <div className="space-y-8">
                    <div className="flex items-start space-x-6">
                      <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-600 flex-shrink-0">
                        <i className="fa-solid fa-location-dot text-2xl"></i>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold">Main Hub</h4>
                        <p className="text-gray-600">Bambalapitiya, Colombo 04</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-6">
                      <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-600 flex-shrink-0">
                        <i className="fa-solid fa-phone text-2xl"></i>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold">24/7 Hotline</h4>
                        <p className="text-gray-600">+94 77 998 0801</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-gray-100">
                  <h3 className="text-2xl font-bold mb-8">Send Inquiry</h3>
                  <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <input type="text" className="w-full bg-gray-50 border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-blue-600" placeholder="Your Name" />
                    <input type="email" className="w-full bg-gray-50 border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-blue-600" placeholder="Email Address" />
                    <textarea rows={4} className="w-full bg-gray-50 border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-blue-600" placeholder="What equipment are you looking for?"></textarea>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />

      {/* WhatsApp Link Floating */}
      <a 
        href="https://wa.me/94779980801" 
        target="_blank"
        className="fixed bottom-8 right-8 z-40 bg-green-500 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform group"
      >
        <i className="fa-brands fa-whatsapp text-3xl"></i>
        <span className="absolute right-20 bg-white text-gray-900 px-4 py-2 rounded-xl text-xs font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-gray-100">
          Chat with Sales
        </span>
      </a>
    </div>
  );
};

export default App;
