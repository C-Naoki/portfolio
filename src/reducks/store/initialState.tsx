import { FirebaseTimestamp } from '../../firebase'

import type { ContactState } from '../contact/types'

export type AsyncStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

interface InitialStateType {
  contact: ContactState
}

const initialState: InitialStateType = {
  contact: {
    surName: '',
    name: '',
    email: '',
    subject: '',
    message: '',
    uid: '',
    written_at: FirebaseTimestamp.now()
  }
}

export default initialState
