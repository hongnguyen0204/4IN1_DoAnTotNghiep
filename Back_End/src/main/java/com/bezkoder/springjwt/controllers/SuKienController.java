package com.bezkoder.springjwt.controllers;
import com.bezkoder.springjwt.models.SuKien;
import com.bezkoder.springjwt.repository.SuKienRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;


@RestController
@CrossOrigin (origins = "http://localhost:4200")
@RequestMapping(value = "/sukien")
public class SuKienController {
   @Autowired
   private SuKienRepository suKienRepository;

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

    @GetMapping("/sukiendangcho")
    public List<SuKien> SKDC() {
        return suKienRepository.SKDangCho();
    }

    @GetMapping("/sukiendaduyet")
    public List<SuKien> SKDD() {
        return suKienRepository.SKDaDuyet();
    }

    @GetMapping("/sukiendahuy")
    public List<SuKien> SKDH() {
        return suKienRepository.SKDaHuy();
    }

    @PostMapping("/add")
    public void addSuKien(@RequestBody SuKien suKien){
       suKien.setStatus_of_event("Đang chờ");
       suKienRepository.save(suKien);
    }

    @PutMapping("/duyet/{id}")
    public void duyetSuKien(@PathVariable Integer id){
        SuKien sk =suKienRepository.findById(id).get();
        sk.setStatus_of_event("Đồng ý");
        suKienRepository.save(sk);
    }

    @PutMapping("/tuchoiduyet/{id}")
    public void tuChoiDuyetSuKien(@PathVariable Integer id){
        SuKien sk =suKienRepository.findById(id).get();
        sk.setStatus_of_event("Từ chối");
        suKienRepository.save(sk);
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

    @GetMapping(path ="/theongayvatext/{ngay1}/{ngay2}/{searchtext}")
    public List<SuKien> getSKbydayandtext(@PathVariable String ngay1,@PathVariable String ngay2, @PathVariable String searchtext){
        String search = "%" + searchtext + "%";
        ngay1 = ngay1 + " 00:00:00";
        ngay2 = ngay2 + " 00:00:00";
        return suKienRepository.findByDayandtext(ngay1, ngay2, search);
    }

    @GetMapping(path ="/theongay/{ngay1}/{ngay2}")
    public List<SuKien> getSKbydaytoday(@PathVariable String ngay1,@PathVariable String ngay2){
        ngay1 = ngay1 + " 00:00:00";
        ngay2 = ngay2 + " 00:00:00";
        return suKienRepository.findByDay(ngay1, ngay2);
    }

    @GetMapping(path ="/theotext/{searchtext}/{record}")
    public List<SuKien> getSKbytext(@PathVariable String searchtext,@PathVariable String record){
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
        return suKienRepository.findrecordoftext(searchtext);
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

}
