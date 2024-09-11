import styles from "./FindPw.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../../assets/images/logo_how.png";
import { verifyUser } from "../../../../api/member";

export const FindPw = () => {
    const navi = useNavigate();

    const [auth, setAuth] = useState({ member_id: "", email: "" });
    const [isError, setIsError] = useState(false); // 오류 여부

    const handleInput = (e) => {
        const { name, value } = e.target;
        setAuth((prev) => ({
            ...prev,
            [name]: value,
        }));
        setIsError(false);
    };

    const handleSendEmail = () => {
        verifyUser(auth.member_id, auth.email).then((resp) => {
            if (resp.data) {
                alert("해당 이메일로 임시 비밀번호가 전송되었습니다.");
                navi("/signIn");
                setIsError(false); // 인증 성공 시 오류 메시지 초기화
            } else {
                setIsError(true); // 아이디와 이메일 불일치 시 오류 상태 설정
            }
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.findPwBox}>
                <div className={styles.logo}>
                    <img src={logo} alt="logo" />
                    <h1 className={styles.title}>How's</h1>
                </div>
                <span className={styles.subTitle}>비밀번호 찾기</span>
                <input
                    type="text"
                    name="member_id"
                    onChange={handleInput}
                    placeholder="아이디"
                />
                <input
                    type="text"
                    name="email"
                    onChange={handleInput}
                    placeholder="이메일"
                />
                {isError && <span className={styles.errorText}>아이디와 이메일이 일치하지 않습니다.</span>}
                <button className={styles.btn} onClick={handleSendEmail}>
                    비밀번호 찾기
                </button>
                <button className={styles.backBtn} onClick={() => navi("/signIn")}>
                    {" "}
                    뒤로가기
                </button>
            </div>
        </div>
    );
};
