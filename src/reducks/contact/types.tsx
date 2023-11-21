import {Timestamp} from 'firebase/firestore'

export type Action = {
  type: string;
  payload: any;
}

export type ContactState = {
  surName: string,
  name: string,
  email: string;
  subject: string;
  message: string;
  uid: string;
  written_at: Timestamp;
}
