
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export type Language = 'cn' | 'ru' | 'en';

export interface ServiceItem {
  id: string;
  name: string; 
  category: string;
  image: string;
  gallery?: string[];
  deliveryTime: string;
  description: string;
  icon: any;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
  attachment?: {
    name: string;
    type: string;
    data?: string; 
  };
}

export interface BlogPost {
  title: string;
  summary: string;
  date: string;
  sourceUrl?: string;
  sourceName?: string;
  tags: string[];
}

export enum Section {
  HERO = 'hero',
  SERVICES = 'services', 
  INSIGHTS = 'insights',
  ABOUT = 'about', 
  TARIFFS = 'tariffs', 
}
