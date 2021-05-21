package com.bezkoder.springjwt.controllers;
import com.bezkoder.springjwt.models.NguoiThamGia;
import com.bezkoder.springjwt.models.Notification;
import com.bezkoder.springjwt.models.SuKien;
import com.bezkoder.springjwt.repository.NotificationRepository;
import com.bezkoder.springjwt.repository.SuKienRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;


@RestController
@CrossOrigin (origins = "https://sukiendtu.edu.vn")
@RequestMapping(value = "/sukien")
public class SuKienController {
    @Autowired
   private SuKienRepository suKienRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private NotificationRepository notificationRepository;


    @GetMapping("/NguoiDangKiSuKien/{id}")
    public List<Object> findall(@PathVariable int id){
        return suKienRepository.NguoiThamGia(id);
    }

   @GetMapping("/all")
    public List<SuKien> getSuKiens() {
        return suKienRepository.findAll();
    }

    @GetMapping("/sukienhot")
    public SuKien getSuKienhot() {
        return suKienRepository.sukienhot();
    }

    @GetMapping("/sukienthuong")
    public SuKien getSuKienThuong() {
        return suKienRepository.sukienthuong();
    }

    @GetMapping("/sukiendangcho")
    public List<SuKien> SKDC() {
        return suKienRepository.SKDangCho();
    }

    @GetMapping("/sukiendaduyet")
    public List<SuKien> SKDD() {
        return suKienRepository.SKDaDuyet();
    }

    @GetMapping("/sukiendaduyetfull")
    public List<SuKien> SKDDFull() {
        return suKienRepository.SKDaDuyetFull();
    }

    @GetMapping("/sukiendahuy")
    public List<SuKien> SKDH() {
        return suKienRepository.SKDaHuy();
    }

    @PostMapping("/add")
    public void addSuKien(@RequestBody SuKien suKien){
       suKien.setStatus_of_event("Đang chờ");
        long millis=System.currentTimeMillis();
        java.sql.Date date=new java.sql.Date(millis);
        suKien.setTime_upload(date);
       suKienRepository.save(suKien);
        Notification notification = new Notification();
        notification.setAccount_id(suKien.getOwner_event_id());
        String name = suKienRepository.findByIDjoinname(suKien.getID());
        notification.setContent("Sự kiện: " +name+" của bạn đang chờ xét duyệt");
        notification.setStatus(false);
        notification.setTime_notification(date);
        notification.setHref("https://sukiendtu.edu.vn/quanlysukien");
        notificationRepository.save(notification);
    }

    @PutMapping("/duyet/{id}")
    public void duyetSuKien(@PathVariable Integer id,@RequestBody SuKien sukien){
        SuKien sk =suKienRepository.findById(id).get();
        sk.setStatus_of_event("Đồng ý");
        sk.setId_cencor(sukien.getId_cencor());
        sk.setChecksendmail(false);
        suKienRepository.save(sk);
        Notification notification = new Notification();
        notification.setAccount_id(sukien.getOwner_event_id());
        String name = suKienRepository.findByIDjoinname(sukien.getID());
        notification.setContent("Sự kiện: "+ name+ " của bạn đã được xét duyệt.");
        notification.setStatus(false);
        Date date=java.util.Calendar.getInstance().getTime();
        notification.setTime_notification(date);
        notification.setHref("https://sukiendtu.edu.vn/quanlysukien");
        notificationRepository.save(notification);
    }

    @RequestMapping(value = "/tuchoiduyet/{id}", method = RequestMethod.POST)
    public void tuChoiDuyetSuKien(@PathVariable Integer id, @RequestBody String message){
        SuKien sk =suKienRepository.findById(id).get();
        sk.setStatus_of_event("Từ chối");
        suKienRepository.save(sk);
        Notification notification = new Notification();
        notification.setAccount_id(sk.getOwner_event_id());
        System.out.println(sk.getOwner_event_id());
        String name = sk.getEvent_name();
        notification.setContent("Sự kiện: "+ name+" đã bị từ chối vì lí do "+message);
        notification.setStatus(false);
        Date date=java.util.Calendar.getInstance().getTime();
        notification.setTime_notification(date);
        notification.setHref("https://sukiendtu.edu.vn/nguoithamgiasukien");
        notificationRepository.save(notification);
    }

    @GetMapping("/{id}")
    public SuKien get(@PathVariable Integer id) {
        SuKien sk = suKienRepository.findById(id).get();
        return sk;
    }

    @GetMapping("/theoid/{id}")
    public List<SuKien> getSKbyid(@PathVariable Integer id){
        return suKienRepository.findByID(id);
    }

    @GetMapping("/top/{record}")
    public List<SuKien> gettop(@PathVariable Integer record){
        return suKienRepository.findtop(record);
    }

    @GetMapping("/page/{page}")
    public List<SuKien> getpage(@PathVariable Integer page){
        return suKienRepository.findpage(page);
    }

    @GetMapping("/findrecord")
    public int getrecord(){
        return suKienRepository.findrecord();
    }

    @GetMapping("/theothang/{thang}")
    public List<SuKien> getSK(@PathVariable Integer thang){
       return suKienRepository.findByMonth(thang);
    }

    @GetMapping(path ="/theongay/{ngay1}/{ngay2}")
    public List<SuKien> getSKbydaytoday(@PathVariable String ngay1,@PathVariable String ngay2){
        ngay1 = ngay1 + " 00:00:00";
        ngay2 = ngay2 + " 00:00:00";
        return suKienRepository.findByDay(ngay1, ngay2);
    }

    @GetMapping(path ="/theotext/{searchtext}/{record}")
    public List<SuKien> getSKbytext(@PathVariable String searchtext,@PathVariable Integer record){
        String search = "%" + searchtext + "%";
        return suKienRepository.findBytext(search, record);
    }

    @GetMapping(path ="/theotextoverfive/{searchtext}/{record}")
    public List<SuKien> getSKbytextoverfive(@PathVariable String searchtext,@PathVariable String record){
        String search = "%" + searchtext + "%";
        return suKienRepository.findBytextoverfive(search, record);
    }

    @GetMapping("/recordoftext/{searchtext}")
    public int getrecordoftext(@PathVariable String searchtext){
        String search = "%" + searchtext + "%";
        return suKienRepository.findrecordoftext(search);
    }

    @GetMapping(path ="/theodayandtext/{ngay1}/{ngay2}/{searchtext}/{record}")
    public List<SuKien> getSKbydayandtext(@PathVariable String ngay1,@PathVariable String ngay2,@PathVariable String searchtext,@PathVariable Integer record){
        ngay1 = ngay1 + " 00:00:00";
        ngay2 = ngay2 + " 00:00:00";
        String search = "%" + searchtext + "%";
        return suKienRepository.findByDayandtext(ngay1, ngay2, search, record);
    }

    @GetMapping(path ="/theodayandtextpage/{ngay1}/{ngay2}/{searchtext}/{page}")
    public List<SuKien> getSKbydayandtextpage(@PathVariable String ngay1,@PathVariable String ngay2,@PathVariable String searchtext,@PathVariable Integer page){
        ngay1 = ngay1 + " 00:00:00";
        ngay2 = ngay2 + " 00:00:00";
        String search = "%" + searchtext + "%";
        return suKienRepository.findByDayandtextpage(ngay1, ngay2, search, page);
    }

    @GetMapping("/recordofdayandtext/{ngay1}/{ngay2}/{searchtext}")
    public int getrecordofday(@PathVariable String ngay1, @PathVariable String ngay2,@PathVariable String searchtext){
        ngay1 = ngay1 + " 00:00:00";
        ngay2 = ngay2 + " 00:00:00";
        String search = "%" + searchtext + "%";
        return suKienRepository.findrecordofdayandtext(ngay1, ngay2, search);
    }

    @GetMapping("/recordofday/{ngay1}/{ngay2}")
    public int getrecordofday(@PathVariable String ngay1, @PathVariable String ngay2){
        ngay1 = ngay1 + " 00:00:00";
        ngay2 = ngay2 + " 00:00:00";
        return suKienRepository.findrecordofday(ngay1, ngay2);
    }

    @GetMapping(path ="/textofrecord/{searchtext}/{record}")
    public List<SuKien> findBytextofrecord(@PathVariable String searchtext,@PathVariable Integer record){
        String search = "%" + searchtext + "%";
        return suKienRepository.findBytextofrecord(search, record);
    }

    @GetMapping("/tongSuKienDaToChuc")
    public Integer SKDTC(){
       return suKienRepository.SKDaToChuc();
    }

    @GetMapping("/tongSuKienDaDuyet")
    public Integer SuKienDaDuyet(){
        return suKienRepository.SuKienDaDuyet();
    }

    @GetMapping("/tongSuKien")
    public long TongSuKien(){
        return suKienRepository.count();
    }

    @GetMapping("/tongSuKienBiHuy")
    public Integer SuKienBiHuy(){
        return suKienRepository.TongSKDaHuy();
    }

    @GetMapping("/tongSuKienDangCho")
    public Integer SuKienSapToChuc(){
        return suKienRepository.SuKienSapToChuc();
    }

    @GetMapping("/tongNguoiThamGia")
    public Integer TongNguoi(){
        return suKienRepository.TongNguoiThamGia();
    }

    @PostMapping("/kiemtra")
    public Integer KiemTra(@RequestBody SuKien suKien){
       return suKienRepository.KiemTra(suKien.getTime_of_event(),suKien.getPlace());
    }

    @GetMapping("/tongSuKienDangKi")
    public Integer TongSuKienDangKiTrongNgay(){
        return suKienRepository.SKDangKiTrongNgay();
    }

    @GetMapping("/thongkenguoidangki")
    public List<Object> thongKeNguoiDangKi(){
        return suKienRepository.ThongKeNguoiDangKi();
    }

    @GetMapping("/thongkenguoiduyet")
    public List<Object> thongKeNguoiDuyet(){
        return suKienRepository.ThongKeNguoiDuyet();
    }

    @GetMapping("/getchecksendmail/{id}")
    public boolean thongKeNguoiDuyet(@PathVariable int id){
        return suKienRepository.getchecksendmail(id);
    }

    @RequestMapping(value = "/NguoiDangKiSuKienTheoEvent/{id}/{ngay}", method = RequestMethod.GET)
    public String[] getemailbyeventid(@PathVariable int id, @PathVariable String ngay) throws UnsupportedEncodingException, MessagingException {
        String[] email;
        email = suKienRepository.getemailbyidevent(id);
        String name = suKienRepository.findByIDjoinname(id);
        String place = suKienRepository.findByIDjoinplace(id);
        String ngayhen = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss").format(Calendar.getInstance().getTime()); // Ngày giờ họ thực hiện hành động, cái ni mặc định, auto máy tự nhận giờ hệ thống
        SimpleDateFormat format = new SimpleDateFormat("ydd-MM-yyyy HH:mm:ss");
        Date d1 = null;
        Date d2 = null;
        System.out.println(ngay);
        System.out.println(ngayhen);
        SuKien sk =suKienRepository.findById(id).get();
        sk.setChecksendmail(true);
        suKienRepository.save(sk);
        try {
            d1 = format.parse(ngay);
            d2 = format.parse(ngayhen);
        } catch (ParseException e) {
        }
        long demnguoc = (d1.getTime() - d2.getTime())/1000;
        System.out.println(demnguoc);
        while (demnguoc>0){
            try {
                demnguoc--;
                Thread.sleep(1000L);
            }
            catch (InterruptedException e) {
            }
        }
        if(demnguoc==0){
            System.out.println("Đã gửi");
            guimailnhacnho(email, name, place);
        }

        return email;
    }
    public void dangKi(@RequestBody NguoiThamGia nguoiThamGia) throws UnsupportedEncodingException, MessagingException { String name = suKienRepository.findByIDjoinname(nguoiThamGia.getEvent_ID());
    }
        public String guimailnhacnho(String[] email,String name,String place) throws UnsupportedEncodingException, MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom("shonepro123@gmail.com", "Nhắc nhở tham gia sự kiện");
        helper.setTo(email);
        String subject1 = "Nhắc nhở lịch tham gia sự kiện";
        String content1 ="<div class=\"\"><div class=\"aHl\"></div><div id=\":2v\" tabindex=\"-1\"></div><div id=\":2k\" class=\"ii gt\"><div id=\":2j\" class=\"a3s aiL msg6347430949454947394\"><u></u>\n" +
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
                "                    <td class=\"m_6347430949454947394bodycopy\" style=\"color:#4a4a4a;font-family:Roboto,sans-serif;font-size:16px;line-height:26px;padding:10px 0\">Chào bạn! Sự kiện bạn đã đăng ký sắp được diễn ra!</td>\n" +
                "                  </tr>\n" +
                "                  <tr>\n" +
                "                    \n" +
                "                    <td class=\"m_6347430949454947394bodycopy\" style=\"color:#4a4a4a;font-family:Roboto,sans-serif;font-size:16px;line-height:26px;padding:10px 0\"><b>Sự kiện:</b> <a style=\"color:#25a9e0;font-weight:bold;text-decoration:none\">"+name+"</a></td>\n" +
                "                  </tr>\n" +
                "                  <tr>\n" +
                "                    \n" +
                "                    <td class=\"m_6347430949454947394bodycopy\" style=\"color:#4a4a4a;font-family:Roboto,sans-serif;font-size:16px;line-height:26px;padding:10px 0\"><b>Đại điểm:</b> <a style=\"color:black;text-decoration:none\">"+place+"</a></td>\n" +
                "                  </tr>\n" +
                "                  <tr>\n" +
                "                    <td class=\"m_6347430949454947394bodycopy\" style=\"color:#4a4a4a;font-family:Roboto,sans-serif;font-size:16px;line-height:26px;padding:10px 0\">Sự hiện diện của bạn góp phần tạo thành công cho sự kiện</td>\n" +
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
        helper.setSubject(subject1);

        helper.setText(content1, true);

        mailSender.send(message);

        return "gửi thành công";
    }
    @GetMapping("/gettimeofevent/{id}")
    public Date getday(@PathVariable int id) {
        return suKienRepository.findByDayEvent(id);
    }
    @GetMapping("/NguoiDangKiSuKientheoevent/{id}")
    public List<Object> laytaikhoantuid(@PathVariable int id){
        return suKienRepository.getaccountByeventID1(id);
    }

    @PostMapping("/kiemtrave")
    public void KiemTra(@RequestBody String qrcode){
    }

    @PutMapping("/sethot/{id}")
    public void setHot(@PathVariable Integer id){
        SuKien sk =suKienRepository.findById(id).get();
        sk.setHot(true);
        suKienRepository.save(sk);
    }

    @PutMapping("/huyhot/{id}")
    public void HuyHot(@PathVariable Integer id){
        SuKien sk =suKienRepository.findById(id).get();
        sk.setHot(false);
        suKienRepository.save(sk);
    }

}
