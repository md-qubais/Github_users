import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [githubuser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  //request and loading
  const [requests,setRequests]=useState(0);
  const [isloading,setIsLoading]=useState(false);
  //errors
  const [error,setError]=useState({show:false,msg:""})

  const searchGithubUser= async(user)=>{
    setIsLoading(true);
    const response=await axios(`${rootUrl}/users/${user}`).
    catch(err=>console.log(err));
    if(response){
      setGithubUser(response.data)
      //here below we cannot write githubuser because its async function
      //and githubuser wont update value in async function when setGithubUser fired
      const {login,followers_url}=response.data;
      //below repos
      // https://api.github.com/users/john-smilga/repos?per_page=100
      //below followers
      // https://api.github.com/users/john-smilga/followers
     
      axios(`${rootUrl}/users/${login}/repos?per_page=100`).then((resp)=>{
        setRepos(resp.data);
      })
      axios(`${followers_url}?per_page=100`).then((resp)=>{
        setFollowers(resp.data);
      })
    }else{
      toggleError(true,"there is no user with that name!")
    }
    checkRequests();
    setIsLoading(false);
  }

  const toggleError=(show,msg)=>{
    setError({show,msg});
  }
  const checkRequests=()=>{
    axios(`${rootUrl}/rate_limit`).then(({data})=>{
      let {rate:{remaining}}=data;
      setRequests(remaining);
      if(remaining === 0){
        toggleError(true,"sorry, you have exceeded your hourly rate limit!")
      }
    }).catch((err)=>{
      console.log(err);
    })
  }

  useEffect(checkRequests,[])
  return (
    <GithubContext.Provider value={{ githubuser, repos, followers ,requests,error ,searchGithubUser ,isloading}}>
      {children}
    </GithubContext.Provider>
  );
};

export { GithubContext, GithubProvider };
