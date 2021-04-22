package com.bezkoder.springjwt.controllers;


import com.bezkoder.springjwt.models.Account;
import com.bezkoder.springjwt.models.SuKien;
import com.bezkoder.springjwt.models.Thongtintaikhoan;
import com.bezkoder.springjwt.repository.AccRepository;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
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
    private JavaMailSender mailSender;

    @Autowired
    private AccRepository accRepository;

    @GetMapping("/getFullAcc")
    public List<Account> GetFullAcc() {
        return accRepository.findAll();
    }

    @PutMapping("/ban/{id}")
    public void duyetSuKien(@PathVariable Integer id){
        Account acc =accRepository.findById(id).get();
        acc.setBan(true);
        accRepository.save(acc);
    }

    @PutMapping("thongtincanhan/{id}")
    public void LuuThongTin(@PathVariable int id,@RequestBody Account account){
        Account acc = accRepository.findById(id).get();
        acc=account;
        accRepository.save(acc);
    }

    @GetMapping("/getAcc/{username}")
    public Account GetAcc(@PathVariable String username) {
        return accRepository.GetIF(username);
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
    public String processForgotPassword(@PathVariable String email) throws UnsupportedEncodingException, MessagingException {
        String token = RandomString.make(30);
        Account account = accRepository.findByEmail(email);
        account.setReset_password_token(token);
        accRepository.save(account);
        String link = "http://localhost:4200" + "/doimatkhau/"+ token;
        sendEmailtoresetpassword(email,link);
        return "Gửi qua mail thành công";
    }

    @PostMapping("/xacthucemail/{email}")
    public String xacthucemail(@PathVariable String email) throws UnsupportedEncodingException, MessagingException {
        String token = RandomString.make(50); //Mã ngẫu nhiên do hệ thống tạo ra
        Account account = accRepository.findByEmail(email); //Ta không viết service nên hàm ni viết @query kiểm tra xem trong csdl có email đó không ( email lấy từ request param trên url)
        account.setVerification_email_token(token); // Sau khi tìm được rồi thì sẽ set token vô cho bảng user( nhớ thêm vô)
        accRepository.save(account); //lưu lại token vừa rồi
        String link = "http://localhost:4200" + "/xacthucemail/"+ token; //tạo ra đường dẫn có chứa token
        sendEmailtoverification(email,link); //hàm gửi mail
        return "Gửi qua mail thành công";
    }


    public void sendEmailtoresetpassword(String recipientEmail, String link) throws UnsupportedEncodingException, MessagingException {

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message);

                helper.setFrom("shonepro123@gmail.com", "Cập nhật lại mật khẩu");
            helper.setTo(recipientEmail);

            String subject = "Đây là link reset password:";

            String content = link;

            helper.setSubject(subject);

            helper.setText(content, true);

            mailSender.send(message);

    }

    public void sendEmailtoverification(String recipientEmail, String link) throws UnsupportedEncodingException, MessagingException {

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom("shonepro123@gmail.com", "Xác thực tài khoản");
        helper.setTo(recipientEmail);

        String subject = "Link xác thực tài khoản";

        String content ="Link xác thực tài khoản  " + link;

        helper.setSubject(subject);

        helper.setText(content, true);

        mailSender.send(message);

    }



    @PostMapping("/reset_password")
    public String processResetPassword(@RequestBody Account acc) {
        Account account = accRepository.findByToken(acc.getReset_password_token());
        if (account == null) {
            return "Không tìm thấy tài khoản";
        } else {
            account.setPassword(acc.getPassword());
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
