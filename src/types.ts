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
  Profile = "profile",
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

export interface FullUserType {
  id: string
  email: string
  token: string
  gender: 'female' | 'male'
  firstName: string
  lastName: string
  dietitianId: string
  imageUrl: string;
  height: string
  weight: string
  imc: string
  age: string
}

export interface ThemeType {
  [key: string]: {
    [key: string]: string
  },
}

export interface UserType {
  id: string
  firstName: string
  lastName: string
  fullName: string
  firstNameInitial?: string
  initials: string
  username: string
}

export interface DietitianType extends Omit<UserType, 'username'> {}
export interface ProfileType extends Omit<FullUserType, 'token'> {}

/* FOR QUERIES */
export interface EntryType {
  id: string;
  description:  string;
  entryType: string;
  imageUrl: string;
  path:  string;
  createdAt:  string;
  comments: CommentType[]
  user: UserType
}

export interface AppointmentType {
  id: string
  title: string
  startDate: string
  timeStart: string
  timeEnd: string
  createdAt: string
  appointmentType: string
  status: 'pending' | 'ocurred' | 'happening' | 'cancelled' | string
  dietitian: DietitianType
}

export interface PaginatedAppointmentType {
  paginated: AppointmentType[]
  page: number
  limit: number
  nextPage: number
  prevPage: number
  totalPages: number
  currentPage: number
}

export interface SessionType {
  id: string
  age: string
  height: string
  weight: string
  waist: string | null
  hip: string | null
  highAbdomen: string | null
  lowAbdomen: string | null
  imc: string | null
  idealWeight: string | null
  bodyGrease: string | null
  visceralGrease: string | null
  muscleMass: string | null
  boneMass: string | null
  waterPercentage: string | null
  bmr: string | null
  metabolicAge: string | null
  physicalComplexion: string | null
  date: string
  activityFactor: {
    id: string
    name: string
    description: string
  }
  diet: {
    id: string,
    name: string,
    description: string
    dietMealWeeks: [{
      id: string
      dietId: string
      dayOfWeek: string,
      createdAt: string,
      dietMealTimes: [{
        id: string,
        dietMealWeekId: string
        mealTime: string,
        createdAt: string
        dietIngredient: {
          id: string,
          dietMealTimeId: string,
          mealId: string,
          instructions: string
          createdAt: string,
          meal: {
            id: string,
            name: string
          }
        }
      }]
    }]
  }
}

export interface DietType {
  diet: SessionType['diet']
}
export interface PaginatedSessionType {
  paginated: SessionType[]
  page: number
  limit: number
  nextPage: number
  prevPage: number
  totalPages: number
  currentPage: number
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
  user: UserType
}

export interface NoteType {
  id: string;
  message: string;
  createdAt: string;
  conversationId: string;
  user: UserType
}

export interface ConversationType {
  id: string;
  dietitian_id: string;
  patient_id: string;
  notes: NoteType[]
}


export enum Colors {
  WHITE01="#EEE",
  PRIMARYMALE700="rgb(30, 78, 128)",
  PRIMARYMALE600="rgb(40, 88, 138)",
  PRIMARYMALE500="rgb(50, 98, 148)",
  PRIMARYMALE400="rgb(60, 108, 158)",
  PRIMARYMALE300="rgb(70, 118, 168)",
  PRIMARYMALE200="rgb(80, 128, 178)",
  PRIMARYMALE100="rgb(90, 138, 188)",
  PRIMARYMALE50="rgb(100, 148, 198)",
  PRIMARYMALE40="rgb(110, 158, 208)",
  PRIMARYMALE30="rgb(120, 168, 218)",
  PRIMARYMALE20="rgb(130, 178, 228)",
  PRIMARYMALE10="rgb(140, 188, 238)",
  PRIMARYMALE05="rgb(150, 198, 248)",
  SECONDARYMALE700="rgb(100, 120, 140)",
  SECONDARYMALE600="rgb(108, 128, 148)",
  SECONDARYMALE500="rgb(116, 136, 156)",
  SECONDARYMALE400="rgb(124, 144, 164)",
  SECONDARYMALE300="rgb(132, 152, 172)",
  SECONDARYMALE200="rgb(140, 160, 180)",
  SECONDARYMALE100="rgb(148, 168, 188)",
  SECONDARYMALE50="rgb(156, 176, 196)",
  SECONDARYMALE40="rgb(164, 184, 204)",
  SECONDARYMALE30="rgb(172, 192, 212)",
  SECONDARYMALE20="rgb(180, 200, 220)",
  SECONDARYMALE10="rgb(188, 208, 228)",
  SECONDARYMALE05="rgb(196, 216, 236)",
  PRIMARYFEMALE700="rgb(70, 3, 96)",
  PRIMARYFEMALE600="rgb(74, 7, 100)",
  PRIMARYFEMALE500="rgb(78, 11, 104)",
  PRIMARYFEMALE400="rgb(82, 15, 108)",
  PRIMARYFEMALE300="rgb(86, 19, 112)",
  PRIMARYFEMALE200="rgb(90, 23, 116)",
  PRIMARYFEMALE100="rgb(94, 27, 120)",
  PRIMARYFEMALE50="rgb(98, 31, 124)",
  PRIMARYFEMALE40="rgb(102, 35, 128)",
  PRIMARYFEMALE30="rgb(106, 39, 132)",
  PRIMARYFEMALE20="rgb(110, 43, 136)",
  PRIMARYFEMALE10="rgb(114, 47, 140)",
  PRIMARYFEMALE05="rgb(118, 51, 144)",
  SECONDARYFEMALE700="rgb(145, 98, 145)",
  SECONDARYFEMALE600="rgb(156, 108, 156)",
  SECONDARYFEMALE500="rgb(167, 118, 167)",
  SECONDARYFEMALE400="rgb(178, 128, 178)",
  SECONDARYFEMALE300="rgb(189, 138, 189)",
  SECONDARYFEMALE200="rgb(200, 148, 200)",
  SECONDARYFEMALE100="rgb(211, 158, 211)",
  SECONDARYFEMALE50="rgb(222, 168, 222)",
  SECONDARYFEMALE40="rgb(233, 178, 233)",
  SECONDARYFEMALE30="rgb(244, 188, 244)",
  SECONDARYFEMALE20="rgb(255, 198, 255)",
  SECONDARYFEMALE10="rgb(266, 208, 266)",
  SECONDARYFEMALE05="rgb(277, 218, 277)",
  PURPLE500="rgb(145, 98, 145)",
  PURPLE400="rgb(156, 108, 156)",
  PURPLE300="rgb(167, 118, 167)",
  PURPLE200="rgb(178, 128, 178)",
  PURPLE100="rgb(189, 138, 189)",
  PURPLE50="rgb(210, 148, 210)",
  PURPLE30="rgb(211, 158, 211)",
  PURPLE20="rgb(222, 168, 222)",
  PURPLE15="rgb(233, 178, 233)",
  PURPLE10="rgb(244, 188, 244)",
  PURPLE05="rgb(255, 198, 255)",
  PURPLE01="rgb(250, 215, 250)",
  GRAYPURPLE10="rgb(203, 181, 209)",
  DARKPURPLE700="rgb(70, 3, 96)",
  DARKPURPLE600="rgb(74, 7, 100)",
  DARKPURPLE500="rgb(78, 11, 104)",
  DARKPURPLE400="rgb(82, 15, 108)",
  DARKPURPLE300="rgb(86, 19, 112)",
  DARKPURPLE200="rgb(90, 23, 116)",
  DARKPURPLE100="rgb(94, 27, 120)",
  DARKPURPLE50="rgb(98, 31, 124)",
  DARKPURPLE40="rgb(102, 35, 128)",
  DARKPURPLE30="rgb(106, 39, 132)",
  DARKPURPLE20="rgb(110, 43, 136)",
  DARKPURPLE10="rgb(114, 47, 140)",
  DARKPURPLE05="rgb(118, 51, 144)",
  GRAY700="rgb(105, 104, 105)",
  GRAY600="rgb(115, 114, 115)",
  GRAY500="rgb(125, 124, 125)",
  GRAY400="rgb(135, 134, 135)",
  GRAY300="rgb(145, 144, 145)",
  GRAY200="rgb(155, 154, 155)",
  GRAY100="rgb(165, 164, 165)",
  GRAY50="rgb(175, 174, 175)",
  GRAY40="rgb(185, 184, 185)",
  GRAY30="rgb(195, 194, 195)",
  GRAY20="rgb(205, 204, 205)",
  GRAY10="rgb(215, 214, 215)",
  GRAY05="rgb(225, 224, 225)",
  BURGUNDY500="#5E0000",
  NONE="none"
}