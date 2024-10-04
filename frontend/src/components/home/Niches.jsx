import { Box, Typography, Card, CardContent, Grid } from '@mui/material';

const jobs = [
  {
    id: 1,
    service: "Java Developer",
    description: "Responsible for developing and maintaining Java-based applications, ensuring high performance and scalability."
  },
  {
    id: 2,
    service: "Sales Manager",
    description: "Leads a sales team, develops strategies to meet sales targets, and fosters client relationships."
  },
  {
    id: 3,
    service: "UI/UX Designer",
    description: "Designs intuitive user interfaces and ensures a seamless user experience across digital platforms."
  },
  {
    id: 4,
    service: "Data Analyst",
    description: "Analyzes large datasets to identify trends, generate insights, and support data-driven decision-making."
  },
  {
    id: 5,
    service: "Marketing Coordinator",
    description: "Coordinates marketing campaigns, manages social media channels, and assists in promotional activities."
  },
  {
    id: 6,
    service: "Project Manager",
    description: "Oversees project development from inception to completion, ensuring timelines and goals are met."
  },
  {
    id: 7,
    service: "Software Engineer",
    description: "Designs, develops, tests, and maintains software solutions using modern programming languages."
  },
  {
    id: 8,
    service: "Customer Support Specialist",
    description: "Provides technical and non-technical support to customers, ensuring their issues are resolved promptly."
  }
];

const JobList = () => {
  return (
    <Box sx={{ py: 6 }}>
      <Typography variant="h4" align="center" gutterBottom>Available Jobs</Typography>
      <Grid container spacing={3}>
        {jobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{job.service}</Typography>
                <Typography variant="body2" color="textSecondary">{job.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default JobList;
