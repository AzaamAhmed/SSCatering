import "./FooterStyle.css"

const Footer = () =>{
    return(
        <div className="footer">
            <div className="top">
                <div>
                    <h1 >EHM</h1>
                    <p>Level up your Language skills through the continuous learning.</p>
                </div>
                <div>
                    <a href="/">
                        <i className="fa-brands fa-facebook-square"></i>
                    </a>
                    <a href="/">
                        <i className="fa-brands fa-instagram-square"></i>
                    </a>
                    <a href="/">
                        <i className="fa-brands fa-behance-square"></i>
                    </a>
                    <a href="/">
                        <i className="fa-brands fa-twitter-square"></i>
                    </a>
                </div>
            </div>
            <div className="bottom">
                <div>
                    <h4>Service</h4>
                    <a href ="/">Beautician</a>
                    <a href ="/">Photography</a>
                    <a href ="/">Catering</a>
                    <a href ="/">Transport</a>
                </div>
                
                <div>
                    <h4>Help</h4>
                    <a href ="/">Support</a>
                    <a href ="/">Troubles</a>
                    <a href ="/">Chat</a>
                    <a href ="/">Contact us</a>
                </div>
                <div>
                    <h4>Others</h4>
                    <a href ="/">Terms of Service</a>
                    <a href ="/">Privacy</a>
                    <a href ="/">Policy</a>
                    <a href ="/">License</a>
                </div>
            </div>

        </div>
    )
}

export default Footer