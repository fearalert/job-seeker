import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAllJobsError, fetchJobs } from "../../store/slices/jobSlice";
import { Container, TextField, Button, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel, Select, MenuItem, Paper, Typography, Box, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { theme } from "../../themes/theme";

const Jobs = () => {
  const [city, setCity] = useState('');
  const [niche, setNiche] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const { loading, error } = useSelector((state) => state.jobReducer);

  const handleCityChange = (city) => {
    setCity(city);
    setSelectedCity(city);
  };

  const handleNicheChange = (niche) => {
    setNiche(niche);
    setSelectedNiche(niche);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobsError());
    }
    dispatch(fetchJobs(city, niche, searchKeyword));
    toast.success("Success");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, error, city, niche]);

  const handleSearch = (e) => {
    e.preventDefault(); 
    dispatch(fetchJobs(city, niche, searchKeyword));
    toast.success("Search submitted");
  };

  const cities = ["Kathmandu", "Pokhara", "Lalitpur", "Bhaktapur", "Biratnagar", "Birgunj", "Dharan", "Butwal", "Nepalgunj", "Hetauda", "Janakpur", "Dhangadhi", "Itahari", "Ghorahi", "Tulsipur", "Bharatpur", "Bhairahawa", "Kirtipur", "Rajbiraj", "Damak"];
  
  const nichesArray = ["Software Development", "Web Development", "Cybersecurity", "Data Science", "Artificial Intelligence", "Cloud Computing", "DevOps", "Mobile App Development", "Blockchain", "Database Administration", "Network Administration", "UI/UX Design", "Game Development", "IoT (Internet of Things)", "Big Data", "Machine Learning", "IT Project Management", "IT Support and Helpdesk", "Systems Administration", "IT Consulting"];

  const jobsDummy = [
      {
        "_id": "1",
        "jobTitle": "Software Engineer",
        "organizationType": "Tech Company",
        "location": "Kathmandu",
        "salary": 60000,
        "jobPostedOn": "2024-10-01",
        "hiringMultipleCandidates": true
      },
      {
        "_id": "2",
        "jobTitle": "Web Developer",
        "organizationType": "Web Agency",
        "location": "Pokhara",
        "salary": 50000,
        "jobPostedOn": "2024-10-02",
        "hiringMultipleCandidates": false
      }
    ];

    const filteredJobs = jobsDummy.filter(job => {
      const searchTerm = searchKeyword.toLowerCase();
      
      return (
        job.jobTitle.toLowerCase().includes(searchTerm) || 
        job.location.toLowerCase().includes(searchTerm) || 
        job.organizationType.toLowerCase().includes(searchTerm)
      );
    });
    
  
  return (
    <>
      {
        loading ? <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box> : (
          <Container sx={{ py: 4 }}>
             <form onSubmit={handleSearch}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                <TextField
                  label="Search for Jobs"
                  variant="outlined"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  fullWidth
                />
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ height: '56px', minWidth: '100px' }}
                >
                  Find Job
                </Button>
              </Box>
            </form>

            <Box sx={{ display: 'flex', gap: 4 }}>
            <Paper sx={{ p: 2, flex: 1, [theme.breakpoints.down('md')]: {
                display: 'none',
              }, }}>
                <Box sx={{ mb: 4 }}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Filter Job By City</FormLabel>
                    <RadioGroup
                      aria-label="city"
                      value={selectedCity}
                      onChange={(e) => handleCityChange(e.target.value)}
                    >
                      {cities.map((city, index) => (
                        <FormControlLabel
                          key={index}
                          value={city}
                          control={<Radio />}
                          label={city}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Box>
              </Paper>

              <Box sx={{ flex: 3 }}>
                <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 2 }}>
                  <FormControl fullWidth>
                    <Select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      displayEmpty
                    >
                      <MenuItem value="">
                        <em>Filter By City</em>
                      </MenuItem>
                      {cities.map((city, index) => (
                        <MenuItem value={city} key={index}>
                          {city}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <Select
                      value={niche}
                      onChange={(e) => setNiche(e.target.value)}
                      displayEmpty
                    >
                      <MenuItem value="">
                        <em>Filter By Niche</em>
                      </MenuItem>
                      {nichesArray.map((niche, index) => (
                        <MenuItem value={niche} key={index}>
                          {niche}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <Box>
              {filteredJobs.length > 0 ? filteredJobs.map((element) => (
                <Paper key={element._id} sx={{ p: 2, mb: 2 }}>
                  <Typography variant="h5" sx={{ mb: 1, color: 'primary.main' }}>
                    {element.jobTitle}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Sector:</strong> {element.organizationType}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Location:</strong> {element.location}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Salary:</strong> Rs. {element.salary}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Posted On:</strong> {element.jobPostedOn.substring(0, 10)}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="primary">
                      {element.hiringMultipleCandidates ? 'Hiring Multiple Candidates' : 'Hiring'}
                    </Typography>
                    <Link to={`/post/application/${element._id}`} className="btn">
                      <Button variant="contained" size="small">Apply Now</Button>
                    </Link>
                  </Box>
                </Paper>
              )) : <Typography>No Jobs Found</Typography>}
            </Box>
              </Box>
              <Paper sx={{ p: 2, flex: 1, [theme.breakpoints.down('md')]: {
                display: 'none',
              }, }}>
              <Box>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Filter Job By Niche</FormLabel>
                    <RadioGroup
                      aria-label="niche"
                      value={selectedNiche}
                      onChange={(e) => handleNicheChange(e.target.value)}
                    >
                      {nichesArray.map((niche, index) => (
                        <FormControlLabel
                          key={index}
                          value={niche}
                          control={<Radio />}
                          label={niche}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Box>
                </Paper>
            </Box>
          </Container>
        )
      }
    </>
  );
}

export default Jobs;
