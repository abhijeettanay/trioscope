import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

interface BudgetCategory {
  id: string;
  user_id: string;
  name: string;
  allocated: number;
  spent: number;
  icon: string;
  color: string;
  created_at: string;
  updated_at: string;
}

const defaultCategories = [
  { name: 'Canteen', allocated: 2000, icon: '🍽️', color: 'bg-red-500' },
  { name: 'Outings', allocated: 1500, icon: '🎉', color: 'bg-purple-500' },
  { name: 'Transport', allocated: 800, icon: '🚌', color: 'bg-blue-500' },
  { name: 'Study Materials', allocated: 1000, icon: '📚', color: 'bg-green-500' },
  { name: 'Shopping', allocated: 1200, icon: '🛍️', color: 'bg-yellow-500' },
  { name: 'Entertainment', allocated: 800, icon: '🎬', color: 'bg-pink-500' },
];

export const useBudgetCategories = () => {
  const { user } = useAuth();
  const [categories, setCategories] = useState<BudgetCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchCategories();
    } else {
      setCategories([]);
      setLoading(false);
    }
  }, [user]);

  const fetchCategories = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('budget_categories')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (error) throw error;

      if (!data || data.length === 0) {
        // Create default categories for new users
        await createDefaultCategories();
      } else {
        setCategories(data);
      }
    } catch (error) {
      console.error('Error fetching budget categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const createDefaultCategories = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('budget_categories')
        .insert(
          defaultCategories.map(cat => ({
            ...cat,
            user_id: user.id,
            spent: 0,
          }))
        )
        .select();

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error creating default categories:', error);
    }
  };

  const updateCategorySpent = async (id: string, spent: number) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('budget_categories')
        .update({ spent })
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      setCategories(prev => 
        prev.map(cat => cat.id === id ? data : cat)
      );
      return data;
    } catch (error) {
      console.error('Error updating category spent:', error);
      throw error;
    }
  };

  const updateCategoryAllocated = async (id: string, allocated: number) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('budget_categories')
        .update({ allocated })
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      setCategories(prev => 
        prev.map(cat => cat.id === id ? data : cat)
      );
      return data;
    } catch (error) {
      console.error('Error updating category allocation:', error);
      throw error;
    }
  };

  return { 
    categories, 
    loading, 
    updateCategorySpent, 
    updateCategoryAllocated, 
    refetch: fetchCategories 
  };
};