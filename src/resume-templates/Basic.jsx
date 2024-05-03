/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

export default function Basic({
  name,
  email,
  phone,
  title,
  city,
  summary,
  address,
  skills,
  languages,
  works,
  educations,
  imageSrc,
}) {
  return (
    <>
      <div className="container w-[650px] m-auto">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="md:col-span-1 md:border-r md:border-zinc-200 dark:md:border-zinc-700 p-4 sm:p-6">
              <div className="flex-col items-center space-x-2">
                <img
                  className={`h-24 w-24 m-auto mb-2 rounded-full ${
                    imageSrc ? "" : "hidden"
                  }`}
                  src={imageSrc}
                />
                <div>
                  <h3 className="text-lg leading-5 font-medium text-zinc-900 dark:text-white">
                    {name}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 text-justify break-all">
                    {title}
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 tracking-wider uppercase">
                  Contact
                </h4>
                <div className="mt-2 space-y-2 ">
                  <p className="text-zinc-900 dark:text-white text-xs break-all">
                    {phone}
                  </p>
                  <p className="text-zinc-900 dark:text-white text-xs break-all">
                    {email}
                  </p>
                  <p className="text-zinc-900 dark:text-white text-xs break-all">
                    {address}
                  </p>
                  <p className="text-zinc-900 dark:text-white text-xs break-all">
                    {city}
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 tracking-wider uppercase">
                  Education
                </h4>
                <ul className="mt-2 text-xs space-y-3">
                  {educations.map((education, index) => (
                    <li
                      key={index}
                      className="text-zinc-900 dark:text-white text-xs"
                    >
                      • {education.startDate} - {education.endDate} {""}
                      {education.institution}
                      <br />
                      {education.degreeTitle}
                      <br />
                      {education.description}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6">
                <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 tracking-wider uppercase">
                  Skills
                </h4>
                <ul className="mt-2 space-y-2">
                  {skills.map((skillObj, index) => (
                    <div key={index}>
                      <p className="text-xs font-sans text-black">
                        {skillObj.skill} {skillObj.year}
                      </p>
                    </div>
                  ))}
                </ul>
              </div>
              <div className="mt-6">
                <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 tracking-wider uppercase">
                  Languages
                </h4>
                <ul className="mt-2 space-y-2">
                  {languages.map((lang, index) => (
                    <div key={index}>
                      <p className="text-xs font-sans text-black">
                        {lang.language} {lang.level}
                      </p>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="px-4 py-4 sm:p-6">
                <h3 className="text-sm leading-5 font-medium text-zinc-900 dark:text-white">
                  Profile
                </h3>
                <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                  <p className="leading-relaxed text-justify">{summary}</p>
                </div>
                <div className="mt-6">
                  <h3 className="text-sm leading-5 font-medium text-zinc-900 dark:text-white">
                    Work Experience
                  </h3>
                  <div className="mt-4">
                    <div className="mt-3">
                      {works.map((work, index) => (
                        <div key={index} className="mb-6">
                          <h4 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                            {work.companyName}
                          </h4>
                          <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                            {work.position}
                          </h4>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            {work.startDate} {work.endDate}
                          </p>
                          <ul className="mt-1 flex gap-x-1 text-xs text-zinc-600 dark:text-zinc-400 pl-1 space-y-1">
                          •<li className="text-justify">{work.workDescription}</li>
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
