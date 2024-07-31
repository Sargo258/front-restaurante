export interface Reservation {
  id?: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  people: number;
  user_id?: number | null;
}

export interface ReservationWithFormattedDate extends Reservation {
  formattedDate?: string | null; // Campo opcional
}

  