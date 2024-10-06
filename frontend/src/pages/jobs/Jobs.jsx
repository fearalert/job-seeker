import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAllJobsError, fetchJobs } from "../../store/slices/jobSlice";
import {
  Container,
  TextField,
  Button,
  Select,
  MenuItem,
  Paper,
  Typography,
  Box,
  CircularProgress,
  FormControl,
  Slider,
} from "@mui/material";
import { Link } from "react-router-dom";
import { theme } from "../../themes/theme";

const Jobs = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("");
  const [salaryRange, setSalaryRange] = useState([0, 10000000]);

  const { jobs, loading, error } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobs({ city: "", niche: "", searchKeyword: "" }));

    if (error) {
      toast.error(error);
      dispatch(clearAllJobsError());
    }
  }, [dispatch, error]);

  const cities = [...new Set(jobs.map((job) => job.location))];
  const niches = [...new Set(jobs.map((job) => job.jobNiche))];

  const filteredJobs = jobs.filter((job) => {
    const salary = parseInt(job.salary, 10);
    const matchesCity = selectedCity ? job.location === selectedCity : true;
    const matchesNiche = selectedNiche ? job.jobNiche === selectedNiche : true;
    const matchesSearch = searchKeyword
      ? job.jobTitle.toLowerCase().includes(searchKeyword.toLowerCase())
      : true;
    const matchesSalary = salary >= salaryRange[0] && salary <= salaryRange[1];

    return matchesCity && matchesNiche && matchesSearch && matchesSalary;
  });

  const handleSearch = (e) => {
    e.preventDefault();
    toast.success("Search submitted");
  };

  const handleSalaryChange = (event, newValue) => {
    setSalaryRange(newValue);
  };

  return (
    <>
      {loading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Container sx={{ py: 4 }}>
          <form onSubmit={handleSearch}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
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
                sx={{ height: "56px", minWidth: "100px" }}
              >
                Find Job
              </Button>
            </Box>
          </form>

          <Box sx={{ display: "flex", gap: 4, flexDirection: "row", [theme.breakpoints.down("md")]: { flexDirection: "column" }, }}>
            <Box sx={{ flex: 1}}>
              <FormControl fullWidth>
                <Select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
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
                  value={selectedNiche}
                  onChange={(e) => setSelectedNiche(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="">
                    <em>Filter By Niche</em>
                  </MenuItem>
                  {niches.map((niche, index) => (
                    <MenuItem value={niche} key={index}>
                      {niche}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box sx={{ mt: 4 }}>
                <Typography gutterBottom>Filter By Salary (NRS.)</Typography>
                <Slider
                  value={salaryRange}
                  onChange={handleSalaryChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={300000}
                  step={1000}
                  marks={[
                    { value: 0, label: "0" },
                    { value: 50000, label: "50k" },
                    { value: 100000, label: "100k" },
                    { value: 150000, label: "150k" },
                    { value: 200000, label: "200k" },
                    { value: 250000, label: "250k" },
                    { value: 300000, label: "300k" },
                    { value: 300000, label: "300k" },
                  ]}
                />
              </Box>
            </Box>

            <Box sx={{ flex: 3 }}>
              <Box>
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <Paper key={job._id} sx={{ p: 2, mb: 2 }}>
                      <Typography variant="h5" sx={{ mb: 1, color: "primary.main" }}>
                        {job.jobTitle}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Sector:</strong> {job.organizationType}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Location:</strong> {job.location}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Salary:</strong> Rs. {job.salary}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Posted On:</strong> {job.jobPostedOn.substring(0, 10)}
                      </Typography>
                      <Box
                        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                      >
                        <Typography variant="body2" color="primary">
                          {job.hiringMultipleCandidates ? "Hiring Multiple Candidates" : "Hiring"}
                        </Typography>
                        <Link to={`/post/application/${job._id}`} className="btn">
                          <Button variant="contained" size="small">
                            Apply Now
                          </Button>
                        </Link>
                      </Box>
                    </Paper>
                  ))
                ) : (
                  <Typography>No Jobs Found</Typography>
                )}
              </Box>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
};

export default Jobs;
