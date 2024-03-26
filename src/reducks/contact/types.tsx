import type { Timestamp } from 'firebase/firestore'

export interface Action {
  type: string
  payload: any
}

export interface ContactState {
  surName: string
  name: string
  email: string
  subject: string
  message: string
  uid: string
  written_at: Timestamp
}
