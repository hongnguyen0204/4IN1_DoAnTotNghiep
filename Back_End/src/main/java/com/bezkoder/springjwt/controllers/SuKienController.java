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

    @GetMapping("/theothang/{thang}")
    public List<SuKien> getSK(@PathVariable Integer thang){
       return suKienRepository.findByMonth(thang);
    }

    @GetMapping(path ="/theongay/{ngay1}/{ngay2}/{searchtext}")
    public List<SuKien> getSKbyday(@PathVariable String ngay1,@PathVariable String ngay2, @PathVariable String searchtext){
        String search = "%" + searchtext + "%";
        return suKienRepository.findByDay(ngay1, ngay2, search);
    }

    @GetMapping(path ="/theotext/{searchtext}")
    public List<SuKien> getSKbytext(@PathVariable String searchtext){
        String search = "%" + searchtext + "%";
        return suKienRepository.findBytext(search);
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
