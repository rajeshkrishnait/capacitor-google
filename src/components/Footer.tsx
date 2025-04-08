import styles from '../styles/Footer.module.scss';
const Footer = () => {
    return(
        <div className={styles.footer}>
            <div className={styles.footer_top}>
                <a>India</a>
            </div>
            <div className={styles.footer_bottom}>
                <div className={styles.footer_bottom_left}>
                    <a>Advertising</a>
                    <a>Business</a>
                    <a>How Search works</a>
                </div>
                <div className={styles.footer_bottom_right}>
                    <a>Privacy</a>
                    <a>Terms</a>
                    <a>Settings</a>
                </div>
                </div>
        </div>
    )
}

export default Footer;