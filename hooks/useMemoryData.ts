'use client';

import { useState, useEffect } from 'react';
import { MemoryItem } from '@/types';

const DEFAULT_DATA: MemoryItem[] = [
  { id: '00', number: '00', imageName: 'Quả trứng', action: 'Lăn tròn', imageUrl: '/images/00.jpg' },
  { id: '01', number: '01', imageName: 'Cây gậy', action: 'Đập mạnh', imageUrl: '/images/01.jpg' },
  { id: '02', number: '02', imageName: 'Con vịt', action: 'Bơi lội', imageUrl: '/images/02.jpg' },
  { id: '03', number: '03', imageName: 'Trái tim', action: 'Đập thình thịch', imageUrl: '/images/03.jpg' },
  { id: '04', number: '04', imageName: 'Cái ghế', action: 'Ngồi xuống', imageUrl: '/images/04.jpg' },
  { id: '05', number: '05', imageName: 'Quả táo', action: 'Cắn', imageUrl: '/images/05.jpg' },
];

export function useMemoryData() {
  const [items, setItems] = useState<MemoryItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('memory_items');
    setTimeout(() => {
      if (stored) {
        setItems(JSON.parse(stored));
      } else {
        setItems(DEFAULT_DATA);
        localStorage.setItem('memory_items', JSON.stringify(DEFAULT_DATA));
      }
      setIsLoaded(true);
    }, 0);
  }, []);

  const saveItems = (newItems: MemoryItem[]) => {
    // Sort items by number numerically
    const sortedItems = [...newItems].sort((a, b) => parseInt(a.number) - parseInt(b.number));
    setItems(sortedItems);
    localStorage.setItem('memory_items', JSON.stringify(sortedItems));
  };

  const addItem = (item: MemoryItem) => {
    if (items.some(i => i.number === item.number)) {
      throw new Error('Số này đã tồn tại trong thư viện!');
    }
    saveItems([...items, item]);
  };

  const updateItem = (updatedItem: MemoryItem) => {
    saveItems(items.map(i => i.id === updatedItem.id ? updatedItem : i));
  };

  const deleteItem = (id: string) => {
    saveItems(items.filter(i => i.id !== id));
  };

  return { items, isLoaded, addItem, updateItem, deleteItem };
}
