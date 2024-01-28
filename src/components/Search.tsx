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

		<html lang="en">
			
			<body>
				<header>
					<nav>
						<ul>
							<input
									type="text"
									value={query}
									onChange={(e) => setQuery(e.target.value)}
									placeholder="Git username"
								/>
								<button onClick={handleSearch}>Search</button>

								<hr />
						</ul>
					</nav>
				</header>

				<div className='page-content'>

					<section className='user-section'>
						{user && (
							<div>
								<img src={user.avatar_url} alt={user.login} />
								<h1>{user.name}</h1>
								<h4><a href={user.html_url}>@{user.login}</a></h4>
								<p>{user.created_at}</p>
								<p>{user.bio}</p>
								<p>{user.location}</p>
								<div className='section-div'>
									<div className='stats'>
										<p>{user.public_repos} <span>REPOSITORY</span></p>
									</div>

									<div className='stats'>
										<p>{user.followers} <span>FOLLOWERS</span></p>
									</div>

									<div className='stats'>
										<p>{user.following} <span>FOLLOWING</span></p>
									</div>

								</div>
							</div>
						)}
					</section>




					<section className='repo-section'>
						{repos.length > 0 && (
							<div>
								<h2>Repositories</h2>
								<ul>
									{repos.map(repo => (
										<div key={repo.id}>
											<div className='repo-container'>
												<a href={repo.html_url} target="_blank" rel="noopener noreferrer">
												
												<div className='repo-box'>
													<div className='repo-info'>
														<h4>{repo.name}</h4>
														<p>{repo.description}</p>
														<div>
															<p>Folks: {repo.forks_count}</p>
															<p>Star: {repo.stargazers_count}</p>
															<p>Language: {repo.language}</p>
															<p>Size: {repo.size}kb</p>
														</div>
													</div>
												</div>

												
											
												</a>
											
											</div>
											
											
										</div>
									))}
								</ul>
							</div>
						)}

					</section>

				</div>

			</body>
		</html>
	);
}

export default GitHubUserSearch;
