import { Box } from "@mui/material";
import Header from "./Header";
import { useRouter } from "next/router";

const Layout = (props: any) => {
  const router = useRouter();
  return (
    <Box sx={{ height: "100vh" }}>
      <Header />
      <Box
        sx={{
          background:
            router.pathname === "/challenges"
              ? "url(/images/challenge-background.svg)"
              : "linear-gradient(180deg, #090F71 -69.76%, #0B091F 100%)",
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default Layout;
