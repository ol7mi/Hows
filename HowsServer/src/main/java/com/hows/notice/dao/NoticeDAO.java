package com.hows.notice.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hows.notice.dto.NoticeDTO;

@Repository
public class NoticeDAO {

	@Autowired
	private SqlSession mybatis;

	// 공지사항 등록
	public void insertNtc(NoticeDTO dto) {
        System.out.println("DAO : " + dto);
        mybatis.insert("Notice.insertNtc", dto);
    }

	// 공지사항 목록 조회
	public List<NoticeDTO> selectNtc() {
		return mybatis.selectList("Notice.selectNtc");
	}

	// 공지사항 상세 조회
	public NoticeDTO detailNtc(int notice_seq) {
		return mybatis.selectOne("Notice.detailNtc", notice_seq);
	}

	// 공지사항 수정
	public void modifyNtc(int notice_seq, NoticeDTO dto) {
		dto.setNotice_seq(notice_seq);
		mybatis.update("Notice.updateNtc", dto);
	}

	// 공지사항 삭제
	public void deleteNtc(int notice_seq) {
		mybatis.delete("Notice.deleteNtc", notice_seq);
	}
	
	// 조회수 증가
    public void viewCount(int notice_seq) {
        mybatis.update("Notice.viewCount", notice_seq);
    }

}
