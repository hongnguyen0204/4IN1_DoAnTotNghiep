package com.bezkoder.springjwt.controllers;


import com.bezkoder.springjwt.models.Account;
import com.bezkoder.springjwt.repository.AccRepository;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/account")
public class AccController {
    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private AccRepository accRepository;

    @GetMapping("/getAcc/{username}")
    public Account GetAcc(@PathVariable String username) {
        return accRepository.GetIF(username);
    }

    @PostMapping("/forgot_password/{email}")
    public String processForgotPassword(@PathVariable String email) throws UnsupportedEncodingException, MessagingException {
        String token = RandomString.make(30);
        Account account = accRepository.findByEmail(email);
        account.setReset_password_token(token);
        accRepository.save(account);
        String link = "http://localhost:4200" + "/doimatkhau/"+ token;
        sendEmail(email,link);
        return "Gửi qua mail thành công";
    }


    public void sendEmail(String recipientEmail, String link) throws UnsupportedEncodingException, MessagingException {

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
}
