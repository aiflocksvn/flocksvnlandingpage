import { createTheme, useMediaQuery } from "@mui/material";

declare module "@mui/material/styles" {
    interface Palette {
      orange: Palette['primary'];
      lightOrange: Palette['primary'];
      gray: Palette['primary'];
    }
    interface PaletteOptions {
        orange: PaletteOptions['primary'];
        lightOrange: PaletteOptions['primary'];
        gray: PaletteOptions['primary'];
    }
  }

const useTheme = () => {
    
    let theme = createTheme({
        palette: {
            mode: "dark",
            primary: {
                main: "#D9FD00"
            },
            secondary: {
                main: "#0E213E"
            },
            orange: {
                main: "#E75E01"
            },
            lightOrange: {
                main: "#EA7500"
            },
            gray : {
                main: "#B6B6B6"
            }
        },
        components: {
            
            MuiTextField: {
               
                styleOverrides: {
                    root: {
                        width: "100%",
                        fontFamily: "gilory-regular"
                    }
                }
            },
            MuiAlert: {
                styleOverrides: {
                    root: {
                        fontFamily: 'gilory-regular'
                    }
                }
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        borderRadius: 10,
                        height: 54,
                        overflow: "visible",
                        fontFamily: "gilory-regular"
                        // width: 345
                    }
                }
            },
            MuiInputLabel: {
                
                styleOverrides: {
                    root: {
                        overflow:"visible",
                        overflowWrap: "break-word",
                        width: "100%",
                        marginBottom: 4
                    }
                }
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundColor: "#0E213E",
                        borderRadius: 16,
                        p:3

                    }
                }
            },
            MuiTypography: {
                styleOverrides: {
                
                    h1: {
                        fontFamily: 'gilory-black',
                        
                        
                    },
                    h2: {
                        fontFamily: 'gilory-black',
                        
                        
                        
                    },
                    h3: {
                        fontFamily: 'gilory-black',
                        
                        
                        
                    },
                    h4: {
                        fontFamily: 'gilory-black',
                        
                        
                        
                    },
                    h5: {
                        fontFamily: 'gilory-semibold',
                        
                        
                        
                    },
                    h6: {
                        fontFamily: 'gilory-semibold',
                        
                        
                        
                    },
                    body1: {
                        fontFamily: 'gilory-regular',
                        lineHeight: 2
                        
                    },
                    body2: {
                        fontFamily: 'gilory-regular',
                        lineHeight: 2
                    }
                }
            },
            MuiStepIcon: {
                styleOverrides: {
                    text: {
                        fontFamily: "gilory-semibold"
                    }
                }
            },
            MuiBackdrop: {
                styleOverrides: {
                    root: {
                        zIndex: 1000
                    }
                }
            }
        }
    });

    const isMobile = useMediaQuery(() => theme.breakpoints.down("md"));

    theme = createTheme(theme, {
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: "capitalize",
                        fontFamily: "gilory-semibold",
                        fontWeight: "bold",
                        ":hover": {
                            backgroundColor: "tranparent"
                        }
                    },
                  outlinedPrimary: {
                      transition: "background-color 0.5s ease, padding 0.8s linear",
                      ":hover": {
                          backgroundColor: isMobile ? "transparent" : theme.palette.primary.main,
                          color: isMobile ? "#fff" : "#0a0c49"
                      }
                  },
                  containedPrimary: {
                      color: "#fff"
                  }
                }  
              },
            MuiStepLabel: {
                styleOverrides: {
                    label: {
                        backgroundColor: theme.palette.secondary.main,
                        // color: theme.palette.primary.main,
                        padding: "10px 16px",
                        borderRadius: 10,
                        ":active": {
                            backgroundColor: "#1a2c48"
                        }
                        // '::before': {
                        //     content: `''`,
                        //     position: "absolute",
                        //     left: 370,
                        //     height:0,
                        //     width:0,
                        //     color:"#fff",
                        //     backgroundColor: "transparent",
                        //     borderTop: "10px solid transparent",
                        //     borderBottom: "10px solid transparent",
                        //     borderLeft: "10px solid transparent",
                        //     borderRight: "10px solid #0E213E",
                        // }
                    },
                    // active: {
                    //     backgroundColor: "#fff",
                    //     color: "#000"
                    // }
                }
            },
            
        }
    })

    return theme;
}

export default useTheme;