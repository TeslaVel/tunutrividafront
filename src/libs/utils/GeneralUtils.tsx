
import { FullUserType, Colors, ThemeType} from "@/types";

export const colorByGender = (gender: FullUserType[`gender`] = 'male'): ThemeType => {
  const gradient1 =  gender === 'male' ? Colors.PRIMARYMALE500 : Colors.PRIMARYFEMALE500
  const gradient2 =  gender === 'male' ? Colors.PRIMARYMALE700 : Colors.PRIMARYFEMALE700

  if (gender === 'male') {
    return {
      general: {
        fillSvgColorPrimary: `fill-primary-male-700`,
        baseColor: `primary-male-700`,
        baseTextColor: `text-primary-male-700`,
        baseBgColor: `bg-secondly-male-01`,
        borderL: `border border-1 border-primary-male-700`,
        borderR: `border border-r border-primary-male-700`,
        borderB: `border border-b border-primary-male-700`,
        borderT: `border border-t border-primary-male-700`,
        border: `border border-primary-male-700`,
        primaryBgColor: `bg-primary-male-700`,
        primaryBgColorHover: `hover:bg-primary-male-400`,
        secondaryBgColor: `bg-secondly-male-300`,
        secondaryBgColorHover: `hover:bg-secondly-male-100`,
      },
      entry: {
        primaryBgColor: `bg-primary-male-300`,
        secondaryBgColor: `bg-secondly-male-300`,
        thirdBgColor: `bg-secondly-male-05`,
        border: `border border-secondly-male-300`
      },
      topBar: {
        optionSelected: `border-b border-secondly-male-500 text-secondly-male-500`,
        optionHover: `hover:border-b hover:border-secondly-male-300 hover:text-secondly-male-300`,
        option: `text-primary-male-300`
      },
      filter: {
        primaryBgColor: `bg-secondly-male-05`,
        borderR: `border-r border-l border-primary-male-700`
      },
      collapsible: {
        primaryBgColor: `bg-secondly-male-300 hover:bg-secondly-male-100`,
        secondaryBgColor: `bg-secondly-male-05`,
      },
      bmi: {
        itemSelected: `bg-secondly-male-10`,
        primaryBgColor: `bg-secondly-male-05`,
      },
      chart: {
        primaryBgColor: `bg-secondly-male-05`,
        button: `bg-secondly-male-30 hover:bg-secondly-male-300 text-primary-male-700`,
      },
      sideBar: {
        styleBgGradient: `linear-gradient(30deg, ${gradient1} 0%, ${gradient2} 100%)`,
        primaryBgColor: `bg-primary-male-700`,
        sidebarLink: `bg-secondly-male-200`,
        sidebarLinkHover: `hover:bg-secondly-male-200`
      }
    }
  }

  return {
    general: {
      fillSvgColorPrimary: `fill-primary-female-700`,
      baseColor: `primary-female-700`,
      baseTextColor: `text-primary-female-700`,
      baseBgColor: `bg-secondly-female-01 `,
      borderL: `border border-1 border-primary-female-700`,
      borderR: `border border-r border-primary-female-700`,
      borderB: `border border-b border-primary-female-700`,
      borderT: `border border-t border-primary-female-700`,
      border: `border border-primary-female-700`,
      primaryBgColor: `bg-primary-female-700`,
      primaryBgColorHover: `hover:bg-primary-female-400`,
      secondaryBgColor: `bg-secondly-female-300`,
      secondaryBgColorHover: `hover:bg-secondly-female-100`,
    },
    entry: {
      primaryBgColor: `bg-primary-female-300`,
      secondaryBgColor: `bg-secondly-female-300`,
      thirdBgColor: `bg-secondly-female-05`,
      border: `border border-secondly-female-300`
    },
    topBar: {
      optionSelected: `border-b border-secondly-female-500 text-secondly-female-500`,
      optionHover: `hover:border-b hover:border-secondly-female-300 hover:text-secondly-female-300`,
      option: `text-primary-female-300`
    },
    filter: {
      primaryBgColor: `bg-secondly-female-05`,
      borderR: `border-r border-l border-primary-female-700`
    },
    collapsible: {
      primaryBgColor: `bg-secondly-female-300 hover:bg-secondly-female-100`,
      secondaryBgColor: `bg-secondly-female-05`,
    },
    bmi: {
      itemSelected: `bg-secondly-female-10`,
      primaryBgColor: `bg-secondly-female-05`,
    },
    chart: {
      primaryBgColor: `bg-secondly-female-05`,
      button: `bg-secondly-female-30 hover:bg-secondly-female-300 text-primary-female-700`,
    },
    sideBar: {
      styleBgGradient: `linear-gradient(30deg, ${gradient1} 0%, ${gradient2} 100%)`,
      primaryBgColor: `bg-primary-female-700`,
      sidebarLink: `bg-secondly-female-200`,
      sidebarLinkHover: `hover:bg-secondly-female-200`
    }
  }
}

export function getUserStored () {
  const dataStored = window.localStorage.getItem('pgus-tk');
  const userStored = dataStored !== null ? JSON.parse(dataStored) : null;

  return userStored;
}
