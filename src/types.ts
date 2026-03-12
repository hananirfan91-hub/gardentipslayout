export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt: string;
}

export interface GardenItem {
  id: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

export interface GardenLayout {
  id?: string;
  userId: string;
  name: string;
  items: GardenItem[];
  createdAt: string;
  updatedAt: string;
}

export interface Favorite {
  id?: string;
  userId: string;
  contentId: string;
  contentType: 'article' | 'guide';
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  alt: string;
  category: string;
  date: string;
}
