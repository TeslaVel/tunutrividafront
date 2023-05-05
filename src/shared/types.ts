export enum SelectedPage {
  Home = "home",
  Packages = "packages",
  NuestrosTratamientos = "nuestrostratamientos",
  Contactanos = "contactanos",
  LogIn = "login",
  Landing = "landing",
  Profile = "profile",
  NotFound = "notfound",
}

export interface BenefitType {
  icon: JSX.Element;
  title: string;
  description: string;
}

export interface ClassType {
  name: string;
  description?: string;
  url: string;
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
  SECONDARY500="#FFA6A3"
}
