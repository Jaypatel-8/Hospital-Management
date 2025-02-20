/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
// import { BASE_URL } from "../../config";
// import convertTime from "../../utils/convertTime";
// import { toast } from "react-toastify";
// import { token } from "../../config";


// const SidePanel = ({ doctorId, ticketPrice, timeSlots }) => {


//     const bookingHandler = async() =>{
//         try{
//             const res = await fetch(`${BASE_URL}/bookings/checkout-session/${doctorId}`,{
//                 method: 'post',
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             })

//             const data = await res.json()
//             if(!res.ok){
//                 throw new Error(data.message + 'Please try again')
//             }

//             if(data.session.url){
//                 window.location.href = data.session.url
//             }
//         }catch(err){
//             toast.error(err.message)
//         }
//     }

//   return (
//     <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
//       <div className="flex ites-center justify-between">
//         <p className="text_para font-semibold mt-0">Ticket Price</p>
//         <span className="text-[16px]  leading-7 lg:text-[22px] lg:leading-8 tet-headingColor font-bold">
//           {ticketPrice} INR
//         </span>
//       </div>

//       <div className="mt-[30px] ">
//         <p className="text_para mt-0 font-semibold text-headingColor">
//           Available Time Slots:
//         </p>
//         <ul className="mt-3">
//           {timeSlots?.map((item, index) => (
//             <li key={index} className="flex items-center justify-between mb-2">
//               <p className="text-[15px] leading-6 text-textColor font-semibold">
//                 {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
//               </p>
//               <p className="text-[15px] leading-6 text-textColor font-semibold">
//                 {convertTime(item.startingTime)} - {convertTime(item.endingTime)}
//               </p>
//             </li>)
//          )}
//         </ul>
//       </div>
//       <button onClick={bookingHandler} className="btn px-2 w-full rounded"> Book Appointment</button>
//     </div>
//   );
// };

// export default SidePanel;


import { BASE_URL } from "../../config";
import convertTime from "../../utils/convertTime";
import { toast } from "react-toastify";
import { token } from "../../config";

const SidePanel = ({ doctorId, ticketPrice, timeSlots }) => {

  const bookingHandler = async () => {
    try {
      const res = await fetch(`${BASE_URL}/bookings/checkout-session/${doctorId}`, {
        method: 'POST', // Ensure HTTP method is in uppercase
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error((data?.message || 'An error occurred') + ' Please try again'); // Improved error message handling
      }

      if (data?.session?.url) { // Check for session existence before accessing url
        window.location.href = data.session.url;
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text_para font-semibold mt-0">Ticket Price</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
          {ticketPrice} INR
        </span>
      </div>

      <div className="mt-[30px]">
        <p className="text_para mt-0 font-semibold text-headingColor">Available Time Slots:</p>
        <ul className="mt-3">
          {timeSlots?.length > 0 ? (
            timeSlots.map((item, index) => (
              <li key={index} className="flex items-center justify-between mb-2">
                <p className="text-[15px] leading-6 text-textColor font-semibold">
                  {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
                </p>
                <p className="text-[15px] leading-6 text-textColor font-semibold">
                  {convertTime(item.startingTime)} - {convertTime(item.endingTime)}
                </p>
              </li>
            ))
          ) : (
            <p>No available time slots</p>
          )}
        </ul>
      </div>
      <button onClick={bookingHandler} className="btn px-2 w-full rounded">Book Appointment</button>
    </div>
  );
};

export default SidePanel;
