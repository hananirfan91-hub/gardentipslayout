import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import { useAuth } from '../AuthContext';
import { db } from '../firebase';
import { collection, addDoc, query, where, getDocs, serverTimestamp, deleteDoc, doc, updateDoc, onSnapshot, getDoc } from 'firebase/firestore';
import { VEGETABLES } from '../constants';
import { GardenItem, GardenLayout } from '../types';
import { Save, Trash2, Plus, Download, Layout as LayoutIcon, Loader2, CheckCircle, Info, X, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export const Planner: React.FC = () => {
  const { user } = useAuth();
  const { id: urlId } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState<GardenItem[]>([]);
  const [layoutName, setLayoutName] = useState('My Garden Layout');
  const [savedLayouts, setSavedLayouts] = useState<GardenLayout[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success'>('idle');
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied'>('idle');
  const [selectedItem, setSelectedItem] = useState<GardenItem | null>(null);
  const [currentLayoutId, setCurrentLayoutId] = useState<string | null>(urlId || null);
  const [tipsHistory, setTipsHistory] = useState<string[]>([]);
  const canvasRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<{ [key: string]: React.RefObject<HTMLDivElement> }>({});

  // Helper to get or create a nodeRef for an item
  const getNodeRef = (id: string) => {
    if (!nodeRefs.current[id]) {
      nodeRefs.current[id] = React.createRef<HTMLDivElement>();
    }
    return nodeRefs.current[id];
  };

  // Track tips viewed
  useEffect(() => {
    if (selectedItem) {
      const veg = VEGETABLES.find(v => v.type === selectedItem.type);
      if (veg && veg.tips) {
        setTipsHistory(prev => {
          const newTips = veg.tips!.filter(tip => !prev.includes(tip));
          return [...prev, ...newTips];
        });
      }
    }
  }, [selectedItem]);

  // Load layout from URL if present
  useEffect(() => {
    if (urlId && !currentLayoutId) {
      setCurrentLayoutId(urlId);
    }
  }, [urlId]);

  // Real-time listener for the current layout
  useEffect(() => {
    if (!currentLayoutId) return;

    const unsub = onSnapshot(doc(db, 'layouts', currentLayoutId), (doc) => {
      if (doc.exists()) {
        const data = doc.data() as GardenLayout;
        // Only update if the items are different to avoid infinite loops with Draggable
        if (JSON.stringify(data.items) !== JSON.stringify(items)) {
          setItems(data.items);
          setLayoutName(data.name);
        }
      }
    });

    return () => unsub();
  }, [currentLayoutId]);

  useEffect(() => {
    if (user) {
      fetchLayouts();
    }
  }, [user]);

  const fetchLayouts = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const q = query(collection(db, 'layouts'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const layouts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GardenLayout));
      setSavedLayouts(layouts);
    } catch (error) {
      console.error('Error fetching layouts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addItem = async (veg: typeof VEGETABLES[0]) => {
    const newItem: GardenItem = {
      id: Math.random().toString(36).substr(2, 9),
      type: veg.type,
      x: 50,
      y: 50,
      width: 60,
      height: 60,
      color: veg.color,
    };
    const newItems = [...items, newItem];
    setItems(newItems);

    // If we are in a shared layout, push to Firestore immediately
    if (currentLayoutId && user) {
      try {
        await updateDoc(doc(db, 'layouts', currentLayoutId), {
          items: newItems,
          updatedAt: serverTimestamp(),
        });
      } catch (error) {
        console.error('Error adding item to shared layout:', error);
      }
    }
  };

  const removeItem = async (id: string) => {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);

    if (currentLayoutId && user) {
      try {
        await updateDoc(doc(db, 'layouts', currentLayoutId), {
          items: newItems,
          updatedAt: serverTimestamp(),
        });
      } catch (error) {
        console.error('Error removing item from shared layout:', error);
      }
    }
  };

  const updateItemPos = (id: string, x: number, y: number) => {
    const newItems = items.map(item => item.id === id ? { ...item, x, y } : item);
    setItems(newItems);

    if (currentLayoutId && user) {
      updateDoc(doc(db, 'layouts', currentLayoutId), {
        items: newItems,
        updatedAt: serverTimestamp(),
      }).catch(error => {
        console.error('Error updating item position in shared layout:', error);
      });
    }
  };

  const handleSave = async () => {
    if (!user) return;
    setSaveStatus('saving');
    try {
      const layoutData = {
        userId: user.uid,
        name: layoutName,
        items,
        updatedAt: serverTimestamp(),
      };

      if (currentLayoutId) {
        await updateDoc(doc(db, 'layouts', currentLayoutId), layoutData);
      } else {
        const docRef = await addDoc(collection(db, 'layouts'), {
          ...layoutData,
          createdAt: serverTimestamp(),
        });
        setCurrentLayoutId(docRef.id);
        navigate(`/planner/${docRef.id}`, { replace: true });
      }
      
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 2000);
      fetchLayouts();
    } catch (error) {
      console.error('Error saving layout:', error);
      setSaveStatus('idle');
    }
  };

  const handleShare = () => {
    if (!currentLayoutId) return;
    const url = `${window.location.origin}/planner/${currentLayoutId}`;
    navigator.clipboard.writeText(url);
    setShareStatus('copied');
    setTimeout(() => setShareStatus('idle'), 2000);
  };

  const loadLayout = (layout: GardenLayout) => {
    setItems(layout.items);
    setLayoutName(layout.name);
    setCurrentLayoutId(layout.id || null);
    setSelectedItem(null);
    if (layout.id) {
      navigate(`/planner/${layout.id}`);
    }
  };

  const deleteLayout = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this layout?')) return;
    try {
      await deleteDoc(doc(db, 'layouts', id));
      setSavedLayouts(savedLayouts.filter(l => l.id !== id));
    } catch (error) {
      console.error('Error deleting layout:', error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
        <LayoutIcon size={64} className="text-stone-300 mb-6" />
        <h2 className="text-3xl font-bold text-stone-900 mb-4">Planner Access Restricted</h2>
        <p className="text-stone-600 max-w-md mb-8">
          Please sign in to access the interactive vegetable garden layout planner and save your designs.
        </p>
        <Link to="/login" className="bg-emerald-800 text-white px-8 py-3 rounded-full font-bold hover:bg-emerald-700 transition-all">
          Sign In Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Helmet>
        <title>Garden Planner | GardenLayoutTips</title>
        <meta name="description" content="Design your perfect vegetable garden layout with our interactive planner. Drag and drop plants, save your designs, and grow more food." />
        <link rel="canonical" href="https://gardenlayouttips.vercel.app/planner" />
      </Helmet>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar - Tools */}
        <aside className="w-full lg:w-80 space-y-8">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Plus size={20} className="text-emerald-600" /> Add Plants
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {VEGETABLES.map((veg) => (
                <button
                  key={veg.type}
                  onClick={() => addItem(veg)}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl border border-stone-100 hover:border-emerald-200 hover:bg-emerald-50 transition-all group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">{veg.icon}</span>
                  <span className="text-xs font-medium text-stone-600">{veg.type}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <LayoutIcon size={20} className="text-emerald-600" /> Saved Layouts
            </h3>
            {isLoading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="animate-spin text-emerald-600" />
              </div>
            ) : savedLayouts.length > 0 ? (
              <div className="space-y-3">
                {savedLayouts.map((layout) => (
                  <div key={layout.id} className="flex items-center justify-between group">
                    <button
                      onClick={() => loadLayout(layout)}
                      className="text-sm text-stone-600 hover:text-emerald-700 font-medium truncate flex-1 text-left"
                    >
                      {layout.name}
                    </button>
                    <button
                      onClick={() => deleteLayout(layout.id!)}
                      className="text-stone-300 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-stone-400 italic">No saved layouts yet.</p>
            )}
          </div>
        </aside>

        {/* Main Planner Area */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
            <input
              type="text"
              value={layoutName}
              onChange={(e) => setLayoutName(e.target.value)}
              className="text-xl font-bold text-stone-900 bg-transparent border-none focus:ring-0 p-0"
            />
            <div className="flex items-center gap-3">
              {currentLayoutId && (
                <button
                  onClick={handleShare}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all ${
                    shareStatus === 'copied' 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {shareStatus === 'copied' ? <CheckCircle size={18} /> : <Share2 size={18} />}
                  {shareStatus === 'copied' ? 'Link Copied!' : 'Share Layout'}
                </button>
              )}
              <button
                onClick={handleSave}
                disabled={saveStatus !== 'idle'}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all ${
                  saveStatus === 'success' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-emerald-800 text-white hover:bg-emerald-700'
                }`}
              >
                {saveStatus === 'saving' ? <Loader2 size={18} className="animate-spin" /> : 
                 saveStatus === 'success' ? <CheckCircle size={18} /> : <Save size={18} />}
                {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'success' ? 'Saved!' : 'Save Layout'}
              </button>
            </div>
          </div>

          {/* Print Header */}
          <div className="hidden print:block mb-8 border-b-2 border-stone-200 pb-4">
            <h1 className="text-3xl font-bold text-stone-900">{layoutName}</h1>
            <p className="text-stone-500">Vegetable Garden Layout Plan - Generated by GardenLayoutTips</p>
          </div>

          <div 
            ref={canvasRef}
            className="bg-[#fdfdfb] rounded-2xl border-2 border-dashed border-stone-200 h-[600px] relative overflow-hidden shadow-inner print:border-none print:shadow-none"
            style={{ backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)', backgroundSize: '20px 20px' }}
          >
            {items.length === 0 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-400 pointer-events-none">
                <Plus size={48} className="mb-4 opacity-20" />
                <p className="text-lg font-medium">Drag plants from the sidebar to start</p>
              </div>
            )}
            
            {items.map((item) => (
              <Draggable
                key={item.id}
                nodeRef={getNodeRef(item.id)}
                bounds="parent"
                defaultPosition={{ x: item.x, y: item.y }}
                onStop={(e, data) => updateItemPos(item.id, data.x, data.y)}
                onStart={() => setSelectedItem(item)}
              >
                <div 
                  ref={getNodeRef(item.id)}
                  className={`absolute cursor-move group ${selectedItem?.id === item.id ? 'z-20' : 'z-10'}`}
                  style={{ width: item.width, height: item.height }}
                  onClick={() => setSelectedItem(item)}
                >
                  <div 
                    className={`w-full h-full rounded-2xl flex items-center justify-center text-3xl shadow-md border-2 transition-transform hover:scale-110 ${
                      selectedItem?.id === item.id ? 'border-emerald-500 ring-4 ring-emerald-500/20' : 'border-white'
                    }`}
                    style={{ backgroundColor: item.color }}
                  >
                    {VEGETABLES.find(v => v.type === item.type)?.icon}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeItem(item.id);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-30"
                  >
                    <Trash2 size={12} />
                  </button>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-stone-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.type}
                  </div>
                </div>
              </Draggable>
            ))}
          </div>

          <AnimatePresence>
            {selectedItem && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-white p-6 rounded-2xl border border-emerald-200 shadow-lg relative"
              >
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 text-stone-400 hover:text-stone-600"
                >
                  <X size={20} />
                </button>
                <div className="flex items-center gap-4 mb-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-inner"
                    style={{ backgroundColor: selectedItem.color }}
                  >
                    {VEGETABLES.find(v => v.type === selectedItem.type)?.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-lg">{selectedItem.type}</h4>
                    <p className="text-xs text-emerald-600 font-bold uppercase tracking-widest">Expert Gardening Tips</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {VEGETABLES.find(v => v.type === selectedItem.type)?.tips?.map((tip, i) => (
                    <div key={i} className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex gap-3">
                      <Info size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                      <p className="text-sm text-emerald-800 leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="bg-stone-100 p-6 rounded-2xl text-stone-600 text-sm leading-relaxed">
            <h4 className="font-bold text-stone-900 mb-2">Pro Tip:</h4>
            <p>
              When designing your <strong>vegetable garden layout</strong>, remember to place taller plants like 
              Corn or Trellised Tomatoes on the north side of your plot to avoid shading smaller plants like 
              Lettuce or Carrots. Use our <strong>square foot gardening</strong> principles for maximum efficiency!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
