package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.models.Account;
import com.bezkoder.springjwt.models.Message;
import com.bezkoder.springjwt.repository.AccRepository;
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
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/account")
public class AccController {
    @Autowired
    PasswordEncoder encoder;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private AccRepository accRepository;

    @GetMapping("/getFullAcc")
    public List<Account> GetFullAcc() {
        return accRepository.findAll();
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

    @GetMapping("/getAccToken/{token}")
    public Account GetAcctoken(@PathVariable String token) {
        return accRepository.findByToken(token);
    }

    @GetMapping("/getAccTokenEmail/{token}")
    public Account GetAcctokenEmail(@PathVariable String token) {
        return accRepository.findByToken(token);
    }

    @PostMapping("/forgot_password/{email}")
    public void processForgotPassword(@PathVariable String email) throws UnsupportedEncodingException, MessagingException {
        String token = RandomString.make(30);
        Account account = accRepository.findByEmail(email);
        account.setReset_password_token(token);
        accRepository.save(account);
        String link = "http://localhost:4200" + "/doimatkhau/"+ token;
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
        String link = "http://localhost:4200" + "/xacthucemail/"+ token;
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
        String link = "http://localhost:4200" + "/xacthucemail/"+ token; //tạo ra đường dẫn có chứa token
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
        helper.setTo(ms.getEmail());

        String subject1 = "Người dùng phản hồi:";

        String content = "Tên: " + ms.getName() + "<br>" + "Email: " + ms.getEmail() + "<br>" + "Ngành: " + ms.getSubject() + "<br>" + "số điện thoại: " + ms.getSdt() + "<br>" + "Nội dung: " + ms.getLoinhan() + "<br>" ;

        helper.setSubject(subject1);

        helper.setText(content, true);

        mailSender.send(message);

        return "đc nè";

    }

    public void sendEmailtoresetpassword(String recipientEmail, String link) throws UnsupportedEncodingException, MessagingException {

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message);

            helper.setFrom("shonepro123@gmail.com", "Cập nhật lại mật khẩu");
            helper.setTo(recipientEmail);

            String subject = "Reset password:";

            String content ="Lưu ý: Đường dẫn chỉ có hiệu lực trong 10 phút. <br>"+ link;

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

        String content ="Lưu ý: Đường dẫn chỉ có hiệu lực trong 10 phút. <br>" + link;

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
}
