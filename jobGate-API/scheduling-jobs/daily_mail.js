const schedule = require("node-schedule")
const mailController = require("../controllers/mail_controller")
const subscriberModel = require("../models/subscriber_model")

schedule.scheduleJob('0 0 * * *',()=>{
    subscriberModel.find({}, (err, subscribers)=>{
        if(subscribers){
            
            subscribers.forEach(subscriber => {
                
                // console.log(subscriber.email)
                mailController(subscriber.email, "Welcome " + subscriber.email, 
                        `<h2>Hello ${subscriber.email}! </h2>
                        <p>We're glad to have you on board at ${subscriber.email}. </p>
                        <p>We're glad to have you on board at JobGate.</p>
                        <p>Find your dream job at JobGate, with 1k job posted everyday.</p>
                        <table class="action" align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation" style="box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; position: relative; -premailer-cellpadding: 0; -premailer-cellspacing: 0; -premailer-width: 100%; margin: 30px auto; padding: 0; text-align: center; width: 100%;">
                        <tr>
                        <td style="box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; position: relative;">
                        <a align="center" href="http://localhost:4200" class="button button-primary" target="_blank" rel="noopener" style="box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; position: relative; -webkit-text-size-adjust: none; border-radius: 4px; color: #fff; display: inline-block; overflow: hidden; text-decoration: none; background-color: #2d3748; border-bottom: 8px solid #2d3748; border-left: 18px solid #2d3748; border-right: 18px solid #2d3748; border-top: 8px solid #2d3748;">Visit jobGate</a>
                        </td>
                        </tr>
                        </table>`
                    )
              })
        }
    })
    
})