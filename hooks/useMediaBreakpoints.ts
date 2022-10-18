import { useMediaQuery } from "@mui/material";

const useMediaBreakpoints = () => {
    const isMobile = useMediaQuery((theme:any) => theme.breakpoints.down("md"))
    const isTablet = useMediaQuery((theme:any) => theme.breakpoints.down("lg"))
    const isDesktop = useMediaQuery((theme:any) => theme.breakpoints.down("xl"))
    const isLargeDesktop = useMediaQuery((theme:any) => theme.breakpoints.up("xl"));
    
    return {
        isMobile,
        isTablet,
        isDesktop,
        isLargeDesktop
    }
}

export default useMediaBreakpoints;