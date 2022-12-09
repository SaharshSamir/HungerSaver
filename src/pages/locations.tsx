import Navbar from "@components/layouts/navbar";
import Link from "next/link";

interface Location {
  address: string,
  name: string,
  map: string,
  contact: string
}

const locationsArr: Location[] = [
  {
    name: "Pisoli Warehouse",
    address: "FW22+MXX, Pisoli, Pune, Maharashtra 411060",
    contact: "3819284761",
    map: "https://goo.gl/maps/2VhXFpSqqkyKKkT57"
  },
  {
    name: "Kavita Warehousing",
    address: "FV2W+976, Katraj-Hadapsar Bypass Rd, Danny Mehata Nagar Industrial Area, Kondhwa Budruk",
    contact: "9384019210",
    map: "https://goo.gl/maps/CKt5fX6Ndmhx7uFh8",
  },
  {
    name: "Kavita Warehousing",
    address: "CWV6+X8W, Shree Siddhivinayak Meera, Undri, Pune, Maharashtra 411048",
    contact: "7492959412",
    map: "https://goo.gl/maps/bAee6UwNAXWG5TdK7",
  },
  {
    name: "Avibo Warehouse",
    address: "FW23+V3R, Pisoli, Pune, Maharashtra 411060",
    contact: "8374651056",
    map: "https://goo.gl/maps/fpPgHfoaH3tSGziT7",
  },
]

const Locations = () => {
  return (
    <>

      <Navbar />
    <div className="flex flex-col justify-center items-center">
      <p className="text-4xl my-5">Warehouse Locations</p>
      
          <table className="table w-5/6">
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Contact</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {locationsArr.map((loc, idx)=> {
                return (
                  <tr key={idx}>
                    <td>{loc.name}</td>
                    <td>{loc.address}</td>
                    <td>{loc.contact}</td>
                    <td><Link href={loc.map}>📍</Link></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
    </div>
    </>
  )
}

export default Locations;
