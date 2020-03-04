const gmaps = require("../services/gmaps");

module.exports = function () {
    this.onUpdate = (ctx) => {
        if (ctx.update.message.text == "meals") {
            ctx.reply("Directions");

            gmaps.getDirections("Stuttgart DHBW Rotebühlplatz", "Gerber Stuttgart")
                .then(data => {
                    // console.log(data)
                    /*  console.log(data.routes[0].legs[0])
                      const distance = data.routes[0].legs[0].distance.text
                      const duration = data.routes[0].legs[0].duration.text
                      const steps = data.routes[0].legs[0].steps.map(step => {
                          return step.html_instructions
                      })
                      console.log(steps)*/
                    console.log("return from getDirections", data)
                    ctx.reply(data);
                });
        }

    }
    return this;
}

/* else if (ctx.update.message.text == "places") {
          /*  gplaces.getPlaceById(3).then((answer)=>{
                console.log(`answer is ${answer}`);
                ctx.reply(answer);
            }).catch((err)=>{
                ctx.reply("There has been an error, sorry");
            });
        }*/
/*   };
};*/
