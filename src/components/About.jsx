import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "../style/Outpass.css"
export const About = () => {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(
      headingRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, delay: 0.3, ease: "power3.out" }
    );

    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="outpass">
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center mx-5 md:pt-24 p-5 border border-black shadow-lg rounded-md bg-white bg-opacity-95"
    >
      <h1
        ref={headingRef}
        className="text-center text-green-500 text-3xl font-semibold"
      >
        About Erode Arts and Science College
      </h1>
      <p ref={textRef} className="text-justify leading-7 mt-4 text-gray-700">
        Erode Arts and Science College (EASC), one of the premier institutions
        of Erode District with a rich legacy, has been a beacon of higher
        education since its inception in 1972. Founded as a First Grade Aided
        College, it was formerly affiliated to the University of Madras and then
        subsequently to the Bharathiar University in 1982.
        <br />
        <br />
        The college’s commitment to academic excellence and innovation led to
        the attainment of Autonomous status in 1987, a testament to its steadfast
        dedication to the quest for knowledge.
        <br />
        <br />
        The college offers 28 undergraduate, 11 postgraduate, 12 research and
        one diploma and one certificate programme. With student strength of
        around 4,000, EASC stands as a cornerstone of higher education in Erode
        District. Its establishment spearheaded by the vision of Sir Chevalier
        Dr.R.A.N.Muthusamy Mudaliar and the generosity of philanthropists in and
        around Erode, exemplifies the power of education to transform lives and
        communities. The college’s commitment towards promoting higher education
        and fostering national development shines through its diverse range of
        activities, including curricular, co-curricular, extra-curricular and
        extension activities.
        <br />
        <br />
        EASC places a strong emphasis on student support services boasting
        nearly 50 active Clubs / Cells / Committees / Centres, all dedicated to
        enriching the student experience and ensuring the provision of quality
        education. The college distinguishes itself by operating an IAS Academy
        that provides comprehensive training for both students and the wider
        public. It is specifically designed to equip the aspiring candidates for
        various central and state service commission examinations.
        <br />
        <br />
        The college recently marked a momentous occasion as it celebrated its
        Golden Jubilee in a grand manner. This milestone was not only an
        opportunity to reflect on the college’s illustrious history but also to
        acknowledge the remarkable contributions of its distinguished alumni and
        the dedicated leaders of various educational institutions of the region.
        <br />
        <br />
        The college boasts a robust faculty contingent of around 200 members, 86
        of them hold doctoral degrees and actively supervise research scholars.
        Moreover, the faculty actively contributes to research with numerous
        publications and project endeavors by engaging in collaborative
        initiatives, faculty exchange programmes and prolific authorship of
        books and book chapters that enrich the academic landscape of the
        college.
      </p>
    </div>
    </div>
  );
};
