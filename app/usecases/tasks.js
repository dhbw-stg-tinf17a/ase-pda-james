module.exports = () => {
  this.onUpdate = (ctx, waRes)=>{
    if (waRes.generic[0].text === "tasks_show") {
      const inlineKeyboardMarkup = {inline_keyboard: [[]]};

      const tasks = ["Antwort A", "Antwort B", "Antwort C"];
      let i = 0;
      tasks.forEach((task)=>{
        inlineKeyboardMarkup.inline_keyboard[0].push({
          text: task,
          callback_data: "tasks_" + i,
          // callback_data must start with '<usecase-name>_'
        });
        i++;
      });
      ctx.reply("Frage?",
          {reply_markup: inlineKeyboardMarkup});
    }
  };

  this.onCallbackQuery = (ctx)=>{
    const data = ctx.callbackQuery.data.split("_")[1];
    console.log("i got it: " + data);
    ctx.reply("Danke");
  };
  return this;
};
