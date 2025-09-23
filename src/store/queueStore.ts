import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface QueueItem {
  id: string;
  number: number;
  timestamp: Date;
  status: 'waiting' | 'called' | 'served';
}

interface QueueState {
  queue: QueueItem[];
  currentNumber: number;
  totalServed: number;
  isLoggedIn: boolean;
  
  // Actions
  takeNumber: () => QueueItem;
  callNext: () => QueueItem | null;
  markAsServed: (id: string) => void;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  getCurrentWaiting: () => number;
  getActiveNumber: () => number | null;
}

export const useQueueStore = create<QueueState>()(
  persist(
    (set, get) => ({
      queue: [],
      currentNumber: 0,
      totalServed: 0,
      isLoggedIn: false,

      takeNumber: () => {
        const newNumber = get().currentNumber + 1;
        const newItem: QueueItem = {
          id: `queue-${newNumber}-${Date.now()}`,
          number: newNumber,
          timestamp: new Date(),
          status: 'waiting'
        };

        set((state) => ({
          queue: [...state.queue, newItem],
          currentNumber: newNumber
        }));

        return newItem;
      },

      callNext: () => {
        const { queue } = get();
        const nextItem = queue.find(item => item.status === 'waiting');
        
        if (nextItem) {
          set((state) => ({
            queue: state.queue.map(item =>
              item.id === nextItem.id
                ? { ...item, status: 'called' }
                : item.status === 'called'
                ? { ...item, status: 'served' }
                : item
            ),
            totalServed: state.totalServed + (queue.find(item => item.status === 'called') ? 1 : 0)
          }));
          return nextItem;
        }
        return null;
      },

      markAsServed: (id: string) => {
        set((state) => ({
          queue: state.queue.map(item =>
            item.id === id ? { ...item, status: 'served' } : item
          )
        }));
      },

      login: (username: string, password: string) => {
        // Simple dummy authentication
        if (username === 'admin' && password === 'admin123') {
          set({ isLoggedIn: true });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ isLoggedIn: false });
      },

      getCurrentWaiting: () => {
        return get().queue.filter(item => item.status === 'waiting').length;
      },

      getActiveNumber: () => {
        const activeItem = get().queue.find(item => item.status === 'called');
        return activeItem ? activeItem.number : null;
      }
    }),
    {
      name: 'queue-storage',
    }
  )
);