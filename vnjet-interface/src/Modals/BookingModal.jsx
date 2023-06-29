// import {
//   MDBModal,
//   MDBModalDialog,
//   MDBModalContent,
//   MDBModalHeader,
//   MDBModalTitle,
//   MDBModalBody,
//   MDBModalFooter,
// } from "mdb-react-ui-kit";
// function BookingModal() {
//   return (
//     <MDBModal
//       show={showBookingTicket}
//       setShow={setShowBookingTicket}
//       tabIndex="-1"
//     >
//       <MDBModalDialog>
//         <MDBModalContent>
//           <MDBModalHeader>
//             <MDBModalTitle>Đặt vé chuyến bay {currentID}</MDBModalTitle>
//           </MDBModalHeader>
//           <MDBModalBody>
//             <div className="form-group mr-3">
//               <label htmlFor="level">Chọn loại vé</label>
//               <select
//                 className="form-select"
//                 name="ticketClass"
//                 onChange={handleChangeCustomerInfo}
//                 value={customerInfo.ticketClass}
//               >
//                 <option defaultValue value=""></option>
//                 {Array.isArray(seats) &&
//                   seats.length > 0 &&
//                   seats.map((seat, index) => {
//                     return seat.numberOfEmptySeat > 0 ? (
//                       <option value={seat.classOfTicket} key={index}>
//                         {seat.nameOfTicketClass} - {seat.price} VND
//                       </option>
//                     ) : (
//                       ""
//                     );
//                   })}
//               </select>
//             </div>
//             <div></div>
//           </MDBModalBody>
//           <MDBModalFooter>
//             <button
//               type="button"
//               className="btn btn-outline-secondary"
//               onClick={handleCloseDialog}
//             >
//               Đóng
//             </button>
//             <button
//               type="button"
//               className="btn btn-outline-danger"
//               onClick={handleBuyTicket}
//             >
//               Đồng ý
//             </button>
//           </MDBModalFooter>
//         </MDBModalContent>
//       </MDBModalDialog>
//     </MDBModal>
//   );
// }

// export default BookingModal;
