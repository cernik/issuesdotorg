// @flow
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function storeData(key: string, data: Array<any>): Promise<void> {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log('error on reading storage', e);
  }
}

export async function getData(key: string): Promise<any> {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('error on storing to storage', e);
  }
}
