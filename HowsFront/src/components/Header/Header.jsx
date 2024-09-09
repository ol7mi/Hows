import React, { useState, useEffect } from 'react'
import styles from './Header.module.css'
import logo from '../../assets/images/logo_how.png'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from './../../store/store'
import profile from '../../assets/images/마이페이지_프로필사진.jpg'
import { throttle } from 'lodash'

export const Header = () => {
    const navigate = useNavigate()
    const location = useLocation() // 현재 경로 확인
    const [activeMenu, setActiveMenu] = useState('HowShop')
    const [isFixed, setIsFixed] = useState(false)
    const { isAuth, login, logout, setIsAuth } = useAuthStore()
    const [profileMenu, setProfileMenu] = useState(false)

    const handleMenuClick = menuName => {
        setActiveMenu(menuName)
        if (menuName === 'HowShop') {
            navigate('/')
        } else if (menuName === 'HowStory') {
            navigate('/communities')
        } else if (menuName === 'HowShare') {
            navigate('/')
        }
    }

    const handleScroll = throttle(() => {
        if (window.scrollY) {
            setIsFixed(true)
        } else {
            setIsFixed(false)
        }
    }) // 100ms마다 스크롤 이벤트 실행

    const handleProfileClick = () => {
        setProfileMenu(prev => !prev)
    }

    const handleItemClick = () => {
        setProfileMenu(false)
    }

    const handleLogout = () => {
        const confirmLogout = window.confirm('정말 로그아웃을 하시겠습니까?')
        if (confirmLogout) {
            logout()
            sessionStorage.removeItem('token')
            setIsAuth(false)
            navigate('/')
        }
    }

    useEffect(() => {
        const token = sessionStorage.getItem('token')
        if (token) {
            login(token)
        } else {
            logout()
            setIsAuth(false)
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [login, logout, setIsAuth])

    // 현재 URL에 맞춰서 활성화된 메뉴 설정
    useEffect(() => {
        if (location.pathname === '/') {
            setActiveMenu('HowShop')
        } else if (location.pathname.includes('/communities')) {
            setActiveMenu('HowStory')
        } else if (location.pathname.includes('/howshare')) {
            setActiveMenu('HowShare')
        }
    }, [location.pathname])

    return (
        <div className="header">
            <div className={styles.headerWrap}>
                <div
                    className={`${styles.headerCont} ${
                        isFixed ? styles.fixed : ''
                    }`}
                >
                    <div className={styles.mainNavi}>
                        <div className={styles.menuBox}>
                            <div className={styles.mainLogo}>
                                <a>
                                    <img src={logo} alt="Logo" />
                                </a>
                            </div>
                            <div className={styles.naviMenuList}>
                                <div
                                    className={`${styles.naviMenu} ${
                                        activeMenu === 'HowShop'
                                            ? styles.active
                                            : ''
                                    }`}
                                    onClick={() => handleMenuClick('HowShop')}
                                >
                                    <a>HowShop</a>
                                </div>
                                <div
                                    className={`${styles.naviMenu} ${
                                        activeMenu === 'HowStory'
                                            ? styles.active
                                            : ''
                                    }`}
                                    onClick={() => handleMenuClick('HowStory')}
                                >
                                    <a>HowStory</a>
                                </div>
                                <div
                                    className={`${styles.naviMenu} ${
                                        activeMenu === 'HowShare'
                                            ? styles.active
                                            : ''
                                    }`}
                                    onClick={() => handleMenuClick('HowShare')}
                                >
                                    <a>HowShare</a>
                                </div>
                            </div>
                        </div>
                        <div className={styles.naviInfo}>
                            <div className={styles.infoIcon}>
                                <a>
                                    <i className="bx bx-bookmark"></i>
                                </a>
                            </div>
                            <div className={styles.infoIcon}>
                                <a
                                    onClick={() => {
                                        navigate('/cart')
                                    }}
                                >
                                    <i className="bx bx-cart"></i>
                                </a>
                            </div>
                            <div className={styles.infoIcon}>
                                <a>
                                    <i className="bx bx-bell"></i>
                                </a>
                            </div>
                            <div
                                className={
                                    isAuth
                                        ? `${styles.infoUser}`
                                        : `${styles.infoIcon}`
                                }
                            >
                                {isAuth ? (
                                    <div>
                                        <div className={styles.profileImg}>
                                            <img
                                                src={profile}
                                                alt="User"
                                                onClick={handleProfileClick}
                                            />
                                        </div>
                                        {profileMenu && (
                                            <div className={styles.profileMenu}>
                                                <div
                                                    className={
                                                        styles.profileMenuItem
                                                    }
                                                    onClick={() => {
                                                        navigate('/mypage')
                                                        handleItemClick()
                                                    }}
                                                >
                                                    마이페이지
                                                </div>
                                                <div
                                                    className={
                                                        styles.profileMenuItem
                                                    }
                                                    onClick={() => {
                                                        handleLogout()
                                                        handleItemClick()
                                                    }}
                                                >
                                                    로그아웃
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <a onClick={() => navigate('/signIn')}>
                                        <i className="bx bxs-user-circle"></i>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
