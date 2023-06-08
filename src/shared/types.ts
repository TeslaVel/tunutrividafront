export enum SelectedPage {
  Home = "home",
  Packages = "packages",
  NuestrosTratamientos = "tratamientos",
  Contactanos = "contactanos",
  LogIn = "login",
  Landing = "landing",
  Dashboard = "dashboard",
  NotFound = "notfound",
  Appointments = "appointments",
  Sessions = "sessions",
  Chat = "chat",
}

export interface PackageType {
  icon: JSX.Element
  title: string
  description: string
}

export interface GeneralOptions {
  label: string
  value: string
}

export interface ClassType {
  name: string
  description?: string
  url: string
}

export interface UserType {
  id: string
  email: string
  token: string
  gender: 'female' | 'male'
  firstName: string
  lastName: string
  dietitianId: string
  height: string
  weight: string
  imc: string
  age: string
}

export interface User {
  id: string
  firstName: string
  fullName: string
  firstNameInitial: string
  initials: string
}


export enum Colors {
  PRIMARY100="#FFE1E0",
  PRIMARY300="#FFA6A3",
  PRIMARY500="#FF6B66",
  GRAY20="#F8F4EB",
  GRAY50="#EFE6E6",
  GRAY100="#DFCCCC",
  GRAY500="#5E0000",
  SECONDARY400="#FFCD5B",
  SECONDARY500="#FFA6A3",
  NONE="none"
}


/* FOR QUERIES */

export interface EntryType {
  id: string;
  description:  string;
  entryType: string;
  imageUrl: string;
  path:  string;
  createdAt:  string;
  comments: CommentType[]
  user: User
}

export interface AppointmentType {
  id: string
  title: string
  startDate: string
  timeStart: string
  timeEnd: string
  createdAt: string
  appointmentType: string
  status: 'pending' | 'ocurred' | 'happening' | 'cancelled'
  dietitian: User
}

export interface SessionType {
  id: string
  age: string
  height: string
  weight: string
  waist: string
  hip: string
  highAbdomen: string
  lowAbdomen: string
  imc: string
  idealWeight: string
  bodyGrease: string
  visceralGrease: string
  muscleMass: string
  boneMass: string,
  waterPercentage: string,
  bmr: string
  metabolicAge: string
  physicalComplexion: string
  date: string
  activityFactor: {
    id: string
    name: string
    description: string
  }
}
// export interface EntriesQueryData {
//   entries: EntryType[] | [];
// };

// export interface Entries {
//   entries: EntryType[] | [];
// };

// export interface EntriyVariables {
//   entryId: number | undefined | null;
// };

export interface CommentType {
  id: string;
  message: string;
  createdAt: string;
  user: User
}

export interface NoteType {
  id: string;
  message: string;
  createdAt: string;
  conversationId: string;
  user: User
}

export interface ConversationType {
  id: string;
  dietitian_id: string;
  patient_id: string;
  notes: NoteType[]
}
// export interface CommentMutationType {
//   comment: Comment;
// };
// export interface CommentVariables {
//   message: string;
//   entryId: string;
// };