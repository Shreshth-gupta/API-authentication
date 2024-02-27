import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "jackbauer";
const yourPassword = "IAmTheBest";
const yourAPIKey = "7a3434a1-d169-4e82-baaf-043b6a3261b7";
const yourBearerToken = "f0fd52a4-342d-466b-abab-43a22f60c4bf";
app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
  const response = await axios.get(API_URL+"random");
  const result = response.data;
  res.render("index.ejs",{content: JSON.stringify(result)});
});

app.get("/basicAuth", (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
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
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.

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
