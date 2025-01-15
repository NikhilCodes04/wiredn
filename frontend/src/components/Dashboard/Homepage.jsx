import "./Homepage.css";
import trafficLight from "../../../public/icons8-traffic-light-50.png";
import testing from "../../../public/icons8-testing-50.png";
import design from "../../../public/icons8-design-50.png";
import document100 from "../../../public/icons8-document-100.png";
// import code from "../../../public/icons8-code-50.png";
// import dashboard from "../../../public/icons8-dashboard-50.png";
import sih from "../../../public/sih.png";
import userIcon from "../../../public/user.png";
import exploreIcon from "../../../public/explore.png";
import googleLogo from "../../../public/google-logo.png";
import dashboardIcon from "../../../public/dashboard.png";

function Homepage() {
  return (
    <div id="homepage">
      <div id="pending-work-home">
        <p className="big-text">Continue Pending Work..</p>
        <div className="project-card-home">
          <img src={trafficLight} alt="Traffic Light Icon" />
          <div className="pch1">
            <p className="text18">Testing Phase</p>
            <p className="chotatext">Smart Traffic Management</p>
            <p className="chotatext">Created By: Vikas</p>
            <p className="chotatext">12:00PM | 25 November</p>
          </div>
        </div>
        <div className="project-card-home">
          <img src={testing} alt="Testing Icon" />
          <div className="pch1">
            <p className="text18">Testing Phase</p>
            <p className="chotatext">Smart Traffic Management</p>
            <p className="chotatext">Created By: Vikas</p>
            <p className="chotatext">12:00PM | 25 November</p>
          </div>
        </div>
        <div className="project-card-home">
          <img src={document100} alt="Document Icon" />
          <div className="pch1">
            <p className="text18">SRS</p>
            <p className="chotatext">PUBGM Predictor</p>
            <p className="chotatext">Created By: Vikas</p>
            <p className="chotatext">8:00PM | 26 November</p>
          </div>
        </div>
        <div className="project-card-home">
          <img src={design} alt="Design Icon" />
          <div className="pch1">
            <p className="text18">UI/UX Tweaks</p>
            <p className="chotatext">Smart Traffic Management</p>
            <p className="chotatext">Created By: Varun</p>
            <p className="chotatext">12:00PM | 28 November</p>
          </div>
        </div>
      </div>
      <div id="b1">
        <div id="b2">
          <div id="caraousel-home">
            <img src={sih} alt="SIH 2024" />
            <p id="caraousel-home-title">Smart India Hackathon 2024</p>
          </div>
          <div id="search-options-home">
            <p className="big-text">Search categories</p>
            <div id="search-options-home-grid">
              <div className="search-options-home-domain">
                <img src={userIcon} alt="User Icon" />
                <p>Teammates</p>
              </div>
              <div className="search-options-home-domain">
                <img src={exploreIcon} alt="Explore Icon" />
                <p>Explore</p>
              </div>
              <div className="search-options-home-domain">
                <img src={googleLogo} alt="Google Icon" />
                <p>Google</p>
              </div>
              <div className="search-options-home-domain">
                <img src={dashboardIcon} alt="Dashboard Icon" />
                <p>Dashboard</p>
              </div>
            </div>
          </div>
        </div>
        <div className="my-project">
          <p className="big-text" style={{ marginLeft: "20px" }}>My Projects</p>
          <div className="my-projects-home">
            <div className="my-projects-container">
              <div className="my-projects-details">
                <img src={googleLogo} className="my-projects-details-img" alt="Google Logo" />
                <div className="my-projects-details-text">
                  <p>Smart Traffic Management</p>
                  <p>Collaborators : Varun, Vikas and 3 more</p>
                  <p>Mentors: Prashant Singh Rana, Sachin Kansal</p>
                </div>
              </div>
              <div className="my-projects-techStack">
                <div className="my-projects-techStack-container">Blender</div>
                <div className="my-projects-techStack-container">Blockchain</div>
                <div className="my-projects-techStack-container">ReactJS</div>
                <div className="my-projects-techStack-container">IoT</div>
              </div>
            </div>
            <div className="my-projects-container">
              <div className="my-projects-details">
                <img src={design} className="my-projects-details-img" alt="Design Icon" />
                <div className="my-projects-details-text">
                  <p>Project Garuda</p>
                  <p>Collaborators : Varun, Shreyansh and 3 more</p>
                  <p>Mentors: Javed Imran, Sapna Pandit</p>
                </div>
              </div>
              <div className="my-projects-techStack">
                <div className="my-projects-techStack-container">Blender</div>
                <div className="my-projects-techStack-container">Blockchain</div>
                <div className="my-projects-techStack-container">ReactJS</div>
                <div className="my-projects-techStack-container">IoT</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Homepage;
