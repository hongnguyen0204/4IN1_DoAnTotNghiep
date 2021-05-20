package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.models.NguoiThamGia;
import com.bezkoder.springjwt.models.Notification;
import com.bezkoder.springjwt.repository.NguoiThamGiaRepository;
import com.bezkoder.springjwt.repository.NotificationRepository;
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
@CrossOrigin(origins = "https://sukiendtu.edu.vn")
@RequestMapping(value = "/nguoithamgia")
public class NguoiThamGiaController {
    @Autowired
    private NotificationRepository notificationRepository;

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
        Notification notification = new Notification();
        notification.setAccount_id(nguoiThamGia.getAcc_ID());
        String name = suKienRepository.findByIDjoinname(nguoiThamGia.getEvent_ID());
        notification.setContent("Bạn đã đăng kí tham gia thành công sự kiện: "+ name);
        notification.setStatus(false);
        Date date=java.util.Calendar.getInstance().getTime();
        notification.setTime_Notification(date);
        notificationRepository.save(notification);
        String tiket = RandomString.make(15);
        nguoiThamGia.setTicket(tiket);
        nguoiThamGiaRepository.save(nguoiThamGia);
        String DATE_FORMATTER= "dd-MM-yyyy";
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(DATE_FORMATTER);
        String TIME_FORMATTER= "HH:mm";
        DateTimeFormatter formatter1 = DateTimeFormatter.ofPattern(TIME_FORMATTER);
        LocalDateTime time = suKienRepository.findByIDjointime(nguoiThamGia.getEvent_ID());
        String formatDate = time.format(formatter);
        String formatTime = time.format(formatter1);
        String diadiem = suKienRepository.findByIDjoinplace(nguoiThamGia.getEvent_ID());
        String content =  "<div class=\"\"><div class=\"aHl\"></div><div id=\":2v\" tabindex=\"-1\"></div><div id=\":2k\" class=\"ii gt\"><div id=\":2j\" class=\"a3s aiL msg6347430949454947394\"><u></u>\n" +
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
                "                    <td class=\"m_6347430949454947394bodycopy\" style=\"color:#4a4a4a;font-family:Roboto,sans-serif;font-size:16px;line-height:26px;padding:10px 0\">Chúc mừng bạn đã tham gia sự kiện thành công</td>\n" +
                "                  </tr>\n" +
                "                  <tr>\n" +
                "                    \n" +
                "                  </tr>\n" +
                "                  <tr>\n" +
                "                    <td class=\"m_6347430949454947394bodycopy\" style=\"color:#4a4a4a;font-family:Roboto,sans-serif;font-size:16px;line-height:26px;padding:10px 0\"><b>Sự kiện:</b> <a style=\"color:#25a9e0;font-weight:bold;text-decoration:none\">"+name+"</a></td>\n" +
                "                  </tr>\n" +
                "                  <tr>\n" +
                "                    <td align=\"center\" style=\"padding-bottom:20px;padding-top:20px\">\n" +
                "                      <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-radius:3px;\">\n" +
                "                        <tbody><tr>\n" +
                "                          <img style=\"width:150px;height:150px\" src=\"https://api.qrserver.com/v1/create-qr-code/?data="+ tiket +"&margin=15\">\n" +
                "                        </tr>\n" +
                "                      </tbody></table>\n" +
                "                    </td>\n" +
                "                  </tr>\n" +
                "                  <tr>\n" +
                "                    <td style=\"color:#4a4a4a;font-family:Roboto,sans-serif;font-size:16px;line-height:29px\">" +
                "                      <ul>" +
                "                        <li >" +
                "                          <b>Thời gian:</b> " +formatTime+ " | " + formatDate +
                "                        </li>" +
                "                        <li>\n" +
                "                          <b>Địa điểm:</b> "+ diadiem +
                "                        </li>\n" +
                "                        \n" +
                "                      </ul>\n" +
                "                    </td>\n" +
                "                  </tr>\n" +
                "                  <tr>\n" +
                "                    <td class=\"m_6347430949454947394bodycopy\" style=\"color:#4a4a4a;font-family:Roboto,sans-serif;font-size:16px;line-height:26px;padding:10px 0\">Sự hiện diện của bạn góp phần tạo thành công cho sự kiện</td>\n" +
                "                  </tr>\n" +
                "                  <tr>\n" +
                "                    <td class=\"m_6347430949454947394bodycopy\" style=\"color:#4a4a4a;font-family:Roboto,sans-serif;font-size:16px;line-height:26px;padding:10px 0\">Trân trọng cảm ơn !</td>\n" +
                "                  </tr>\n" +
                "                  <tr>\n" +
                "                    <td class=\"m_6347430949454947394bodycopy\" style=\"color:#4a4a4a;font-family:Roboto,sans-serif;font-size:16px;line-height:26px;padding:10px 0\">\n" +
                "                      <b>ĐẠI HỌC DUY TÂN</b>\n" +
                "                    </td>\n" +
                "                  </tr>\n" +
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

    @RequestMapping(value = "/checkve/{id}", method = RequestMethod.POST)
    public Integer KiemTrave(@RequestBody String qrcode, @PathVariable int id){
        int vetontai = nguoiThamGiaRepository.Kiemtrave(qrcode, id);
        boolean checked = nguoiThamGiaRepository.Kiemtracheckin(qrcode);
        if(vetontai == 1 && checked){
            return 1;
        }else if(vetontai == 1 && !checked){
            nguoiThamGiaRepository.timnguoi(qrcode);
            return 2;
        }else{
            return 3;
        }
    }


}
