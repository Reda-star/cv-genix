/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

export default function Greg({
  name,
  email,
  phone,
  title,
  city,
  summary,
  skills,
  languages,
  works,
  educations,
  imageSrc,
}) {
  return (
    <div className="container bg-white p-8 m-auto w-[650px] rounded-lg">
      <div className="flex flex-col items-center">
      <img
          className={`h-32 w-32 m-auto mb-2 rounded-full ${
                    imageSrc ? "" : "hidden"
                  }`}
                  src={imageSrc}
                />
        <h1 className="text-4xl font-bold">{name}</h1>
        <h2 className="text-2xl font-semibold mt-2">{title}</h2>
        <div className="flex flex-col space-x-4 mt-4">
          <p className="ml-4">📞 {phone}</p>
          <p>📧 {email}</p>
          <p>💼 {city}</p>
        </div>
        <hr className="w-full border-t mt-4 mb-6" />
      </div>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold">EXPERIENCE</h3>
          <div className="mt-4">
            {works.map((work, index) => (
              <div key={index} className="mb-6">
                <h4 className="font-semibold">{work.position}</h4>
                <p className="text-sm">{work.companyName}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {work.startDate} {work.endDate}
                </p>
                <ul className="mt-1 flex gap-x-1 text-sm">
                  •<li className="text-justify">{work.workDescription}</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold">EDUCATION</h3>
          <div className="mt-4">
            {educations.map((education, index) => (
              <div key={index} className="mb-3">
                <h4 className="font-semibold">
                  • {education.startDate} - {education.endDate}
                  {education.institution}
                  <br />
                </h4>
                <p>
                  {education.degreeTitle}
                </p>
              </div>
            ))}
           
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold">SKILLS</h3>
          <div className="flex flex-wrap gap-4 mt-4">
          {skills.map((skillObj, index) => (
                    <div key={index}>
                      <p className="text-base font-sans text-black">
                        {skillObj.skill} {skillObj.year}
                      </p>
                    </div>
                  ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mt-3">LANGUAGES</h3>
          <div className="flex flex-wrap gap-4 mt-4">
          {languages.map((lang, index) => (
                    <div key={index}>
                      <p className="text-base font-sans text-black">
                        {lang.language} {lang.level}
                      </p>
                    </div>
                  ))}
          </div>
        </div>
      </div>
    </div>
  );
}
