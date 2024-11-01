using System.Net;
using System.Net.Mail;

namespace vszk.Services
{
    public interface IEmailService
    {
        Task SendEmailAsync(string email, string subject, string message);
    }

    public class EmailService : IEmailService
    {
        public async Task SendEmailAsync(string email, string subject, string message)
        {
            var smtpClient = new SmtpClient("smtp.mailersend.net")
            {
                Port = 587,
                Credentials = new NetworkCredential(
                    "MS_60u4u8@trial-neqvygm8o9z40p7w.mlsender.net",
                    "QYUZh2pS769qWlvB"
                ),
                EnableSsl = true,
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress("MS_60u4u8@trial-neqvygm8o9z40p7w.mlsender.net"), // Replace with a valid email address
                Subject = subject,
                Body = message,
                IsBodyHtml = true,
            };
            mailMessage.To.Add(email);

            await smtpClient.SendMailAsync(mailMessage);
        }
    }
}
