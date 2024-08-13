import cron from "node-cron";
import { sendEmail } from "../utils/sendEmail.js";
import { Job } from "../models/jobSchema.js";
import { User } from "../models/userSchema.js";

export const newsLetterCron = () => {
    cron.schedule("*/1 * * * *", async () => {
        console.log("Running News Letter Cron Automation");
        const jobs = await Job.find({ newsLettersSent: false });
        for (const job of jobs) {
          try {
            const filteredUsers = await User.find({
              $or: [
                { "niches.firstNiche": job.jobNiche },
                { "niches.secondNiche": job.jobNiche },
                { "niches.thirdNiche": job.jobNiche },
                { "niches.fourthNiche": job.jobNiche },
              ],
            });
            for (const user of filteredUsers) {
              const subject = `Hot Job Alert: ${job.jobTitle} in ${job.organizationName} Available Now`;
              const message = `Hello ${user.name},\n\nExciting news! A new job that matches your profile has just been posted.
              The role is for a ${job.jobTitle} at ${job.organizationName}, and they are looking to hire as soon as possible.
              \n\nJob Details:\n- **Position:** ${job.jobTitle}\n- **Company:** ${job.organizationName}\n- **Location:** ${job.location}
              \n- **Salary:** ${job.salary}\n\nAct quickly—opportunities like this don't last long. \n\n
              We're here to assist you in your job search. Best of luck!\n\nBest Regards,\nThe Jobseverywhere Team`;
              sendEmail({
                email: user.email,
                subject,
                message,
              });
            }
            job.newsLettersSent = true;
            await job.save();
          } catch (error) {
            console.log("ERROR IN NODE CRON CATCH BLOCK");
            return next(console.error(error || "Some error in Cron."));
          }
        }
    });
}