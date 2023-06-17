import MyFlightItem from "../components/MyFlightItem";
function MyFlight() {
  let flights = [
    {
      id: "456EkJ",
      beginTime: "20:00",
      endTime: "02:00",
      goDate: "06/07/2023",
      goLocation: "TP.HCM Vietnam",
      desLocation: " Ha Noi Vietnam",
      travelTime: "6",
      intermediateStation: ["Tân Sơn Nhất", "Mộc Bài"],
      // ticketPrice: 1000000,
      customerName: "Hai Yen",
      birthYear: 2002,
      beginStation: "Tân Sơn Nhất",
      endStation: "Nội bài",
      level: { value: 1, label: "Vé hạng nhất", price: 10000000 },
    },
  ];

  return (
    <>
      <h1>Danh sách những chuyến bay đã đặt</h1>
      {flights.map((flight, index) => (
        <MyFlightItem
          data={flight}
          // bookTicket={handleChooseTicket}
          key={index}
        />
      ))}
    </>
  );
}

export default MyFlight;
