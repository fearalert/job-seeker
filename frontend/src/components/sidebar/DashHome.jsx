import { Container, Typography, Grid, Card, CardContent, CardActions, Button } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SearchIcon from '@mui/icons-material/Search';

// eslint-disable-next-line react/prop-types
const DashboardCard = ({ Icon, title, text, buttonLabel, iconColor, onButtonClick }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '12px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease-in-out',
        paddingX: '12px',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
        },
      }}
    >
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Icon sx={{ fontSize: 50, color: iconColor }} />
        <Typography
          variant="h6"
          color="primary.main"
          sx={{ marginTop: 2, fontWeight: 600 }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: 'center' }}
        >
          {text}
        </Typography>
      </CardContent>
      <CardActions sx={{ width: '100%' }}>
        <Button
          variant='contained'
          color='primary.main'
          fullWidth
          sx={{ padding: '10px', textTransform: 'none' }}
          onClick={onButtonClick}
        >
          {buttonLabel}
        </Button>
      </CardActions>
    </Card>
  );
};

const Dashboard = () => {
  const cardData = [
    {
      icon: WorkIcon,
      title: 'New Jobs',
      text: '5 Jobs available',
      buttonLabel: 'View Jobs',
      buttonColor: 'contained',
      iconColor: 'primary.main',
      onButtonClick: () => console.log('Viewing Jobs'),
    },
    {
      icon: BookmarkIcon,
      title: 'Saved Jobs',
      text: '3 Jobs saved',
      buttonLabel: 'View Saved',
      buttonColor: 'outlined',
      iconColor: 'secondary.main',
      onButtonClick: () => console.log('Viewing Saved Jobs'),
    },
    {
      icon: ScheduleIcon,
      title: 'Pending Applications',
      text: '2 Pending',
      buttonLabel: 'Check Status',
      buttonColor: 'contained',
      iconColor: 'tertiary.main',
      onButtonClick: () => console.log('Checking Status'),
    },
    {
      icon: SearchIcon,
      title: 'Search Jobs',
      text: 'Find your next job',
      buttonLabel: 'Start Searching',
      buttonColor: 'contained',
      iconColor: 'primary.main',
      onButtonClick: () => console.log('Starting Search'),
    },
  ];

  return (
    <Container sx={{ mt:4, py:2 }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        color="primary.main"
        sx={{
          fontWeight: 700,
        }}
      >
        Welcome to Your Dashboard
      </Typography>
      <Grid container spacing={3}>
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <DashboardCard
              Icon={card.icon}
              title={card.title}
              text={card.text}
              buttonLabel={card.buttonLabel}
              buttonColor={card.buttonColor}
              iconColor={card.iconColor}
              onButtonClick={card.onButtonClick}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
