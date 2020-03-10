module.exports = function() {
  this.getTodoList = () => {
    return new Promise((resolve, reject)=>{
      // implement API calls
      resolve("not implemented");
    });
  };
  this.authorizeUser = (ctx) => {
    const base = "https://login.microsoftonline.com/common/oauth2/v2.0/authorize";
    const client = `?client_id=${process.env.MS_TODO_CLIENT_ID}`;
    const scope = "&scope=user.read%20";
    const responseType = "&response_type=code";
    const redirectUri = "&redirect_uri=http://localhost:8080/mstodo";
    ctx.reply(base + client + scope + responseType + redirectUri);
  };
  return this;
};
