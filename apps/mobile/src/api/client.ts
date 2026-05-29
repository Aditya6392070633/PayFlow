import * as SecureStore from 'expo-secure-store';
export const API_URL='http://10.0.2.2:4000';
export async function api(path:string,options:any={}){const token=await SecureStore.getItemAsync('token');const res=await fetch(API_URL+path,{...options,headers:{'Content-Type':'application/json',...(token?{Authorization:`Bearer ${token}`}:{}) ,...(options.headers||{})}});const json=await res.json();if(!res.ok)throw new Error(json.message||'API error');return json;}
