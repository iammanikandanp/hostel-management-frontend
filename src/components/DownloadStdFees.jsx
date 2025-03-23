import { useSnackbar } from "notistack";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toWords } from "number-to-words";
import logo from "../assets/img/images.png";
import yearlogo from "../assets/img/50img.webp";
import "../style/Outpass.css";
import { CustomBaseUrl } from "./CustomBaseUrl.js";

export const DownloadStdFees = () => {
  const [student, setStudent] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false); 
  const receiptRef = useRef(null);

  useEffect(() => {
    const downloadStdFees = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await CustomBaseUrl.get(
          `/std/stddownloadfees/${id}`,
          { headers: { token: token } }
        );

        if (!response.data || !response.data.data) {
          enqueueSnackbar("Student Detail not found!", { variant: "error" });
          return;
        }

        setStudent(response.data.data);
      } catch (error) {
        enqueueSnackbar("Error fetching student details. Try again later.", {
          variant: "error",
        });
        console.log("Error fetching details:", error);
      } finally {
        setLoading(false);
      }
    };

    downloadStdFees();
  }, [id, enqueueSnackbar]);

  const handleClick = async () => {
    setDownloading(true);
    const receiptElement = receiptRef.current;
  
    if (!receiptElement) return;
  
    try {
      const canvas = await html2canvas(receiptElement, {
        scale: 1,
        useCORS: true,
        scrollX: 0,
        scrollY: 0,
        windowWidth: receiptElement.scrollWidth,
        windowHeight: receiptElement.scrollHeight,
      });
  
      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdf = new jsPDF("p", "mm", "a4");
  
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      if (imgHeight > 297) {
        const scaleFactor = 297 / imgHeight;
        const newWidth = imgWidth * scaleFactor;
        const newHeight = imgHeight * scaleFactor;
        pdf.addImage(imgData, "PNG", 5, 5, newWidth - 10, newHeight - 10);
      } else {
        pdf.addImage(imgData, "PNG", 5, 5, imgWidth - 10, imgHeight - 10);
      }
  
      pdf.save(`Fees_Receipt_${student?.name}.pdf`);
    } catch (error) {
      enqueueSnackbar("Error generating PDF!", { variant: "error" });
      console.error("PDF Generation Error:", error);
    } finally {
      setDownloading(false);
    }
  };
  
  

  return (
    <>
      <div className="flex justify-end md:pt-24 pb-5">
        <button className="w-fit mx-6" onClick={handleClick} disabled={downloading}>
          {downloading ? (
            <div className="flex items-center">
              <div className="w-5 h-5 border-2 border-dashed border-white rounded-full animate-spin"></div>
              <span className="ml-2">Downloading...</span>
            </div>
          ) : (
            <>
              <i className="fa-solid fa-download cursor-pointer"></i> Download
            </>
          )}
        </button>
      </div>

      <div className="flex justify-center items-center">
        <div className="border-black border-2 w-[800px]" ref={receiptRef}>
          <div className="flex justify-around items-center h-[100px] p-2 pb-3 mt-3 border-b-black border-b-[1px]">
            <div>
              <img src={logo} alt="College Logo" className="w-[80px] h-[80px]" />
            </div>
            <div>
              <h2 className="text-center text-red-900 md:text-3xl text-lg font-semibold">
                Erode Arts and Science College
              </h2>
              <p className="m-0">Autonomous (Co-Education)</p>
            </div>
            <div>
              <img src={yearlogo} alt="50 Years Logo" />
            </div>
          </div>

          <div className="download">
            {loading ? (
              <div className="flex justify-center items-center my-4">
                <div className="w-12 h-12 border-4 border-dashed border-blue-600 rounded-full animate-spin"></div>
              </div>
            ) : student ? (
              <>
                <h1 className="text-red-600 text-center text-2xl mt-4 p-3">Fees Receipt</h1>
                <h3 className="text-black text-lg text-right px-4">
                  Date: {student?.date?.split("-").reverse().join("-")}
                </h3>
                <h3 className="px-5 mt-4 font-semibold text-lg">Name: {student?.name}</h3>
                <h3 className="px-5 mt-4 font-semibold text-lg">Room No: {student?.roomno}</h3>
                <h3 className="px-5 mt-4 font-semibold text-lg">Semester: {student?.sem}</h3>
                <h3 className="px-5 mt-4 font-semibold text-lg">
                  Status:{" "}
                  <span
                    className={`${
                      student?.status?.toLowerCase() === "paid"
                        ? "text-green-600"
                        : student?.status?.toLowerCase() === "pending"
                        ? "text-red-700"
                        : "text-blue-700"
                    }`}
                  >
                    {student?.status}
                  </span>
                </h3>

                <div className="w-full flex justify-center items-center m-5">
                  <table className="md:w-[600px] sm:w-[400px] bg-white bg-opacity-70 border-3 border-black text-center overflow-hidden">
                    <thead className="text-lg">
                      <tr>
                        <th className="p-3 border border-black">Particulars</th>
                        <th className="p-3 border border-black">RS</th>
                      </tr>
                    </thead>
                    <tbody className="text-lg font-medium">
                      <tr className="hover:bg-gray-100 transition-all">
                        <td className="p-3 border border-black">Deposit</td>
                        <td className="p-3 border border-black">{student?.caution}</td>
                      </tr>
                      <tr className="hover:bg-gray-100 transition-all">
                        <td className="p-3 border border-black">Rent</td>
                        <td className="p-3 border border-black">{student?.rent}</td>
                      </tr>
                      <tr className="hover:bg-gray-100 transition-all">
                        <td className="p-3 border border-black">Mess</td>
                        <td className="p-3 border border-black">{student?.mess}</td>
                      </tr>
                      <tr className="hover:bg-gray-100 transition-all">
                        <td className="p-3 border border-black">Others</td>
                        <td className="p-3 border border-black">{student?.others}</td>
                      </tr>
                      <tr className="font-semibold">
                        <td className="p-3 border border-black">Total</td>
                        <td className="p-3 border border-black">{student?.total}</td>
                      </tr>
                      <tr className="hover:bg-gray-100 transition-all">
                        <td className="p-3 border border-black">Balance</td>
                        <td className="p-3 border border-black text-red-500">{student?.balance}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="px-5 m-4 font-semibold text-lg">
                  <h3>
                    (Rupees: {student?.total ? toWords(student.total).toUpperCase() + " ONLY" : ""})
                  </h3>
                </div>

                <div className="w-full text-lg font-medium text-end px-3 my-6">
                  <h3>Erode Arts and Science College</h3>
                  <h2 className="mr-6 pr-6">Hostel Management</h2>
                </div>
              </>
            ) : (
              <div className="text-center text-red-600 font-semibold p-5">No student data found.</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
