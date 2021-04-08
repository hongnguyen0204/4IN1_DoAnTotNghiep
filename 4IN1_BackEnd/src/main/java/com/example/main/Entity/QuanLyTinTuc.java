package com.example.main.Entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "news")
public class QuanLyTinTuc {
    @Id
    private Integer id;
    private  String title;
    private  String describe_of_news;
    private  String content;
    private  String img;
    private Date postday;

    public QuanLyTinTuc() {
    }

    public QuanLyTinTuc(Integer id, String title, String describe_of_news, String content, String img, Date postday) {
        this.id = id;
        this.title = title;
        this.describe_of_news = describe_of_news;
        this.content = content;
        this.img = img;
        this.postday = postday;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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
