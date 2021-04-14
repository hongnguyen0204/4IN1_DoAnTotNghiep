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
    private Date postday;
    private int ID_admin;

    public QuanLyTinTuc() {
    }

    public QuanLyTinTuc(Integer ID, String title, String describe_of_news, String content, String img, Date postday,int ID_admin) {
        this.ID = ID;
        this.title = title;
        this.describe_of_news = describe_of_news;
        this.content = content;
        this.img = img;
        this.postday = postday;
        this.ID_admin=ID_admin;
    }

    public int getID_admin() {
        return ID_admin;
    }

    public void setID_admin(int ID_admin) {
        this.ID_admin = ID_admin;
    }

    public Integer getID() {
        return ID;
    }

    public void setID(Integer ID) {
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

    public Date getPostday() {
        return postday;
    }

    public void setPostday(Date postday) {
        this.postday = postday;
    }

}
