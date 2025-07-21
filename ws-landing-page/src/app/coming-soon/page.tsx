import Image from "next/image";
import Link from "next/link";
import "../styles/navbar.css";
import "../styles/stars.css";
import "../styles/coming-soon.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function ComingSoon() {
  return (
    <>
      <Navbar />
      
      <div className="coming-soon-container">
        {/* Star background */}
        <Image
          src="/assets/Website-page/stars.png"
          alt="Stars"
          fill
          className="star-bg"
          priority
        />
        
        {/* Mountains background */}
        <Image
          src="/assets/Website-page/mountains.png"
          alt="Mountains"
          width={1920}
          height={200}
          className="mountains-bg"
          priority
        />
        
        <div className="coming-soon-content">
          <Image
            src="/assets/Website-page/logo.png"
            alt="Wild Strikes Logo"
            width={400}
            height={230}
            className="coming-soon-logo"
          />
          
          <h1 className="coming-soon-title">COMING SOON!</h1>
          
          <p className="coming-soon-subtitle">
            The arena is being prepared for the ultimate battles
          </p>
          
          <div className="coming-soon-description">
            <p>
              ⚔️ Strategic combat system<br/>
              🏆 Competitive rankings<br/>
              🎤 Real-time voice chat
            </p>
          </div>
          
          {/* <div className="notification-section">
            <h3>Get notified when we launch!</h3>
            <div className="email-signup">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="email-input"
              />
              <button className="notify-button">Notify Me</button>
            </div>
          </div> */}
          
          <Link href="/" className="back-button">
            ← Back to Home
          </Link>
        </div>
        
        {/* Floating elements for atmosphere */}
        <Image
          src="/assets/Website-page/shooting-star.png"
          alt="Shooting Star"
          width={60}
          height={30}
          className="floating-star-1"
        />
        
        <Image
          src="/assets/Website-page/earth.png"
          alt="Earth"
          width={80}
          height={120}
          className="floating-earth-cs"
        />
        
        <Image
          src="/assets/Website-page/mars.png"
          alt="Mars"
          width={100}
          height={100}
          className="floating-mars-cs"
        />
      </div>
      
      <Footer />
    </>
  );
}
