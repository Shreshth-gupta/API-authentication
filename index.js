import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

const yourUsername = "jackbauer";
const yourPassword = "IAmTheBest";
const yourAPIKey = "7a3434a1-d169-4e82-baaf-043b6a3261b7";
const yourBearerToken = "f0fd52a4-342d-466b-abab-43a22f60c4bf";
app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  const response = await axios.get(API_URL+"random");
  const result = response.data;
  res.render("index.ejs",{content: JSON.stringify(result)});
});

app.get("/basicAuth", (req, res) => {
  axios.get(API_URL+"all?page=2", {
    auth: {
      username: yourUsername,
      password: yourPassword,
    },
  })
  .then(response => {
    console.log(response.data);
    const result=response.data; 
    res.render("index.ejs",{content: JSON.stringify(result)});
  })
  .catch(error => {
    console.error(error);
  });
  

});

app.get("/apiKey", (req, res) => {

  axios.get(API_URL+"filter?score=5&apiKey="+yourAPIKey, {})
  .then(response => {
    console.log(response.data);
    const result=response.data; 
    res.render("index.ejs",{content: JSON.stringify(result)});
  })
  .catch(error => {
    console.error(error);
  });
  
});

app.get("/bearerToken", (req, res) => {
  axios.get(API_URL + "secrets/42", {
    headers: { 
      Authorization: `Bearer ${yourBearerToken}` 
    },
  })
  .then(response => {
    console.log(response.data);
    const result=response.data; 
    res.render("index.ejs",{content: JSON.stringify(result)});
  })
  .catch(error => {
    console.error(error);
  });
  
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
