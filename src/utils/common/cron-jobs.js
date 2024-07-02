const cron = require('node-cron');
const mailsender=require("../../config/email-config");
const {TicketRepository}=require('../../repositories');
const { ServerConfig } = require('../../config');
const {Ticket}=require('../../models')


const ticketRepo = new TicketRepository();

function mailerCron(){

    cron.schedule('*/2 * * * *', async ()=>{
        console.log("Executing Cron Again");
        const pendings=await ticketRepo.getPendingTickets();

        pendings.forEach(pending =>{

            const mailData={
                from:ServerConfig.GMAIL_EMAIL,
                to:pending.recipientEmail,
                subject:pending.subject,
                text:pending.content
            }

            mailsender.sendMail(mailData,async (err,data)=>{
               
                
                if(err){
                    console.log(err);
                }else{
                 
                //     const id={id:pending.id} 
                // const savedNotification= await ticketRepo.get(id);
                // console.log(savedNotification);

                // savedNotification.status="SUCCESS";
                // await savedNotification.save();

                const savedNotification=await Ticket.findOne({where:{id:pending.id}});
                console.log(savedNotification);
                savedNotification.status="SUCCESS";
                await savedNotification.save();

                }
            })

        
        })
    })
}

module.exports={
    mailerCron
}