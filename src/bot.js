// One more thing to note instead of using node ./src/bot.js we can use npm run start (as we included ourselves in package.json)
//similiar thing to note instead of using nodemon ./src/bot.js we can use npm run dev (as we included ourselves in package.json)


// what it is will do is it will oad all the environment variables that are inside .env file 
require('dotenv').config();

//Client is a class that allows us to interact with the discord api and actually used to create instance of class which we be doing using Client
const {Client,WebhookClient} = require('discord.js')

// so we created client as object(instance) of class
const client = new Client({
    partials: ['MESSAGE', 'REACTION']
});

const webhookClient = new WebhookClient(
    process.env.WEBHOOK_ID,
    process.env.WEBHOOK_TOKEN,
  );

const PREFIX = "$";

//ready-Emitted when the client becomes ready to start working.
client.on('ready',()=>{
    console.log(`${client.user.tag} or ${client.user.username} has logged in.`)
})

//message-Emitted whenever a message is created.
client.on('message', async (message)=>{
//console.log(`[${message.author.tag}]: ${message.content}`);

if(message.content === 'hello')
{
    // if you want to reply with your user tag name
    //message.reply("hello");

    // if u don't want with user tag then we use
    if(message.author.bot==true)return;  // we used this because then hello will run infinitely so to avoid that we make program see that bot is user sending message 
     message.channel.send("hello");

    
 }

 if(message.content.startsWith(PREFIX)){
    const [CMD_NAME,...args] = message.content
    .trim()
    .substring(PREFIX.length)
    .split(/\s+/)
    //console.log(CMD_NAME);
  if(CMD_NAME === 'kick')
  {

   if(!message.member.hasPermission('KICK_MEMBERS'))
   return message.reply('You do not have permissions to use that command'); 
   if(args.length === 0) return message.reply('Please provide an ID');
   const member = message.guild.members.cache.get(args[0]);
   if(member)
   {
       member
       .kick()
       .then((member) => message.channel.send(`${member} was kicked`))
       .catch((err) => message.channel.send('I do not have permissions to kick that user:'))
       //message.channel.send('Kicked the user');
   }
   else{
       message.channel.send('That member was not found');
   }
    
  }

  else if(CMD_NAME ==='ban')
  {
    if(!message.member.hasPermission('BAN_MEMBERS'))
    return message.reply('You do not have permissions to use that command');

    if(args.length === 0) return message.reply("Please provide an ID");
      //message.channel.send("Banned the user");
     try{
      const user = await message.guild.members.ban(args[0]);
      //console.log(user);
      message.channel.send('User was banned successfully'); 
    } catch(err){
         console.log(err)
         message.channel.send('An error occured, Either I do not have permissions or the user was not found');
     }
      
  }
  else if(CMD_NAME === 'announce')
  {
      console.log(args);
      const msg = args.join(' ');
      console.log(msg);
      webhookClient.send(msg);
  }
}
})

client.on('messageReactionAdd', (reaction, user) => {
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    if (reaction.message.id === '859370648236589076') {
      switch (name) {
        case '🍎':
          member.roles.add('859334284874350592');
          break;
        case '🍌':
          member.roles.add('859334374389317652');
          break;
        case '🍇':
          member.roles.add('859334447996338206');
          break;
        case '🍑':
          member.roles.add('859334571354751006');
          break;
      }
    }
  });
  
  client.on('messageReactionRemove', (reaction, user) => {
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    if (reaction.message.id === '859370648236589076') {
      switch (name) {
        case '🍎':
          member.roles.remove('859334284874350592');
          break;
        case '🍌':
          member.roles.remove('859334374389317652');
          break;
        case '🍇':
          member.roles.remove('859334447996338206');
          break;
        case '🍑':
          member.roles.remove('859334571354751006');
          break;
      }
    }
  });

//to make bot login
client.login(process.env.DISCORDJS_BOT_TOKEN)
