export type Client = {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  created_at: string;
  clients?: {
    phone_number: string;
    birthday: string;
    jobs: string;
    is_married: boolean;
    dependents: number;
    dependents_note: string;
  };
};