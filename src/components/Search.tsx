import React, { useState } from 'react';

function GitHubUserSearch() {
  const [query, setQuery] = useState('');
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);

  const handleSearch = async () => {
    if (query.trim() !== '') {
      try {
        const userResponse = await fetch(`https://api.github.com/users/${query}`);
        const repoResponse = await fetch(`https://api.github.com/users/${query}/repos`);

        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUser(userData);
        } else {
          console.error('Error fetching user data:', userResponse.statusText);
        }

        if (repoResponse.ok) {
          const repoData = await repoResponse.json();
          setRepos(repoData);
        } else {
          console.error('Error fetching user repos:', repoResponse.statusText);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  };

  return (
    <div className='page-container'>
      <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter GitHub username"
      />

      <button onClick={handleSearch}>Search</button>
      </div>
     
     <div className='user-Container'>
     {user && (
        <div>
          <h1>{user.name}</h1>
          <p><a href={user.html_url}>{user.login}</a></p>
          <p>Joined: {user.created_at}</p>
          <img src={user.avatar_url} alt={user.login} />
          <p>Public repos: {user.public_repos}</p>
          <p>Bio: {user.bio}</p>
          <p>Location: {user.location}</p>
          <p>Followers: {user.followers}</p>
          <p>Following: {user.following}</p>
        </div>
      )}

     </div>
      

      <div className='res-container'>
      {repos.length > 0 && (
        <div>
          <h2>Repositories:</h2>
          <ul>
            {repos.map(repo => (
              <li key={repo.id}>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  {repo.name}
                </a>
                <p>{repo.description}</p>
                <p>Folks: {repo.forks_count}</p>
                <p>Star: {repo.stargazers_count}</p>
                <p>Language: {repo.language}</p>
                <p>Size: {repo.size}kb</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      </div>
      
          </div>
  );
}

export default GitHubUserSearch;
