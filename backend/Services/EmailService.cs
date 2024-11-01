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

    var personalizedMessage = $@"
        <html>
        <head>
            <style>
                body {{
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background-color: #e5e7eb;
                    color: #1f2937;
                    margin: 0;
                    padding: 0;
                }}
                .container {{
                    width: 100%;
                    max-width: 600px;
                    margin: 20px auto;
                    background-color: #ffffff;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }}
                .header {{
                    background-color: #1f2937;
                    color: white;
                    padding: 20px;
                    text-align: center;
                    font-size: 2em;
                    font-weight: bold;
                }}
                .content {{
                    padding: 20px;
                    line-height: 1.6;
                    font-size: 0.95em;
                    color: #374151;
                }}
                .subheader {{
                    font-size: 1.25em;
                    color: #1f2937;
                    margin-top: 10px;
                    font-weight: bold;
                }}
                .software-list, .feature-list {{
                    margin: 15px 0;
                    padding-left: 15px;
                }}
                .feature-list li, .software-list li {{
                    margin: 8px 0;
                }}
                .button-container {{
                    text-align: center;
                    margin-top: 20px;
                }}
                .button {{
                    display: inline-block;
                    padding: 12px 24px;
                    font-size: 16px;
                    color: #ffffff;
                    background-color: #1f2937;
                    text-decoration: none;
                    border-radius: 5px;
                }}
                .button:hover {{
                    background-color: #374151;
                }}
                .footer {{
                    background-color: #f9fafb;
                    padding: 15px 20px;
                    text-align: center;
                    font-size: 0.9em;
                    color: #6b7280;
                }}
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    Üdvözöljük a Szoftverkereső Hírlevelében!
                </div>
                <div class='content'>
                    <p class='subheader'>Kedves látogató,</p>
                    <p>Örömmel mutatjuk be a legújabb funkciókat és szoftvereket, amelyekkel még könnyebbé és hatékonyabbá válik a keresés!</p>
                    
                    <div class='subheader'>Új Funkciók</div>
                    <ul class='feature-list'>
                        <li>Gyorsabb keresés valós idejű szűréssel</li>
                        <li>Testreszabható ajánlások és értesítések</li>
                        <li>Speciális kategorizálás és címkék</li>
                    </ul>

                    <div class='subheader'>Újonnan Hozzáadott Szoftverek</div>
                    <ul class='software-list'>
                        <li>Szoftver A - fejlett elemzési funkciók</li>
                        <li>Szoftver B - felhőalapú integrációk</li>
                        <li>Szoftver C - automatizált feladatkezelés</li>
                    </ul>
                    
                    <div class='button-container'>
                        <a href='http://localhost:3000' class='button' style='color: white;'>Próbálja ki most</a>                    </div>
                </div>
                <div class='footer'>
                    <p>Köszönjük, hogy a szoftverkereső platformunkat választotta!</p>
                    <p>Üdvözlettel,</p>
                    <p>A fejlesztők</p>
                </div>
            </div>
        </body>
        </html>";

    var mailMessage = new MailMessage
    {
        From = new MailAddress("MS_60u4u8@trial-neqvygm8o9z40p7w.mlsender.net"), 
        Subject = subject,
        Body = personalizedMessage,
        IsBodyHtml = true, 
    };
    mailMessage.To.Add(email);

    await smtpClient.SendMailAsync(mailMessage);
}

    }
}
