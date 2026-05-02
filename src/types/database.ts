export type Profile = {
  id: string;
  name: string;
  bio: string;
  image: string | null;
  education: string | null;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  image: string | null;
  gallery: string[] | null;
  sort_order: number | null;
};

export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  images: string[];
  sort_order: number | null;
};

export type Skill = {
  id: string;
  name: string;
  sort_order: number | null;
};

export type Contact = {
  id: string;
  email: string;
  phone: string;
  location: string | null;
  whatsapp: string | null;
};
