import useMediaQuery from './useMediaQuery';

const useDeviceType = (
  mobileQuery='(max-width: 767px)',
  tabletQuery='(min-width: 768px) and (max-width: 1024px)',
  desktopQuery = '(min-width: 1025px)') => {
  const isMobile = useMediaQuery(mobileQuery);
  const isTablet = useMediaQuery(tabletQuery);
  const isDesktop = useMediaQuery(desktopQuery);

  return {
    isMobile,
    isTablet,
    isDesktop
  };
};

export default useDeviceType;