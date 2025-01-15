import "./ProjectPage.css";

// Import images at the top for consistency
import glass from "../../../public/glass.png";
import filterIcon from "../../../public/icons8-filter-50.png";
import sortIcon from "../../../public/icons8-sort-50.png";
import sihLogo from "../../../public/sih.png";

function ProjectPage() {
  return (
    <div className="view-project">
      <p className="big-text view-project-title">Projects</p>
      <div className="view-project-searchBar-container">
        <div className="view-project-searchBar">
          <input
            type="text"
            className="view-project-searchBar-input"
            placeholder="search projects"
          />
          <button className="view-project-searchBar-button">
            <img src={glass} alt="Search" />
          </button>
        </div>
        <button className="view-project-searchBar-filter">
          <img src={filterIcon} alt="Filter" />Filter
        </button>
        <button className="view-project-searchBar-sort">
          <img src={sortIcon} alt="Sort" />Sort
        </button>
      </div>
      <div className="view-project-list">
        {[1, 2, 3].map((_, index) => (
          <div className="view-project-card-container" key={index}>
            <img
              src={sihLogo}
              alt="Project"
              className="view-project-card-container-left"
            />
            <div className="view-project-card-container-mid">
              <p className="view-project-card-container-mid-title">
                Smart Traffic Management
              </p>
              <p className="view-project-card-container-mid-desc">
                Description: Lorem ipsum dolor sit amet, consectetur adipiscing
                elit. Morbi pellentesque eros eu semper mattis. Integer iaculis,
                ex quis molestie sol, molestie lacus et, ornare purus. Curabitur
                vestibulum ante in sagittis auctor. Nunc sagittis mollis ante a
                sagittis. Duis sit amet neque dui Nunc sagittis mollis ante a
                sagittis. Duis sit amet neque dui.
              </p>
              <div className="view-project-card-container-mid-tags">
                {["Blender", "Blockchain", "ReactJS", "IoT"].map((tag, tagIndex) => (
                  <div
                    className="view-project-card-container-mid-tags-container"
                    key={tagIndex}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
            <div className="view-project-card-container-right">
              <p>
                <span>Team Leader: </span>Arun Verma
              </p>
              <p>
                <span>Mentored By: </span>Sachin Tendulkar
              </p>
              <p>
                <span>Team Size : </span>3/5
              </p>
              <p>
                <span>Status: </span>Open
              </p>
              <p>
                <span>Last Updated: </span>20/12/2024
              </p>
              <button className="apply-now-button">Apply</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectPage;
