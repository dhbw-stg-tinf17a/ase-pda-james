module.exports = (db, oAuth2Client) => {
  this.onUpdate = (ctx, waRes) => {
    if (waRes.generic[0].text==="start") {
      ctx.reply("hallo welt");
    }
  };
  return this;
};
