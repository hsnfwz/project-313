import { supabase } from '../supabase';
import { ORDER_BY } from '../enums';

async function searchProfiles(
  searchTerm,
  startIndex = 0,
  limit = 6,
  orderBy = ORDER_BY.NEW
) {
  try {
    const query = searchTerm.toLowerCase().trim();

    if (query.length === 0) {
      return {
        data: [],
        hasMore: false,
      };
    }

    const { data, error } = await supabase
      .from('users')
      .select('*, avatar:avatar_id(*)')
      .or(`display_name.ilike.%${query}%,username.ilike.%${query}%`)
      .order(orderBy.columnName, { ascending: orderBy.isAscending })
      .range(startIndex, startIndex + limit - 1);

    if (error) throw error;

    return {
      data,
      hasMore: data.length === limit,
    };
  } catch (error) {
    console.log(error);
  }
}

async function getProfiles(startIndex = 0, limit = 6, orderBy = ORDER_BY.NEW) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*, avatar:avatar_id(*)')
      .order(orderBy.columnName, { ascending: orderBy.isAscending })
      .range(startIndex, startIndex + limit - 1);

    if (error) throw error;

    return {
      data,
      hasMore: data.length === limit,
    };
  } catch (error) {
    console.log(error);
  }
}

async function getProfileByUsername(username) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*, avatar:avatar_id(*)')
      .eq('username', username);

    if (error) throw error;

    return {
      data,
    };
  } catch (error) {
    console.log(error);
  }
}

async function getFollowersByProfileId(
  profileId,
  startIndex = 0,
  limit = 6,
  orderBy = ORDER_BY.NEW
) {
  try {
    const { data, error } = await supabase
      .from('followers')
      .select('*, sender:sender_user_id(*)')
      .eq('receiver_user_id', profileId)
      .order(orderBy.columnName, { ascending: orderBy.isAscending })
      .range(startIndex, startIndex + limit - 1);

    if (error) throw error;

    return {
      data,
      hasMore: data.length === limit,
    };
  } catch (error) {
    console.log(error);
  }
}

async function getFollowingByProfileId(
  profileId,
  startIndex = 0,
  limit = 6,
  orderBy = ORDER_BY.NEW
) {
  try {
    const { data, error } = await supabase
      .from('followers')
      .select('*, receiver:receiver_user_id(*)')
      .eq('sender_user_id', profileId)
      .order(orderBy.columnName, { ascending: orderBy.isAscending })
      .range(startIndex, startIndex + limit - 1);

    if (error) throw error;

    return {
      data,
      hasMore: data.length === limit,
    };
  } catch (error) {
    console.log(error);
  }
}

export {
  searchProfiles,
  getProfiles,
  getFollowersByProfileId,
  getFollowingByProfileId,
  getProfileByUsername,
};
