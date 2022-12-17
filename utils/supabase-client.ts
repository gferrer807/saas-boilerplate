import {
  createBrowserSupabaseClient,
  User
} from '@supabase/auth-helpers-nextjs';
import { ProductWithPrice } from 'types';
import type { Database } from 'types_db';

export const supabase = createBrowserSupabaseClient<Database>();

export const getActiveProductsWithPrices = async (): Promise<
  ProductWithPrice[]
> => {
  const { data, error } = await supabase
    .from('products')
    .select('*, prices(*)')
    .eq('active', true)
    .eq('prices.active', true)
    .order('metadata->index')
    .order('unit_amount', { foreignTable: 'prices' });

  if (error) {
    console.log(error.message);
    throw error;
  }
  // TODO: improve the typing here.
  return (data as any) || [];
};

export const updateUserName = async (user: User, name: string) => {
  await supabase
    .from('users')
    .update({
      full_name: name
    })
    .eq('id', user.id);
};

//supabase function to save a document with a title, description and a user id
export const saveJobDocument = async (title: string, description: string, user: User) => {
  const user_id = user.id
  await supabase
    .from('jobPostings')
    .insert([
      { title, description, user_id }
    ])
}

//supabase function to get all documents for a user
export const getJobDocuments = async (user: User) => {
  const { data, error } = await supabase
    .from('jobPostings')
    .select('*')
    .eq('user_id', user.id)

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data
}
