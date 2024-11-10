import Hero from "../../components/home/Hero";
import Niches from "../../components/home/Niches";
import Working from "../../components/home/Working";
import { Box, Container } from "@mui/material";

const HomePage = () => {
  return (
    <Box sx={{ overflowX: 'hidden' }}>
      <Container>
        <Hero />
        <Niches />
        <Working />
      </Container>
    </Box>
  );
};

export default HomePage;
