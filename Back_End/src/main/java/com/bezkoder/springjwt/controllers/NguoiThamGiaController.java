package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.models.NguoiThamGia;
import com.bezkoder.springjwt.models.SuKien;
import com.bezkoder.springjwt.repository.NguoiThamGiaRepository;
import com.bezkoder.springjwt.repository.SuKienRepository;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/nguoithamgia")
public class NguoiThamGiaController {

    @Autowired
    private NguoiThamGiaRepository nguoiThamGiaRepository;

    @Autowired
    private SuKienRepository suKienRepository;

    @Autowired
    private JavaMailSender mailSender;

    @GetMapping("/{id}")
    public List<Object> findall(@PathVariable int id){
        return nguoiThamGiaRepository.SKDaThamGia(id);
    }

    @GetMapping("/infor/{id}")
    public NguoiThamGia findIF(@PathVariable Integer id){
        return nguoiThamGiaRepository.findById(id).get();
    }

    @PostMapping("/delete")
    public void delete(@RequestBody NguoiThamGia nguoiThamGia) {
        nguoiThamGiaRepository.HuySK(nguoiThamGia.getAcc_ID(),nguoiThamGia.getEvent_ID());
    }

    @PostMapping("/dangki")
    public void dangKi(@RequestBody NguoiThamGia nguoiThamGia) throws UnsupportedEncodingException, MessagingException {
        String tiket = RandomString.make(30);
        nguoiThamGia.setTicket(tiket);
        nguoiThamGiaRepository.save(nguoiThamGia);
        String DATE_FORMATTER= "dd-MM-yyyy HH:mm";
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(DATE_FORMATTER);
        LocalDateTime time = suKienRepository.findByIDjointime(nguoiThamGia.getEvent_ID());
        String formatDateTime = time.format(formatter);
        String diadiem = suKienRepository.findByIDjoinplace(nguoiThamGia.getEvent_ID());
        String name = suKienRepository.findByIDjoinname(nguoiThamGia.getEvent_ID());
        String content =  "<div style=\"text-align: center\" class=\"m_7644547431822981386wrapper\">\n" +
                "<div  class=\"m_6904495966517424000content-inside\">\n" +
                "  <img  alt=\"em-check\" src=\"https://ci4.googleusercontent.com/proxy/jMa2NMEgHpS0WcPkmCMlZmLCNqL9wgb85Xz9UEude-NjVs9cZaXIG4TaQZ_Zwos2u0YBC7fHsbfkFbMmsWwmon7ZNHiHUdbb=s0-d-e1-ft#https://www.galaxycine.vn/website/images/em-check.png\" class=\"CToWUd\">\n" +
                "  <div  class=\"m_6904495966517424000cont-title\">Chúc mừng! Bạn đã đăng kí thành công!</div>\n" +
                "  <br>\n" +
                "  <div style=\"font-size: 30px; color: #0b0b0b\"  class=\"m_6904495966517424000cont-title\">"+name+"</div>\n" +
                "  <div class=\"m_6904495966517424000content-h1-movie\"></div>\n" +
                "  <div style=\"display: flex;\" class=\"m_6904495966517424000content-description\">\n" +
                "    <div style=\"margin-left: 30%\">Thời gian</div>\n" +
                "    <div style=\"margin-left: 30%\">Địa điểm</div>\n" +
                "  </div>\n" +
                "  <div style=\"display: flex;\" class=\"m_6904495966517424000content-description\">\n" +
                "    <div style=\"margin-left: 30%; color: orangered\">"+formatDateTime+"</div>\n" +
                "    <div style=\"margin-left: 22%; color: orangered\">"+ diadiem  +"</div>\n" +
                "  </div>\n" +
                "    <div class=\"m_6904495966517424000qr-code\">\n" + "<br>"+
                "      <img style=\"width:150px;height:150px\" alt=\"Scan me!\" src=\"https://api.qrserver.com/v1/create-qr-code/?data="+ tiket +"class=\"CToWUd\"><br>\n" +
                "    </div>\n" +
                "  </div>\n" +
                "</div>";
        String email = nguoiThamGiaRepository.getemailbyid(nguoiThamGia.getAcc_ID());
        sendEmailtoverification(email,content);
    }

    public void sendEmailtoverification(String recipientEmail, String content) throws UnsupportedEncodingException, MessagingException {

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom("shonepro123@gmail.com", "Chúc mừng bạn tham gia sự kiện thành công");
        helper.setTo(recipientEmail);

        String subject = "Chúc mừng bạn tham gia sự kiện thành công";

        helper.setSubject(subject);

        helper.setText(content, true);

        mailSender.send(message);

    }

    @PostMapping("/kiemtrathamgia")
    public Integer KiemTraTG(@RequestBody NguoiThamGia nguoiThamGia){
        return nguoiThamGiaRepository.KiemTraThamGia(nguoiThamGia.getAcc_ID(),nguoiThamGia.getEvent_ID());
    }

    @PostMapping("/kiemtrathoigian")
    public List<Object> KiemTraThoiGian(@RequestBody NguoiThamGia nguoiThamGia){
        return nguoiThamGiaRepository.KiemTraThoiGian(nguoiThamGia.getAcc_ID());
    }

    @PostMapping("/checkSoLuong")
    public Integer KiemTraSoLuong(@RequestBody NguoiThamGia nguoiThamGia){
        return nguoiThamGiaRepository.CheckSoLuongNTG(nguoiThamGia.getEvent_ID());
    }

    @RequestMapping(value = "/checkve", method = RequestMethod.POST)
    public boolean KiemTrave(@RequestBody String qrcode){
        int record = nguoiThamGiaRepository.Kiemtrave(qrcode);
        if(record == 0){
            return false;
        }else{
            return true;
        }
    }


}
