/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

export default function Opinity({
  name,
  email,
  phone,
  title,
  city,
  summary,
  skills,
  educations,
  works,
  languages,
  imageSrc,
}) {
  return (
    <div className="container bg-white p-6 shadow-lg rounded-lg max-w-4xl mx-auto">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <img
            className={`rounded-full mt-3 w-32 h-32 mx-auto mb-4 ${
              imageSrc ? "" : "hidden"
            }`}
            alt="Profile"
            src={imageSrc}
          />
          <h2 className="text-2xl font-semibold text-center">{name}</h2>
          <p className="text-center text-sm text-zinc-600 mb-4">{title}</p>
          <h3 className="text-lg text-center font-semibold mb-2">Contact</h3>
          <ul className="text-sm space-y-2">
            <li>
              <i className="far fa-envelope"></i>
              {email}
            </li>
            <li>
              <i className="fas fa-map-marker-alt text-center"></i>
              {city}
            </li>
            <li>
              <i className="fas fa-phone"></i>
              {phone}
            </li>
          </ul>
          <div className="mt-5">
            <h3 className="text-lg text-center font-semibold mb-2">
              Languages
            </h3>
            {languages.map((lang, index) => (
              <ul className="text-sm space-y-2 " key={index}>
                <li className="mb-2">
                  <i className="far fa-envelope"></i> {lang.language}{" "}
                  {lang.level}
                </li>
              </ul>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Profile</h3>
            <p className="text-sm text-justify">{summary}</p>
          </div>
          <div className="mb-2">
            <h3 className="text-lg font-semibold mb-2">Education</h3>
            {educations.map((education, index) => (
              <ul key={index}>
                <p className="text-sm">{education.startDate}</p>
                <p>
                  <strong>{education.institution}</strong>
                  <br />
                  {education.degreeTitle}
                </p>
                <br />
              </ul>
            ))}
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Employment</h3>
            {works.map((work, index) => (
              <ul key={index} className="mb-6">
                <p className="text-sm mb-2">{work.startDate}</p>
                <p>
                  <strong>{work.companyName}</strong>
                  <br />
                </p>
                <ul className="list-disc pl-3 space-y-1 text-xs">
                    <li>{work.workDescription}</li>
                </ul>
              </ul>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t pt-4 mt-4">
        <h3 className="text-lg font-semibold mb-2">Skills</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
        {skills.map((skillObj, index) => (
                    <div key={index}>
                      <p className="text-xs font-sans text-black">
                        {skillObj.skill}  {skillObj.year}
                      </p>
                    </div>
                  ))}
          
        </div>
      </div>
    </div>
  );
}
