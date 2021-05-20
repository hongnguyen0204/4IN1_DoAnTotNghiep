package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.models.Account;
import com.bezkoder.springjwt.models.Message;
import com.bezkoder.springjwt.models.Notification;
import com.bezkoder.springjwt.repository.AccRepository;
import com.bezkoder.springjwt.repository.NotificationRepository;
import com.bezkoder.springjwt.repository.SuKienRepository;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.util.List;

@RestController
@CrossOrigin(origins = "https://sukiendtu.edu.vn")
@RequestMapping(value = "/account")
public class AccController {
    @Autowired
    NotificationRepository notificationRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private AccRepository accRepository;

    @Autowired
    private SuKienRepository suKienRepository;

    @GetMapping("/getFullAcc")
    public List<Account> GetFullAcc() {
        return accRepository.findAll();
    }

    @GetMapping("/getnotification/{id}")
    public List<Notification> GetNotification(@PathVariable int id) {
        return notificationRepository.GetNotification(id);
    }

    @PutMapping("/ban/{id}")
    public void banTK(@PathVariable Integer id){
        Account acc =accRepository.findById(id).get();
        acc.setBan(true);
        accRepository.save(acc);
    }

    @PutMapping("/unban/{id}")
    public void unBanTK(@PathVariable Integer id){
        Account acc =accRepository.findById(id).get();
        acc.setBan(false);
        accRepository.save(acc);
    }

    @PutMapping("thongtincanhan/{id}")
    public void LuuThongTin(@PathVariable int id,@RequestBody Account account){
        Account acc = accRepository.findById(id).get();
        acc=account;
        acc.setIs_Update(true);
        accRepository.save(acc);
    }

    @GetMapping("/getAcc/{username}")
    public Account GetAcc(@PathVariable String username) {
        return accRepository.GetIF(username);
    }

    @GetMapping("/getBan/{username}")
    public Boolean Getban(@PathVariable String username) {
        return accRepository.GetBan(username);
    }

    @GetMapping("/getAccbyemail/{email}")
    public Account GetEmail(@PathVariable String email) {
        return accRepository.Getemail(email);
    }

    @GetMapping("/getAccToken/{token}")
    public Account GetAcctoken(@PathVariable String token) {
        return accRepository.findByToken(token);
    }

    @GetMapping("/getAccTokenEmail/{token}")
    public Boolean GetAcctokenEmail(@PathVariable String token) {
        int row = accRepository.findstatusbytoken(token);
        if(row == 0){
            return false;
        }else{
            return true;
        }
    }

    @PostMapping("/forgot_password/{email}")
    public void processForgotPassword(@PathVariable String email) throws UnsupportedEncodingException, MessagingException {
        String token = RandomString.make(30);
        Account account = accRepository.findByEmail(email);
        account.setReset_password_token(token);
        accRepository.save(account);
        String link = "https://sukiendtu.edu.vn" + "/doimatkhau/"+ token;
        sendEmailtoresetpassword(email,link);
        account.setPassword(account.getPassword());
        int i = 600;
        while (i>0){
            try {
                i--;
                Thread.sleep(1000L);
            }
            catch (InterruptedException e) {
            }
        }
        if(i==0){
            account.setReset_password_token("");
            accRepository.save(account);
        }
    }


    @PostMapping("/guilienlac")
    public String processsendmessage(@RequestBody Message ms) throws UnsupportedEncodingException, MessagingException {
        sendEmailMessage(ms);
        return "Gửi qua mail thành công";
    }

    @PostMapping("/xacthucemailbyusername/{username}")
    public void xacthucemailbyusername(@PathVariable String username) throws UnsupportedEncodingException, MessagingException {
        String token = RandomString.make(50);
        Account account = accRepository.findByusername(username);
        account.setVerification_email_token(token);
        accRepository.save(account);
        String link = "https://sukiendtu.edu.vn" + "/xacthucemail/"+ token;
        sendEmailtoverification(account.getEmail(),link);
        int i = 600;
        while (i>0){
            try {
                i--;
                Thread.sleep(1000L);
            }
            catch (InterruptedException e) {
            }
        }
        if(i==0){
            account.setVerification_email_token("");
            accRepository.save(account);
        }
    }

    @PostMapping("/xacthucemail/{email}")
    public void xacthucemail(@PathVariable String email) throws UnsupportedEncodingException, MessagingException {
        String token = RandomString.make(50);
        Account account = accRepository.findByEmail(email);
        account.setVerification_email_token(token);
        accRepository.save(account);
        String link = "https://sukiendtu.edu.vn" + "/xacthucemail/"+ token; //tạo ra đường dẫn có chứa token
        sendEmailtoverification(email,link);
        int i = 600;
        while (i>0){
            try {
                i--;
                Thread.sleep(1000L);
            }
            catch (InterruptedException e) {
            }
        }
        if(i==0){
            account.setVerification_email_token("");
            accRepository.save(account);
        }
    }

    public String sendEmailMessage(Message ms) throws UnsupportedEncodingException, MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom("shonepro123@gmail.com", "Người dùng phản hồi liên lạc");
        helper.setTo("shonepro123@gmail.com");

        String subject1 = "Người dùng phản hồi:";

        String content = "Tên: " + ms.getName() + "<br>" + "Email: " + ms.getEmail() + "<br>" + "Ngành: " + ms.getSubject() + "<br>" + "số điện thoại: " + ms.getSdt() + "<br>" + "Nội dung: " + ms.getLoinhan() + "<br>" ;

        helper.setSubject(subject1);

        helper.setText(content, true);

        mailSender.send(message);

        return "gửi thành công";
    }

    public void sendEmailtoresetpassword(String recipientEmail, String link) throws UnsupportedEncodingException, MessagingException {

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message);

            helper.setFrom("shonepro123@gmail.com", "Cập nhật lại mật khẩu");
            helper.setTo(recipientEmail);

            String subject = "Reset password:";

            String content ="<div class=\"\"><div class=\"aHl\"></div><div id=\":2v\" tabindex=\"-1\"></div><div id=\":2k\" class=\"ii gt\"><div id=\":2j\" class=\"a3s aiL msg6347430949454947394\"><u></u>\n" +
                    "\n" +
                    "  \n" +
                    "    \n" +
                    "    \n" +
                    "    \n" +
                    "\n" +
                    "  \n" +
                    "  <div bgcolor=\"#f1f1f1\" style=\"margin:0;padding:0;min-width:100%!important\">\n" +
                    "    <table width=\"100%\" bgcolor=\"#f1f1f1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n" +
                    "      <tbody><tr>\n" +
                    "        <td>\n" +
                    "          \n" +
                    "          <table bgcolor=\"#f1f1f1\" class=\"m_6347430949454947394content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width:90%;max-width:600px\">\n" +
                    "            <tbody><tr>\n" +
                    "              <td bgcolor=\"#f1f1f1\" class=\"m_6347430949454947394header\" style=\"padding:20px 30px\">\n" +
                    "                <table align=\"left\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n" +
                    "                  <tbody><tr>\n" +
                    "                    \n" +
                    "                  </tr>\n" +
                    "                </tbody></table>\n" +
                    "                \n" +
                    "                \n" +
                    "              </td>\n" +
                    "            </tr>\n" +
                    "            <tr>\n" +
                    "              <td>\n" +
                    "                <div>\n" +
                    "                  <img src=\"https://scontent-hkt1-2.xx.fbcdn.net/v/t1.15752-9/s2048x2048/184703038_1241668892941356_1988666661846089266_n.png?_nc_cat=111&ccb=1-3&_nc_sid=ae9488&_nc_ohc=p92KL1Lz-iAAX-7vULl&_nc_ht=scontent-hkt1-2.xx&tp=30&oh=aecdaf9795644d3971d1ab55f4ac406c&oe=60C75E85\" height=\"100%\" width=\"100%\" class=\"m_6347430949454947394emailImage CToWUd a6T\" style=\"height:auto\" tabindex=\"0\"><div class=\"a6S\" dir=\"ltr\" style=\"opacity: 0.01; left: 1004px; top: 349px;\"><div id=\":4t\" class=\"T-I J-J5-Ji aQv T-I-ax7 L3 a5q\" role=\"button\" tabindex=\"0\" aria-label=\"Tải xuống tệp đính kèm \" data-tooltip-class=\"a1V\" data-tooltip=\"Tải xuống\"><div class=\"akn\"><div class=\"aSK J-J5-Ji aYr\"></div></div></div></div>\n" +
                    "                </div>\n" +
                    "              </td>\n" +
                    "            </tr>\n" +
                    "            <tr>\n" +
                    "              <td class=\"m_6347430949454947394innerpadding\" bgcolor=\"#ffffff\" style=\"padding-top:20px;padding:30px\">\n" +
                    "                <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n" +
                    "                  <tbody><tr>\n" +
                    "                    <td class=\"m_6347430949454947394bodycopy\" style=\"color:#4a4a4a;font-family:Roboto,sans-serif;font-size:16px;line-height:26px;padding:10px 0\">Vui lòng nhấn vào bên dưới để đổi mật khẩu của bạn.<br>Lưu ý: Đường dẫn chỉ có hiệu lực trong 10 phút</td>\n" +
                    "                  </tr>\n" +
                    "                  <tr>\n" +
                    "                    \n" +
                    "                    <td class=\"m_6347430949454947394bodycopy\" style=\"color:#4a4a4a;font-family:Roboto,sans-serif;font-size:16px;line-height:26px;padding:10px 0\"><a href="+link+" style=\"font-style: oblique; color:blue;text-decoration:none\"><b>Đổi mật khẩu ngay!<b></a></td>\n" +
                    "                  </tr>\n" +
                    "                  <tr>\n" +
                    "                    <td class=\"m_6347430949454947394bodycopy\" style=\"color:#4a4a4a;font-family:Roboto,sans-serif;font-size:16px;line-height:26px;padding:10px 0\">Trân trọng cảm ơn !</td>\n" +
                    "                </tbody></table>\n" +
                    "              </td>\n" +
                    "            </tr>\n" +
                    "            <tr>\n" +
                    "              <td class=\"m_6347430949454947394footer\" bgcolor=\"#f1f1f1\" style=\"padding-top:10px!important;padding:20px 30px 15px\">\n" +
                    "                <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n" +
                    "                  <tbody><tr>\n" +
                    "                    \n" +
                    "                  </tr>\n" +
                    "                </tbody></table>\n" +
                    "              </td>\n" +
                    "            </tr>\n" +
                    "          </tbody></table>\n" +
                    "          \n" +
                    "        </td>\n" +
                    "      </tr>\n" +
                    "    </tbody></table>\n" +
                    "              <img src=\"https://ci6.googleusercontent.com/proxy/vYXiJujKubAFNJwdRBDULUzz-HAY-DCGNwQUrTgfep-mChZEz1ItQGuslUPUOGSBuHn1l_tqT7v9OGBEzQfCMd9ZO6AC-wUjEGtUE-sfVUGNOEdhhsQqU0QfKlZH1sHuQ1b5lYNkBjZTnSY1B9CAX-mRxrVyLuwgZD4sVy1bLr00ZYQ9=s0-d-e1-ft#https://kms-technology.us11.list-manage.com/track/open.php?u=03d948e74144eb877961fe02c&amp;id=e679a73992&amp;e=8cf5f209f6\" height=\"1\" width=\"1\" class=\"CToWUd\"></div><div class=\"yj6qo\"></div><div class=\"adL\">\n" +
                    "</div></div></div><div id=\":2z\" class=\"ii gt\" style=\"display:none\"><div id=\":30\" class=\"a3s aiL \"></div></div><div class=\"hi\"></div></div>";

            helper.setSubject(subject);

            helper.setText(content, true);

            mailSender.send(message);

    }

    public void sendEmailtoverification(String recipientEmail, String link) throws UnsupportedEncodingException, MessagingException {

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom("shonepro123@gmail.com", "Xác thực tài khoản");
        helper.setTo(recipientEmail);

        String subject = "Xác thực tài khoản";

        String content ="<div class=\"\"><div class=\"aHl\"></div><div id=\":2v\" tabindex=\"-1\"></div><div id=\":2k\" class=\"ii gt\"><div id=\":2j\" class=\"a3s aiL msg6347430949454947394\"><u></u>\n" +
                "\n" +
                "  \n" +
                "    \n" +
                "    \n" +
                "    \n" +
                "\n" +
                "  \n" +
                "  <div bgcolor=\"#f1f1f1\" style=\"margin:0;padding:0;min-width:100%!important\">\n" +
                "    <table width=\"100%\" bgcolor=\"#f1f1f1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n" +
                "      <tbody><tr>\n" +
                "        <td>\n" +
                "          \n" +
                "          <table bgcolor=\"#f1f1f1\" class=\"m_6347430949454947394content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width:90%;max-width:600px\">\n" +
                "            <tbody><tr>\n" +
                "              <td bgcolor=\"#f1f1f1\" class=\"m_6347430949454947394header\" style=\"padding:20px 30px\">\n" +
                "                <table align=\"left\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n" +
                "                  <tbody><tr>\n" +
                "                    \n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "                \n" +
                "                \n" +
                "              </td>\n" +
                "            </tr>\n" +
                "            <tr>\n" +
                "              <td>\n" +
                "                <div>\n" +
                "                  <img src=\"https://scontent-hkt1-2.xx.fbcdn.net/v/t1.15752-9/s2048x2048/184703038_1241668892941356_1988666661846089266_n.png?_nc_cat=111&ccb=1-3&_nc_sid=ae9488&_nc_ohc=p92KL1Lz-iAAX-7vULl&_nc_ht=scontent-hkt1-2.xx&tp=30&oh=aecdaf9795644d3971d1ab55f4ac406c&oe=60C75E85\" height=\"100%\" width=\"100%\" class=\"m_6347430949454947394emailImage CToWUd a6T\" style=\"height:auto\" tabindex=\"0\"><div class=\"a6S\" dir=\"ltr\" style=\"opacity: 0.01; left: 1004px; top: 349px;\"><div id=\":4t\" class=\"T-I J-J5-Ji aQv T-I-ax7 L3 a5q\" role=\"button\" tabindex=\"0\" aria-label=\"Tải xuống tệp đính kèm \" data-tooltip-class=\"a1V\" data-tooltip=\"Tải xuống\"><div class=\"akn\"><div class=\"aSK J-J5-Ji aYr\"></div></div></div></div>\n" +
                "                </div>\n" +
                "              </td>\n" +
                "            </tr>\n" +
                "            <tr>\n" +
                "              <td class=\"m_6347430949454947394innerpadding\" bgcolor=\"#ffffff\" style=\"padding-top:20px;padding:30px\">\n" +
                "                <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n" +
                "                  <tbody><tr>\n" +
                "                    <td class=\"m_6347430949454947394bodycopy\" style=\"color:#4a4a4a;font-family:Roboto,sans-serif;font-size:16px;line-height:26px;padding:10px 0\">Vui lòng nhấn vào bên dưới để xác nhận email của bạn.<br>Lưu ý: Đường dẫn chỉ có hiệu lực trong 10 phút</td>\n" +
                "                  </tr>\n" +
                "                  <tr>\n" +
                "                    \n" +
                "                    <td class=\"m_6347430949454947394bodycopy\" style=\"color:#4a4a4a;font-family:Roboto,sans-serif;font-size:16px;line-height:26px;padding:10px 0\"><a href="+link+" style=\"font-style: oblique; color:blue;text-decoration:none\"><b>Xác thực ngay!<b></a></td>\n" +
                "                  </tr>\n" +
                "                  <tr>\n" +
                "                    <td class=\"m_6347430949454947394bodycopy\" style=\"color:#4a4a4a;font-family:Roboto,sans-serif;font-size:16px;line-height:26px;padding:10px 0\">Trân trọng cảm ơn !</td>\n" +
                "                </tbody></table>\n" +
                "              </td>\n" +
                "            </tr>\n" +
                "            <tr>\n" +
                "              <td class=\"m_6347430949454947394footer\" bgcolor=\"#f1f1f1\" style=\"padding-top:10px!important;padding:20px 30px 15px\">\n" +
                "                <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n" +
                "                  <tbody><tr>\n" +
                "                    \n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "              </td>\n" +
                "            </tr>\n" +
                "          </tbody></table>\n" +
                "          \n" +
                "        </td>\n" +
                "      </tr>\n" +
                "    </tbody></table>\n" +
                "              <img src=\"https://ci6.googleusercontent.com/proxy/vYXiJujKubAFNJwdRBDULUzz-HAY-DCGNwQUrTgfep-mChZEz1ItQGuslUPUOGSBuHn1l_tqT7v9OGBEzQfCMd9ZO6AC-wUjEGtUE-sfVUGNOEdhhsQqU0QfKlZH1sHuQ1b5lYNkBjZTnSY1B9CAX-mRxrVyLuwgZD4sVy1bLr00ZYQ9=s0-d-e1-ft#https://kms-technology.us11.list-manage.com/track/open.php?u=03d948e74144eb877961fe02c&amp;id=e679a73992&amp;e=8cf5f209f6\" height=\"1\" width=\"1\" class=\"CToWUd\"></div><div class=\"yj6qo\"></div><div class=\"adL\">\n" +
                "</div></div></div><div id=\":2z\" class=\"ii gt\" style=\"display:none\"><div id=\":30\" class=\"a3s aiL \"></div></div><div class=\"hi\"></div></div>";

        helper.setSubject(subject);

        helper.setText(content, true);

        mailSender.send(message);

    }

    @PostMapping("/reset_password")
    public String processResetPassword(@RequestBody Account acc) {
        Account account = accRepository.Gettoken(acc.getReset_password_token());
        if (account == null) {
            return "Không tìm thấy tài khoản";
        } else {
            account.setPassword(encoder.encode(acc.getPassword()));
            accRepository.save(account);
            return "Đổi mật khẩu thành công";
        }
    }

    @PostMapping("/verification/{token}")
    public void verification(@PathVariable String token) {
        Account account = accRepository.findByToken(token);
        account.setStatus_acc(true);
        accRepository.save(account);
    }

    @GetMapping("/seen/{id}")
    public void seen(@PathVariable int id){
        Notification tb = notificationRepository.findById(id).get();
        tb.setStatus(true);
        notificationRepository.save(tb);
    }

    @GetMapping("/countnofi/{id}")
    public int countnofi(@PathVariable int id){
        return notificationRepository.countnofi(id);
    }
}
