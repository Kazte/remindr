import GitHubProvider from 'next-auth/providers/github';


const scopes = ['read:user', 'user:email'];

export default GitHubProvider({
  clientId: process.env.GITHUB_ID ?? '',
  clientSecret: process.env.GITHUB_SECRET ?? '',
  authorization: {params: {scope: scopes.join(' ')}},
});