package com.bezkoder.springjwt.models;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "news")
public class QuanLyTinTuc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ID;
    private  String title;
    private  String describe_of_news;
    private  String content;
    private  String img;
    private Date post_day;
    private int ID_admin;

    public QuanLyTinTuc() {
    }

<<<<<<< HEAD
    public QuanLyTinTuc(int ID, String title, String describe_of_news, String content, String img, Date post_day, int ID_admin) {
=======
<<<<<<< HEAD
    public QuanLyTinTuc(int ID, String title, String describe_of_news, String content, String img, Date post_day, int ID_admin) {
=======
    public QuanLyTinTuc(Integer ID, String title, String describe_of_news, String content, String img, Date post_day,int ID_admin) {
>>>>>>> b430ca18c54eb155f04e2da7c12f2ff70201b75c
>>>>>>> 26d7b0cf9e035352a90e64fb051de017b995744e
        this.ID = ID;
        this.title = title;
        this.describe_of_news = describe_of_news;
        this.content = content;
        this.img = img;
        this.post_day = post_day;
<<<<<<< HEAD
        this.ID_admin=ID_admin;
    }

=======
<<<<<<< HEAD
=======
        this.ID_admin=ID_admin;
    }

    public int getID_admin() {
        return ID_admin;
    }

    public void setID_admin(int ID_admin) {
>>>>>>> b430ca18c54eb155f04e2da7c12f2ff70201b75c
        this.ID_admin = ID_admin;
    }

>>>>>>> 26d7b0cf9e035352a90e64fb051de017b995744e
    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescribe_of_news() {
        return describe_of_news;
    }

    public void setDescribe_of_news(String describe_of_news) {
        this.describe_of_news = describe_of_news;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public Date getPost_day() {
        return post_day;
    }

    public void setPost_day(Date post_day) {
        this.post_day = post_day;
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 26d7b0cf9e035352a90e64fb051de017b995744e
    }

    public int getID_admin() {
        return ID_admin;
    }

    public void setID_admin(int ID_admin) {
        this.ID_admin = ID_admin;
<<<<<<< HEAD
=======
=======
>>>>>>> b430ca18c54eb155f04e2da7c12f2ff70201b75c
>>>>>>> 26d7b0cf9e035352a90e64fb051de017b995744e
    }
}
