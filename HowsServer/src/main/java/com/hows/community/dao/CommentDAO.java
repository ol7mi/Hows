package com.hows.community.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hows.community.dto.CommentReportDTO;
import com.hows.community.dto.ReplyReportDTO;

@Repository
public class CommentDAO {
	@Autowired
	private SqlSession mybatis;

	// 게시글 댓글 작성
    public void writeComment(int boardSeq, String memberId, String commentContents) {
        Map<String, Object> params = new HashMap<>();
        params.put("board_seq", boardSeq);
        params.put("comment_contents", commentContents);
        params.put("member_id", memberId);
        
        mybatis.insert("Comment.writeComment", params);
    }
//	// 게시글 댓글 목록 불러오기
//    public List<Map<String, Object>> getCommentsBoardSeq(int boardSeq) {
//       return mybatis.selectList("Comment.getCommentsBoardSeq",boardSeq);
//    }

    // 게시글 댓글 목록 불러오기 (페이지네이션 적용)
    public List<Map<String, Object>> getCommentsBoardSeqWithPagination(int boardSeq, int startRow, int endRow) {
        Map<String, Object> params = new HashMap<>();
        params.put("board_seq", boardSeq);
        params.put("startRow", startRow);
        params.put("endRow", endRow);

        return mybatis.selectList("Comment.getCommentsBoardSeqWithPagination", params);
    }
    
    // 사용자가 특정 게시글에 좋아요를 눌렀는지 확인
    public boolean checkIfUserLikedBoard(String member_id, int comment_seq) {
        Map<String, Object> params = new HashMap<>();
        params.put("member_id", member_id);
        params.put("comment_seq", comment_seq);
        
        Integer result = mybatis.selectOne("Comment.checkIfUserLikedBoard", params);
        return result != null && result > 0;
    }

	
    // 게시글에 좋아요 제거
    public void removeLike(String member_id, int comment_seq) {
        Map<String, Object> params = new HashMap<>();
        params.put("member_id", member_id);
        params.put("comment_seq", comment_seq);  
        mybatis.delete("Comment.removeLike", params);
    }
    
    // 특정 댓글 좋아요 개수 가져오기
    public int getLikeCount(int comment_seq) {
        return mybatis.selectOne("Comment.getLikeCount", comment_seq);
    }
    
    // 댓글 신고하기
    public void sendCommentReport(int commentSeq, String reportCode, String memberId) {
    	Map<String, Object> params = new HashMap<>();
        params.put("comment_seq", commentSeq);
        params.put("report_code", reportCode);
        params.put("member_id", memberId);
        mybatis.insert("Comment.sendCommentReport", params);
    }
    
    // 전체 댓글 수 가져오기
    public int getTotalCommentsCount(int boardSeq) {
        return mybatis.selectOne("Comment.getTotalCommentsCount", boardSeq);
    }
    
    // 답글 작성 SQL 호출
    public void writeReply(int commentSeq, String replyContent, String memberId) {
        Map<String, Object> params = new HashMap<>();
        params.put("comment_seq", commentSeq);
        params.put("reply_contents", replyContent);
        params.put("member_id", memberId);

        mybatis.insert("Comment.writeReply", params);
    }
    
    // 댓글에 대한 답글 목록 불러오기
    public List<Map<String, Object>> getRepliesByCommentSeq(int commentSeq) {
        return mybatis.selectList("Comment.getRepliesByCommentSeq", commentSeq);
    }
	

	// 게시글에 좋아요 추가
	public void addLike(String member_id, int comment_seq) {
		Map<String, Object> params = new HashMap<>();
		params.put("member_id", member_id);
		params.put("comment_seq", comment_seq);

		mybatis.insert("Comment.addLike", params);
	}

	// 관리자
	// 댓글 신고조회 (관리자)
	// 신고 댓글 목록 조회 (페이징 포함)
	public List<Map<String, Object>> getReportedComments(int startRow, int endRow) {
		Map<String, Object> params = new HashMap<>();
		params.put("startRow", startRow);
		params.put("endRow", endRow);
		return mybatis.selectList("Comment.getReportedComments", params);
	}

	// 전체 신고 댓글 개수 조회
	public int getReportedCommentsCount() {
		return mybatis.selectOne("Comment.getReportedCommentsCount");
	}

	// 댓글 신고 내역 조회
	public List<CommentReportDTO> getCommentReport(int comment_seq) {
		return mybatis.selectList("Comment.getCommentReport", comment_seq);
	}

	// 댓글 신고 기록 삭제
	public void deleteCommentReport(int comment_seq) {
		mybatis.delete("Comment.deleteCommentReport", comment_seq);
	}

	// 댓글 삭제
	public int deleteCmt(int comment_seq) {
		return mybatis.delete("Comment.deleteCmt", comment_seq);
	}

	// 대댓글 신고조회 (관리자)
	// 신고된 대댓글 목록 조회
	public List<Map<String, Object>> getReportedReplys(int startRow, int endRow) {
		Map<String, Object> params = new HashMap<>();
		params.put("startRow", startRow);
		params.put("endRow", endRow);
		return mybatis.selectList("Comment.getReportedReplies", params);
	}

	// 신고된 대댓글 총 개수 조회
	public int getReportedReplysCount() {
		return mybatis.selectOne("Comment.getReportedReplysCount");
	}

	// 대댓글 신고 내역 조회
	public List<ReplyReportDTO> getReplyReport(int reply_seq) {
		return mybatis.selectList("Comment.getReplyReport", reply_seq);
	}
	
	// 대댓글 신고 기록 삭제
	public void deleteReplyReport(int reply_seq) {
		mybatis.delete("Comment.deleteReplyReport", reply_seq);
	}

	// 대댓글 삭제
	public int deleteReply(int reply_seq) {
		return mybatis.delete("Comment.deleteReply", reply_seq);
	}

}

