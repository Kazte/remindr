import DiscordProvider from 'next-auth/providers/discord';


const scopes = ['identify', 'email'];

export default DiscordProvider({
  name: 'Discord',
  clientId: process.env.DISCORD_CLIENT_ID ?? '',
  clientSecret: process.env.DISCORD_CLIENT_SECRET ?? '',
  authorization: {params: {scope: scopes.join(' ')}},
});