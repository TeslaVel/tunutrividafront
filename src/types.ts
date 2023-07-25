export enum SelectedPage {
  Home = "home",
  Packages = "packages",
  Treatments = "treatments",
  Contactus = "contactus",
  LogIn = "login",
  Landing = "landing",
  Dashboard = "dashboard",
  NotFound = "notfound",
  Appointments = "appointments",
  Sessions = "sessions",
  Chat = "chat",
  Terms = "terms",
  Policies = "policies",
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

export interface UserColors {[key: string]: string}

export interface User {
  id: string
  firstName: string
  fullName: string
  firstNameInitial: string
  initials: string
}


export enum Colors {
  WHITE01="#EEE",
  PURPLE500= "rgb(145, 98, 145)",
  PURPLE400= "rgb(156, 108, 156)",
  PURPLE300= "rgb(167, 118, 167)",
  PURPLE200= "rgb(178, 128, 178)",
  PURPLE100= "rgb(189, 138, 189)",
  PURPLE50= "rgb(210, 148, 210)",
  PURPLE30= "rgb(211, 158, 211)",
  PURPLE20= "rgb(222, 168, 222)",
  PURPLE15= "rgb(233, 178, 233)",
  PURPLE10= "rgb(244, 188, 244)",
  PURPLE05= "rgb(255, 198, 255)",
  PURPLE01= "rgb(250, 215, 250)",
  GRAYPURPLE10= "rgb(203, 181, 209)",
  DARKPURPLE700= "rgb(72, 3, 96)",
  DARKPURPLE600= "rgb(73, 3, 103)",
  DARKPURPLE500= "rgb(74, 3, 96)",
  DARKPURPLE400= "rgb(76, 4, 96)",
  DARKPURPLE300= "rgb(78, 4, 96)",
  DARKPURPLE200= "rgb(80, 4, 96)",
  DARKPURPLE100= "rgb(82, 5, 96)",
  DARKPURPLE50= "rgb(84, 5, 96)",
  DARKPURPLE40= "rgb(86, 5, 96)",
  DARKPURPLE30= "rgb(88, 5, 96)",
  DARKPURPLE20= "rgb(90, 5, 96)",
  DARKPURPLE10= "rgb(92, 5, 96)",
  DARKPURPLE05= "rgb(94, 7, 93)",
  GRAY20="#F8F4EB",
  BURGUNDY500="#5E0000",
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